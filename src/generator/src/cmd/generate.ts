// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import os from 'os';
import path from 'path';
import { existsSync } from 'fs';
import { mkdir, rm, writeFile, readFile } from 'fs/promises';
import yargs from 'yargs';
import { TypeFile, buildIndex, writeIndexJson, writeIndexMarkdown, readTypesJson, TypeSettings, CrossFileTypeReference, TypeBaseKind, writeTypesJson } from "bicep-types";
import { ApiVersion, extensionConfig } from 'extensionConfig/src/config';
import { getSortedConfigVersions } from 'swagger-generation/src/config';
import * as markdown from '@ts-common/commonmark-to-markdown'
import * as yaml from 'js-yaml'
import { copyRecursive, executeSynchronous, getLogger, lowerCaseCompare, logErr, logOut, ILogger, defaultLogger, executeCmd, findRecursive } from '../utils';

const rootDir = `${__dirname}/../../../../`;

const extensionDir = path.resolve(`${rootDir}/src/autorest.bicep/`);
const autorestBinary = os.platform() === 'win32' ? 'autorest.cmd' : 'autorest';
const generatedOutDir = path.resolve(`${rootDir}/generated`);
const defaultOutDir = path.resolve(`${rootDir}/generated/microsoftgraph/microsoft.graph`);

const argsConfig = yargs
  .strict()
  .option('specs-dir', { type: 'string', demandOption: true, desc: 'Path to the specs dir' })
  .option('out-dir', { type: 'string', default: defaultOutDir, desc: 'Output path for generated files' })
  .option('single-path', { type: 'string', default: undefined, desc: 'Only regenerate under a specific file path - e.g. "compute"' })
  .option('logging-level', { type: 'string', default: 'warning', choices: ['debug', 'verbose', 'information', 'warning', 'error', 'fatal'] })
  .option('wait-for-debugger', { type: 'boolean', default: false, desc: 'Wait for a C# debugger to be attached before running the Autorest extension' });

const extensionConfigForGeneration = {
  "beta": {
    "name": extensionConfig["beta"].name,
    "version": getLatestVersionForGeneration(ApiVersion.Beta),
  },
  "v1.0": {
    "name": extensionConfig["v1.0"].name,
    "version": getLatestVersionForGeneration(ApiVersion.V1_0),
  },
  "v1.1": {
    "name": extensionConfig["v1.1"].name,
    "version": getLatestVersionForGeneration(ApiVersion.V1_1),
  }
}

executeSynchronous(async () => {
  const args = await argsConfig.parseAsync();
  const inputBaseDir = path.resolve(args['specs-dir']);
  const outputBaseDir = path.resolve(args['out-dir']);
  const logLevel = args['logging-level'];
  const waitForDebugger = args['wait-for-debugger'];
  const singlePath = args['single-path'];

  if (!existsSync(`${extensionDir}/dist`)) {
    throw `Unable to find ${extensionDir}/dist. Did you forget to run 'npm run build'?`;
  }

  // find all readme paths in the specs path
  const specsPath = path.join(inputBaseDir, 'specification');
  const readmePaths = await findReadmePaths(specsPath);
  if (readmePaths.length === 0) {
    throw `Unable to find specs in folder ${inputBaseDir}`;
  }

  const tmpOutputPath = `${os.tmpdir()}/_bcp_${new Date().getTime()}`;
  await rm(tmpOutputPath, { recursive: true, force: true, });

  // this file is deliberately gitignored as it'll be overwritten when using --single-path
  // it's used to generate the git commit message
  await mkdir(outputBaseDir, { recursive: true });
  const summaryLogger = await getLogger(`${outputBaseDir}/summary.log`);

  // use consistent sorting to make log changes easier to review
  for (const readmePath of readmePaths.sort(lowerCaseCompare)) {
    const bicepReadmePath = `${path.dirname(readmePath)}/readme.bicep.md`;
    const basePath = path.relative(specsPath, readmePath).split(path.sep)[0].toLowerCase();
    const tmpOutputDir = `${tmpOutputPath}/${basePath}`;

    if (singlePath && lowerCaseCompare(singlePath, basePath) !== 0) {
      continue;
    }

    // prepare temp dir for output
    await rm(tmpOutputDir, { recursive: true, force: true, });
    await mkdir(tmpOutputDir, { recursive: true });
    const tmpLoggerPath = `${tmpOutputDir}/log.out`;
    const logger = await getLogger(tmpLoggerPath);

    for (const apiVersion of [ApiVersion.Beta, ApiVersion.V1_0, ApiVersion.V1_1]) {
      const tmpOutputApiVersionDir = path.join(tmpOutputDir, 'microsoft.graph', apiVersion);
      const outputApiVersionDir = path.join(outputBaseDir, apiVersion, extensionConfigForGeneration[apiVersion].version);

      try {
        // autorest readme.bicep.md files are not checked in, so we must generate them before invoking autorest
        await generateAutorestConfig(logger, readmePath, bicepReadmePath, apiVersion, extensionConfigForGeneration[apiVersion].version);
        await generateSchema(logger, bicepReadmePath, tmpOutputDir, logLevel, waitForDebugger);

        // remove all previously-generated files and copy over results
        await rm(outputApiVersionDir, { recursive: true, force: true, });
        await mkdir(outputApiVersionDir, { recursive: true });
        await copyRecursive(tmpOutputApiVersionDir, outputApiVersionDir);
      } catch (err) {
        logErr(logger, err);

        // Use markdown formatting as this summary will be included in the PR description
        logOut(summaryLogger,
          `<details>
  <summary>Failed to generate types for path '${basePath}'</summary>

\`\`\`
${err}
\`\`\`
</details>
`);
      }
    }

    // clean up temp dirs
    // await rm(tmpOutputDir, { recursive: true, force: true, });
    await clearAutorestTempDir(logger, logLevel, waitForDebugger);
    // clean up autorest readme.bicep.md files
    await rm(bicepReadmePath, { force: true });
  }

  // build the type index
  await buildTypeIndex(defaultLogger, outputBaseDir, ApiVersion.Beta);
  await buildTypeIndex(defaultLogger, outputBaseDir, ApiVersion.V1_0);
  await buildTypeIndex(defaultLogger, outputBaseDir, ApiVersion.V1_1);
});

function normalizeJsonPath(jsonPath: string) {
  // eslint-disable-next-line no-useless-escape
  return path.normalize(jsonPath).replace(/[\\\/]/g, '/');
}

async function generateAutorestConfig(logger: ILogger, readmePath: string, bicepReadmePath: string, apiVersion: string, extensionVersion: string) {
  // We expect a path format convention of <provider>/(any/number/of/intervening/folders)/(beta|v1.0|v1.1))/<filename>.json
  // This information is used to generate individual tags in the generated autorest configuration
  // eslint-disable-next-line no-useless-escape
  const pathRegex = /^(\$\(this-folder\)\/|)([^\/]+)(?:\/[^\/]+)*\/(beta|v1\.0|v1\.1)\/(.*)\.json$/i;

  const readmeContents = await readFile(readmePath, { encoding: 'utf8' });
  const readmeMarkdown = markdown.parse(readmeContents);

  const inputFiles = new Set<string>();
  // we need to look for all autorest configuration elements containing input files, and collect that list of files. These will look like (e.g.):
  // ```yaml $(tag) == 'someTag'
  // input-file:
  // - path/to/file.json
  // - path/to/other_file.json
  // ```
  for (const node of markdown.iterate(readmeMarkdown.markDown)) {
    // We're only interested in yaml code blocks
    if (node.type !== 'code_block' || !node.info || !node.literal ||
      !node.info.trim().startsWith('yaml')) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yamlData = yaml.load(node.literal) as any;
    if (yamlData) {
      // input-file may be a single string or an array of strings
      const inputFile = yamlData['input-file'];
      if (typeof inputFile === 'string') {
        inputFiles.add(inputFile);
      } else if (inputFile instanceof Array) {
        for (const i of inputFile) {
          inputFiles.add(i);
        }
      }
    }
  }

  const filesByTag: Record<string, string[]> = {};
  for (const file of inputFiles) {
    const normalizedFile = normalizeJsonPath(file);
    const match = pathRegex.exec(normalizedFile);

    if (match) {
      if (match[3].toLowerCase() === apiVersion && match[4].toLowerCase() === extensionVersion) {
        logOut(logger, `INFO: Parsing swagger "${file}"`);

        // Generate a unique tag. We can't process all of the different API versions in one autorest pass
        // because there are constraints on naming uniqueness (e.g. naming of definitions), so we want to pass over
        // each API version separately.
        const tagName = `${match[2].toLowerCase()}-${match[3].toLowerCase()}`;
        if (!filesByTag[tagName]) {
          filesByTag[tagName] = [];
        }

        filesByTag[tagName].push(normalizedFile);
      }
    } else {
      logOut(logger, `WARNING: Unable to parse swagger path "${file}"`);
    }
  }

  let generatedContent = `##Bicep

### Bicep multi-api
\`\`\`yaml $(bicep) && $(multiapi)
${yaml.dump({ 'batch': Object.keys(filesByTag).map(tag => ({ 'tag': tag })) }, { lineWidth: 1000 })}
\`\`\`
`;

  for (const tag of Object.keys(filesByTag)) {
    generatedContent += `### Tag: ${tag} and bicep
\`\`\`yaml $(tag) == '${tag}' && $(bicep)
${yaml.dump({ 'input-file': filesByTag[tag] }, { lineWidth: 1000 })}
\`\`\`
`;
  }

  await writeFile(bicepReadmePath, generatedContent);
}

async function generateSchema(logger: ILogger, readme: string, outputBaseDir: string, logLevel: string, waitForDebugger: boolean) {
  let autoRestParams = [
    `--use=@autorest/modelerfour`,
    `--use=${extensionDir}`,
    '--bicep',
    `--output-folder=${outputBaseDir}`,
    `--level=${logLevel}`,
    `--multiapi`,
    '--title=none',
    // This is necessary to avoid failures such as "ERROR: Semantic violation: Discriminator must be a required property." blocking type generation.
    // In an ideal world, we'd raise issues in https://github.com/Azure/azure-rest-api-specs and force RP teams to fix them, but this isn't very practical
    // as new validations are added continuously, and there's often quite a lag before teams will fix them - we don't want to be blocked by this in generating types.
    `--skip-semantics-validation`,
    readme,
  ];

  autoRestParams = applyCommonAutoRestParameters(autoRestParams, logLevel, waitForDebugger);

  return await executeCmd(logger, isVerboseLoggingLevel(logLevel), __dirname, autorestBinary, autoRestParams);
}

async function clearAutorestTempDir(logger: ILogger, logLevel: string, waitForDebugger: boolean) {
  const autoRestParams = applyCommonAutoRestParameters(['--clear-temp', '--allow-no-input'], logLevel, waitForDebugger);

  return await executeCmd(logger, isVerboseLoggingLevel(logLevel), __dirname, autorestBinary, autoRestParams);
}

function applyCommonAutoRestParameters(autoRestParams: string[], logLevel: string, waitForDebugger: boolean) {
  autoRestParams = autoRestParams.concat([`--level=${logLevel}`])

  if (waitForDebugger) {
    autoRestParams = autoRestParams.concat([
      `--bicep.debugger`,
    ]);
  }

  return autoRestParams;
}

async function findReadmePaths(specsPath: string) {
  return await findRecursive(specsPath, filePath => {
    if (path.basename(filePath).toLowerCase() !== 'readme.md') {
      return false;
    }

    return filePath
      .split(path.sep)
      .some(parent => parent == 'resource-manager');
  });
}

async function buildTypeIndex(logger: ILogger, baseDir: string, apiVersion: ApiVersion) {
  // Add the MsGraphBicepExtensionConfig type to the last position in types.json file
  function isEnhancedRelationshipVersion(apiVersion: string, extensionVersion: string): boolean {
    return (apiVersion === 'beta' && extensionVersion === '1.1.0-preview') ||
           (apiVersion === 'v1.1' && extensionVersion === '0.1.1-preview');
  }

  function addConfigToContent(content: string, apiVersion: string, extensionVersion: string): any[] {
    const contentTypes = JSON.parse(content) as any[];
    const relationshipType = contentTypes.find(type => type["$type"] === TypeBaseKind.ObjectType && type["name"] === 'MicrosoftGraphRelationship');
    const isEnhanced = isEnhancedRelationshipVersion(apiVersion, extensionVersion);
    
    if (isEnhanced) {
      // Add RelationshipMember type before MicrosoftGraphRelationship
      const relationshipMemberType = {
        $type: TypeBaseKind.ObjectType,
        name: "MicrosoftGraphRelationshipMember",
        properties: {
          id: {
            type: { $ref: "#/0" }, // StringType
            flags: 1, // Required
            description: "The unique identifier of the relationship member."
          },
          type: {
            type: { $ref: "#/0" }, // StringType  
            flags: 2, // ReadOnly
            description: "The type of the relationship member (e.g., user, group, servicePrincipal). This is a read-only property populated by the system."
          }
        }
      };
      
      // Insert before MicrosoftGraphRelationship
      const relationshipIndex = contentTypes.findIndex(type => type.name === 'MicrosoftGraphRelationship');
      contentTypes.splice(relationshipIndex, 0, relationshipMemberType);
      
      // Update relationships property to reference RelationshipMember array
      const updatedRelationshipType = { ...relationshipType };
      updatedRelationshipType.properties.relationships.type = {
        $type: "ArrayType",
        itemType: { $ref: `#/${relationshipIndex}` } // Reference to RelationshipMember
      };
      updatedRelationshipType.properties.relationships.description = "The list of relationship members with their IDs and types.";
      contentTypes[relationshipIndex + 1] = updatedRelationshipType;
    }
    
    const relationshipSemanticsType = relationshipType.properties['relationshipSemantics'];
    const configType = {
      $type: TypeBaseKind.ObjectType,
      name: "MicrosoftGraphBicepExtensionConfig",
      properties: {
        relationshipSemantics: {
          ...relationshipSemanticsType
        }
      }
    };
    contentTypes.push(configType);

    return contentTypes;
  };

  const extensionBaseDir = path.join(baseDir, apiVersion, extensionConfigForGeneration[apiVersion].version);
  const typesPaths = await findRecursive(extensionBaseDir, filePath => {
    return shouldIncludeFilePath(filePath) && path.basename(filePath) === 'types.json';
  });

  if (typesPaths.length === 0) {
    console.warn(`No types.json files found for ${apiVersion} in ${extensionBaseDir}`);
    return;
  }

  const content = await readFile(typesPaths[0], { encoding: 'utf8' });
  const contentJson = addConfigToContent(content, apiVersion, extensionConfigForGeneration[apiVersion].version);
  const typeFiles: TypeFile[] = [{
    relativePath: path.relative(extensionBaseDir, typesPaths[0]),
    types: readTypesJson(JSON.stringify(contentJson)),
  }];

  const typeSettings: TypeSettings = {
    name: extensionConfigForGeneration[apiVersion].name,
    version: extensionConfigForGeneration[apiVersion].version,
    isSingleton: false,
    configurationType: new CrossFileTypeReference('types.json', contentJson.length - 1),
  };
  const indexContent = await buildIndex(typeFiles, (log) => logOut(logger, log), typeSettings);

  await writeFile(`${extensionBaseDir}/types.json`, normalizeJsonPath(writeTypesJson(contentJson)));
  await writeFile(`${extensionBaseDir}/index.json`, normalizeJsonPath(writeIndexJson(indexContent)));
  await writeFile(`${extensionBaseDir}/index.md`, normalizeJsonPath(writeIndexMarkdown(indexContent)));
}

function shouldIncludeFilePath(filePath: string) {
  return filePath.includes(path.join(ApiVersion.Beta, extensionConfigForGeneration[ApiVersion.Beta].version)) ||
    filePath.includes(path.join(ApiVersion.V1_0, extensionConfigForGeneration[ApiVersion.V1_0].version)) ||
    filePath.includes(path.join(ApiVersion.V1_1, extensionConfigForGeneration[ApiVersion.V1_1].version));
}

function isVerboseLoggingLevel(logLevel: string) {
  switch (logLevel.toLowerCase()) {
    case 'debug':
    case 'verbose':
      return true;
    default:
      return false;
  }
}

function getLatestVersionForGeneration(apiVersion: ApiVersion) {
  const versions = getSortedConfigVersions(`../swagger-generation/configs/${apiVersion}`);

  return versions[versions.length - 1];
}
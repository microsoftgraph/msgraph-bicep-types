// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import yargs from 'yargs'
import { CSDL } from './definitions/RawTypes'
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config, getSortedConfigVersions } from './config'
import { Swagger } from './definitions/Swagger'
import { writeSwagger } from './swaggerWriter'
import { writeMetadata } from './metadataWriter'
import { validateReferences } from './validator'
import { DefinitionMap } from './definitions/DefinitionMap'
import { ExtensionVersionMetadata, Metadata } from './definitions/Metadata'
import { ApiVersion } from 'extensionConfig/src/config';

const argv = yargs
  .option('output', {
    alias: 'o',
    description: 'The output file path',
    type: 'string',
    default: 'output',
    demandOption: true
  })
  .help()
  .parseSync();

const outputPath = argv.output;

async function parse(config: Config): Promise<[Metadata, Swagger]> {
  console.log(`Fetching MSGraph metadata CSDL for ${config.APIVersion}`);

  const csdl: CSDL = await parseXML(config.MetadataFilePath)

  let definitionMap: DefinitionMap = new DefinitionMap();
  definitionMap = constructDataStructure(csdl, definitionMap, config);
  definitionMap = validateReferences(definitionMap, config);

  const swagger: Swagger = writeSwagger(definitionMap, config);
  const metadata: Metadata = writeMetadata(definitionMap, config);

  return [metadata, swagger];
}

function writeSwaggerFile(swagger: Swagger, apiVersion: string, extensionVersion: string) {
  const swaggerJson: string = JSON.stringify(swagger, null, 2);
  const releaseType: string = getReleaseTypeFromExtensionVersion(extensionVersion);
  const fullOutputPath = `${outputPath}/${releaseType}/${apiVersion}`;

  if (outputPath !== 'output') {
    if (!fs.existsSync(fullOutputPath)) {
      fs.mkdirSync(fullOutputPath, { recursive: true });
    }

    fs.writeFile(`${fullOutputPath}/${extensionVersion}.json`, swaggerJson, (err) => {
      if (err) throw err;
      console.log(`The swagger file spec for ${apiVersion}/${extensionVersion} has been saved!`);
    });
  }

  fs.writeFile(`output/microsoftgraph-${apiVersion}-${extensionVersion}.json`, swaggerJson, (err) => {
    if (err) throw err;
    console.log(`The output for ${apiVersion}-${extensionVersion} has been saved.`);
  });
}

function writeMetadataFile(extensionVersionMetadata: ExtensionVersionMetadata) {
  const metadataJson: string = JSON.stringify(extensionVersionMetadata, null, 2);

  fs.writeFile(`output/metadata.json`, metadataJson, (err) => {
    if (err) throw err;
    console.log(`The metadata file has been saved!`);
  });
}

function writeSwaggerReadMeFile(apiExtensionVersions: { [key in ApiVersion]: string[] }) {
  let betaVersionsContent = '';
  let v1VersionsContent = '';
  let v11VersionsContent = '';
  for (const version of apiExtensionVersions[ApiVersion.Beta]) {
    const releaseType = getReleaseTypeFromExtensionVersion(version);
    betaVersionsContent += `\n  - microsoftgraph/${releaseType}/beta/${version}.json`;
  }
  for (const version of apiExtensionVersions[ApiVersion.V1_0]) {
    const releaseType = getReleaseTypeFromExtensionVersion(version);
    v1VersionsContent += `\n  - microsoftgraph/${releaseType}/v1.0/${version}.json`;
  }
  for (const version of apiExtensionVersions[ApiVersion.V1_1]) {
    const releaseType = getReleaseTypeFromExtensionVersion(version);
    v11VersionsContent += `\n  - microsoftgraph/${releaseType}/v1.1/${version}.json`;
  }
  let readMeContent = `# MicrosoftGraph

> see https://aka.ms/autorest

## Getting Started

To build the SDK for MicrosoftGraph, simply [Install AutoRest](https://aka.ms/autorest/install) and in this folder, run:

> \`autorest\`

To see additional help and options, run:

> \`autorest --help\`

---

## Configuration

### Basic Information

These are the global settings for the MicrosoftGraph API.

\`\`\` yaml
title: MicrosoftGraph
description: MicrosoftGraph
openapi-type: arm
\`\`\`

### Tag: microsoftgraph-preview

These settings apply only when \`--tag=microsoftgraph-preview\` is specified on the command line.

\`\`\`yaml $(tag) == 'microsoftgraph-beta'
input-file: ${betaVersionsContent}
\`\`\`

\`\`\`yaml $(tag) == 'microsoftgraph-v1.0'
input-file: ${v1VersionsContent}
\`\`\`

\`\`\`yaml $(tag) == 'microsoftgraph-v1.1'
input-file: ${v11VersionsContent}
\`\`\`
`
  fs.writeFile(`../../swagger/specification/microsoftgraph/resource-manager/readme.md`, readMeContent, (err) => {
    if (err) throw err;
    console.log(`The swagger readme file has been saved!`);
  });
}

function getReleaseTypeFromExtensionVersion(extensionVersion: string): 'preview' | 'official' {
  return extensionVersion.endsWith('preview') ? 'preview' : 'official';
}

async function main() {
  let extensionVersionMetadata: ExtensionVersionMetadata = require('../output/metadata.json');
  let metadata: Metadata = {};
  let apiExtensionVersions: { [key in ApiVersion]: string[] } = {
    [ApiVersion.Beta]: [],
    [ApiVersion.V1_0]: [],
    [ApiVersion.V1_1]: [],
  };

  for (const apiVersion of [ApiVersion.Beta, ApiVersion.V1_0, ApiVersion.V1_1]) {
    const versions = getSortedConfigVersions(`configs/${apiVersion}`);
    apiExtensionVersions[apiVersion] = versions;

    const extensionVersion = versions[versions.length - 1];
    const config = new Config(apiVersion, extensionVersion);
    const [curMetadata, curSwagger] = await parse(config);

    // Merge the metadata for current api version with the existing metadata
    for (const entityName in curMetadata) {
      metadata[entityName] ??= {};
      metadata[entityName][apiVersion] = curMetadata[entityName][apiVersion];
    }

    extensionVersionMetadata[extensionVersion] ??= {};
    extensionVersionMetadata[extensionVersion] = metadata;

    writeSwaggerFile(curSwagger, apiVersion, extensionVersion);
  }

  writeMetadataFile(extensionVersionMetadata);
  writeSwaggerReadMeFile(apiExtensionVersions);
}

main();

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import yargs from 'yargs'
import { CSDL } from './definitions/RawTypes'
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config } from './config'
import { Swagger } from './definitions/Swagger'
import { writeSwagger } from './swaggerWriter'
import { writeMetadata } from './metadataWriter'
import { validateReferences } from './validator'
import { DefinitionMap } from './definitions/DefinitionMap'
import { Metadata } from './definitions/Metadata'

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

const config = new Config()

parseXML(config.URL)
  .then((csdl: CSDL) => {
    let definitionMap: DefinitionMap = new DefinitionMap()
    definitionMap = constructDataStructure(csdl, definitionMap, config)
    definitionMap = validateReferences(definitionMap, config)

    // const swagger: Swagger = writeSwagger(definitionMap, config)
    // const swaggerJson: string = JSON.stringify(swagger, null, 2)

    const metadata: Metadata = writeMetadata(definitionMap, config);
    const metadataJson: string = JSON.stringify(metadata, null, 2);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // fs.writeFile(`${outputPath}/microsoftgraph-beta.json`, swaggerJson, (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });

    fs.writeFile(`${outputPath}/metadata-beta.json`, metadataJson, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

  }).catch(console.log);

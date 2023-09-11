// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CSDL } from './definitions/RawTypes'
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config } from './config'
import { Swagger } from './definitions/Swagger'
import { writeSwagger } from './swaggerWritter'
import fs from 'fs'
import { validateReferences } from './validator'
import { DefinitionMap } from './definitions/DefinitionMap'


console.log("Fetching MSGraph metadata CSDL from " + Config.Instance.URL + "...")
parseXML(Config.Instance.URL)
    .then((csdl: CSDL) => { // This process uses singletons for Config, DefinitionMap, and AliasTranslator
        let definitionMap: DefinitionMap = new DefinitionMap()

        definitionMap = constructDataStructure(csdl, definitionMap)

        definitionMap = validateReferences(definitionMap)

        const swagger: Swagger = writeSwagger(definitionMap)

        const swaggerJson: string = JSON.stringify(swagger, null, 2)

        if (!fs.existsSync('output')){
            fs.mkdirSync('output');
        }

        fs.writeFile('output/microsoftgraph-beta.json', swaggerJson, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        

    }).catch(console.log);
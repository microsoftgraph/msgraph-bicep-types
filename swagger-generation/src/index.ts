// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { DefinitionMap } from './definitions/DefinitionMap'
import { CSDL } from './definitions/RawTypes'

// Library imports
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config } from './config'
import { Swagger } from './definitions/Swagger'
import { writeSwagger } from './swaggerWritter'
import fs from 'fs'



parseXML(Config.Instance.URL)
    .then((csdl: CSDL) => {
        const definitionMap: DefinitionMap = new DefinitionMap()

        constructDataStructure(csdl, definitionMap)

        const swagger: Swagger = writeSwagger(definitionMap.EntityMap)

        const swaggerJson: string = JSON.stringify(swagger, null, 2)

        if (!fs.existsSync('output')){
            fs.mkdirSync('output');
        }

        fs.writeFile('output/microsoftgraph-beta.json', swaggerJson, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        

    }).catch(console.log);
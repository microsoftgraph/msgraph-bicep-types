// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { DefinitionMap, EntityMap, ComplexMap, EnumMap } from './definitions/DefinitionMap'
import { CSDL } from './definitions/RawTypes'
import { EntityType } from './definitions/EntityType'

// Library imports
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config } from './config'
import { Swagger } from './definitions/Swagger'
import { writeSwagger } from './swaggerWritter'
import fs from 'fs'

const config: Config = new Config()

parseXML(config.URL)
    .then((csdl: CSDL) => {
        const definitionMap: DefinitionMap = new DefinitionMap()
        const scope: EntityMap = config.EntityTypes
        const entityScopeSet: Set<string> = new Set<string>(scope.keys())

        constructDataStructure(csdl, definitionMap, entityScopeSet)

        // definitionMap.EntityMap.forEach((entityType: EntityType) => {
        //     console.log(entityType.Name)
        //     console.log(entityType.Property)
        // });

        const swagger: Swagger = writeSwagger(definitionMap.EntityMap, scope)

        JSON.stringify(swagger, null, 2)

        fs.writeFile('microsoftgraph-beta.json', JSON.stringify(swagger, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        

    }).catch(console.log);
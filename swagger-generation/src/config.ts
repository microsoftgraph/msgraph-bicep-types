// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
// Library imports
import { parse } from 'yaml'
import {readFileSync } from 'fs'

export class Config {
    EntityTypes: EntityMap
    URL: string

    constructor() {
        const configFile = readFileSync('./config.yaml', 'utf8')
        let configFileObj: any = parse(configFile)
        let entityTypesMap: EntityMap = new Map<string, EntityType>()
        let entityTypes: EntityType[] = configFileObj['EntityTypes'] as EntityType[]
        
        entityTypes.forEach((entityType: EntityType) => {
            entityTypesMap.set(`microsoft.graph.${entityType.Name}`, entityType)
        })

        this.EntityTypes = entityTypesMap
        this.URL = configFileObj['URL']
    }
}

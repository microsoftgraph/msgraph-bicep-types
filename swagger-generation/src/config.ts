// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityTypeConfigMap } from './definitions/DefinitionMap'
import { parse } from 'yaml'
import { readFileSync } from 'fs'

export interface EntityTypeConfig{
    Name: string,
    RootUri?: string,
    NavigationProperty?: string[]
    RequiredOnWrite?: string[]
    ReadOnly?: string[]
}

export class Config {
    EntityTypes: EntityTypeConfigMap
    URL: string
    APIVersion: string

    constructor() {
        const configFile = readFileSync('./config.yaml', 'utf8')
        const configFileObj = parse(configFile)
        const entityTypesMap: EntityTypeConfigMap = new Map<string, EntityTypeConfig>()
        const entityTypes: EntityTypeConfig[] = configFileObj['EntityTypes'] as EntityTypeConfig[]
        
        entityTypes.forEach((entityTypeConfig: EntityTypeConfig) => {
            entityTypesMap.set(`${entityTypeConfig.Name}`, entityTypeConfig)
        })

        this.EntityTypes = entityTypesMap
        this.URL = configFileObj['URL']
        this.APIVersion = configFileObj['apiVersion']
    }
}
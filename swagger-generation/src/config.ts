// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type definitions
import { EntityTypeConfigMap } from './definitions/DefinitionMap'
// Library imports
import { parse } from 'yaml'
import {readFileSync } from 'fs'

export interface EntityTypeConfig{
    Name: string,
    RootUri: string,
    NavigationProperty: string[]
}

export class Config {

    private static _instance: Config

    EntityTypes: Map<string, EntityTypeConfig>
    URL: string
    APIVersion: string

    private constructor() {
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

    public static get Instance(): Config {
        return this._instance || (this._instance = new this())
    }
}

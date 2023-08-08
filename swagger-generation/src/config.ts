// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
// Library imports
import { parse } from 'yaml'
import {readFileSync } from 'fs'

export class Config {

    private static _instance: Config

    EntityTypes: EntityMap
    URL: string
    SwaggerVersion: string

    private constructor() {
        const configFile = readFileSync('./config.yaml', 'utf8')
        let configFileObj: any = parse(configFile)
        let entityTypesMap: EntityMap = new Map<string, EntityType>()
        let entityTypes: EntityType[] = configFileObj['EntityTypes'] as EntityType[]
        
        entityTypes.forEach((entityType: EntityType) => {
            entityTypesMap.set(`${entityType.Name}`, entityType)
        })

        this.EntityTypes = entityTypesMap
        this.URL = configFileObj['URL']
        this.SwaggerVersion = configFileObj['SwaggerVersion']
    }

    public static get Instance(): Config {
        return this._instance || (this._instance = new this())
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityTypeConfigMap } from './definitions/DefinitionMap'
import { parse } from 'yaml'
import { readFileSync } from 'fs'

export enum NavigationPropertyMode {
  Allow = 'Allow',
  Ignore = 'Ignore',
}

export interface EntityTypeConfig {
  Name: string,
  RootUri?: string,
  AvailableProperty?: string[],
  NavigationPropertyMode?: NavigationPropertyMode,
  NavigationProperty?: string[]
  RequiredOnWrite?: string[]
  ReadOnly?: string[]
}

export class Config {
  EntityTypes: EntityTypeConfigMap
  URL: string
  APIVersion: string

  constructor() {
    const configFile = readFileSync('./config.yml', 'utf8')
    const configFileObj = parse(configFile)
    const entityTypesMap: EntityTypeConfigMap = new Map<string, EntityTypeConfig>()
    const entityTypes: EntityTypeConfig[] = configFileObj['EntityTypes'] as EntityTypeConfig[]

    entityTypes.forEach((entityTypeConfig: EntityTypeConfig) => {
      entityTypesMap.set(`${entityTypeConfig.Name}`, entityTypeConfig)
      if (entityTypeConfig.NavigationPropertyMode && entityTypeConfig.NavigationPropertyMode !== NavigationPropertyMode.Allow && entityTypeConfig.NavigationPropertyMode !== NavigationPropertyMode.Ignore) {
        throw new Error(`Invalid NavigationPropertyMode ${entityTypeConfig.NavigationPropertyMode} for ${entityTypeConfig.Name}. Only ${NavigationPropertyMode.Allow} and ${NavigationPropertyMode.Ignore} are valid values.`)
      }
    })

    this.EntityTypes = entityTypesMap
    this.URL = configFileObj['URL']
    this.APIVersion = configFileObj['apiVersion']
  }
}

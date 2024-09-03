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
  Upsertable?: boolean,
  Updatable?: boolean,
  ContainerEntitySet?: string,
  ContainerKeyProperty?: string,
  AvailableProperty?: string[],
  IgnoredProperties?: string[],
  NavigationPropertyMode?: NavigationPropertyMode,
  NavigationProperty?: string[]
  RequiredOnWrite?: string[]
  ReadOnly?: string[]
  FilterProperty?: string[]
  CompositeKey?: string[]
}

export class Config {
  ExtensionVersion: string
  EntityTypes: EntityTypeConfigMap
  MetadataFilePath: string
  APIVersion: string

  constructor(apiVersion: string, extensionVersion: string) {
    const configFile = readFileSync(`./configs/${apiVersion}/${extensionVersion}.yml`, 'utf8')
    const configFileObj = parse(configFile)
    const entityTypesMap: EntityTypeConfigMap = new Map<string, EntityTypeConfig>()
    const entityTypes: EntityTypeConfig[] = configFileObj['EntityTypes'] as EntityTypeConfig[]

    entityTypes.forEach((entityTypeConfig: EntityTypeConfig) => {
      if (entityTypeConfig.NavigationPropertyMode && entityTypeConfig.NavigationPropertyMode !== NavigationPropertyMode.Allow && entityTypeConfig.NavigationPropertyMode !== NavigationPropertyMode.Ignore) {
        throw new Error(`Invalid NavigationPropertyMode ${entityTypeConfig.NavigationPropertyMode} for ${entityTypeConfig.Name}. Only ${NavigationPropertyMode.Allow} and ${NavigationPropertyMode.Ignore} are valid values.`)
      }

      entityTypesMap.set(`${entityTypeConfig.Name}`, entityTypeConfig);
    })

    this.EntityTypes = entityTypesMap
    this.MetadataFilePath = configFileObj['MetadataFilePath']
    this.APIVersion = apiVersion
    this.ExtensionVersion = extensionVersion;
  }
}

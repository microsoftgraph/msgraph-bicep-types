// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityTypeConfigMap } from './definitions/DefinitionMap'
import { parse } from 'yaml'
import { readFileSync, readdirSync } from 'fs'
import { OrchestrationType } from './definitions/Metadata'

export enum NavigationPropertyMode {
  Allow = 'Allow',
  Ignore = 'Ignore',
}

export interface RelationshipConfig {
  NeedsBatch?: boolean,
  BulkLimit?: number,
  Properties: string[]
}

export interface StreamPropertyConfig {
  Name: string,
  UrlPattern: string,
  HttpMethod: string
}

export interface ResourceKeyConfig {
  Name: string,
  OmitInPayload?: boolean
}

export interface OrchestrationPropertyConfig {
  Name: string,
  OrchestrationType: OrchestrationType,
  UrlPattern?: string,
  HttpMethod?: string
}

export interface OrchestrationPropertiesConfig {
  Save?: OrchestrationPropertyConfig[],
  Get?: OrchestrationPropertyConfig[]
}

export interface EntityTypeConfig {
  Name: string,
  IsReadonlyResource?: boolean,
  RootUri?: string,
  Upsertable?: boolean,
  Updatable?: boolean,
  ContainerEntitySet?: string,
  ContainerKeyProperty?: string,
  AvailableProperty?: string[],
  IgnoredProperties?: string[],
  NavigationPropertyMode?: NavigationPropertyMode,
  NavigationProperty?: string[]
  Relationships?: RelationshipConfig,
  RequiredOnWrite?: string[]
  ReadOnly?: string[]
  FilterProperty?: string[]
  CompositeKey?: string[]
  EntitySetPath?: string
  ResourceKey?: ResourceKeyConfig
  OrchestrationProperties?: OrchestrationPropertiesConfig
  IsSingleton?: boolean,
  PathSegmentName?: string
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

export function getSortedConfigVersions(path: string): string[] {
  function versionComparator(a: string, b: string): number {
    const [aMain, aSuffix] = a.split('-');
    const [bMain, bSuffix] = b.split('-');

    const aVersion = aMain.split('.').map(Number);
    const bVersion = bMain.split('.').map(Number);

    for (let i = 0; i < aVersion.length; i++) {
      if (aVersion[i] > bVersion[i]) return 1;
      if (aVersion[i] < bVersion[i]) return -1;
    }

    if (!aSuffix && bSuffix) return 1;
    if (aSuffix && !bSuffix) return -1;

    return 0;
  }

  return readdirSync(path)
    .map((yamlVersion) => yamlVersion.slice(0, -4))
    .sort(versionComparator);
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityType } from "./EntityType";
import { EnumType } from "./EnumType";
import { EntityTypeConfig } from "../config";

export interface EntityMap extends Map<string, EntityType>{}

export interface EnumMap extends Map<string, EnumType>{}

export interface EntityTypeConfigMap extends Map<string, EntityTypeConfig>{}

export interface AliasMap extends Map<string, string>{}

export class DefinitionMap{

    EntityMap: EntityMap;
    EnumMap: EnumMap;
    AliasMap: AliasMap = new Map<string, string>();

    constructor() {
        const entityMap: EntityMap = new Map<string, EntityType>()
        const enumMap: EnumMap = new Map<string, EnumType>()
        const aliasMap: AliasMap = new Map<string, string>()
        this.EntityMap = entityMap;
        this.EnumMap = enumMap;
        this.AliasMap = aliasMap;
    }  

}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityType } from "./EntityType";
import { EnumType } from "./EnumType";
import { EntityTypeConfig } from "../config";

export interface EntityMap extends Map<string, EntityType>{}

export interface EnumMap extends Map<string, EnumType>{}

export interface EntityTypeConfigMap extends Map<string, EntityTypeConfig>{}

export class DefinitionMap{
    private static _instance: DefinitionMap;

    EntityMap: EntityMap;
    EnumMap: EnumMap;

    private constructor() {
        const entityMap: EntityMap = new Map<string, EntityType>()
        const enumMap: EnumMap = new Map<string, EnumType>()
        this.EntityMap = entityMap;
        this.EnumMap = enumMap;
    }  

    public static get Instance(): DefinitionMap {
        return this._instance || (this._instance = new this())
    }
}
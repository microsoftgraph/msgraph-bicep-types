// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityType } from "./EntityType";
import { EnumType } from "./EnumType";
import { ComplexType } from "./ComplexType";

export interface EntityMap extends Map<string, EntityType>{};

export interface EnumMap extends Map<string, EnumType>{};

export interface ComplexMap extends Map<string, ComplexType>{};

export class DefinitionMap implements DefinitionMap{
    EntityMap: EntityMap;
    EnumMap: EnumMap;
    ComplexMap: ComplexMap;

    constructor(entityMap: EntityMap, enumMap: EnumMap, complexMap: ComplexMap) {
        this.EntityMap = entityMap;
        this.EnumMap = enumMap;
        this.ComplexMap = complexMap;
    }
}


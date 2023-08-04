// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EntityType } from "./EntityType";
import { EnumType } from "./EnumType";
import { ComplexType } from "./ComplexType";

export interface EntityMap extends Map<string, EntityType>{};

export interface EnumMap extends Map<string, EnumType>{};

export interface ComplexMap extends Map<string, ComplexType>{};

export interface PluralTranslationMap extends Map<string, string>{};

export class DefinitionMap implements DefinitionMap{
    EntityMap: EntityMap;
    EnumMap: EnumMap;
    ComplexMap: ComplexMap;
    PluralTranslationMap: PluralTranslationMap;

    constructor() {
        const entityMap: EntityMap = new Map<string, EntityType>()
        const enumMap: EnumMap = new Map<string, EnumType>()
        const complexMap: ComplexMap = new Map<string, ComplexType>()
        const entitySetMap: PluralTranslationMap = new Map<string, string>()
        this.EntityMap = entityMap;
        this.EnumMap = enumMap;
        this.ComplexMap = complexMap;
        this.PluralTranslationMap = entitySetMap;
    }

    
}


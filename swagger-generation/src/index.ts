// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { ComplexMap, DefinitionMap, EnumMap } from './definitions/DefinitionMap'
import { CSDL } from './definitions/RawTypes'
import { EntityType } from './definitions/EntityType'
import { ComplexType } from './definitions/ComplexType'
import { EnumType } from './definitions/EnumType'
import { EntityMap } from './definitions/DefinitionMap'
// Library imports
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { Config } from './config'

const config: Config = new Config()

parseXML(config.URL)
    .then((csdl: CSDL) => {
        const entityMap: EntityMap = new Map<string, EntityType>()
        const enumMap: EnumMap = new Map<string, EnumType>()
        const complexMap: ComplexMap = new Map<string, ComplexType>()
        const definitionMap: DefinitionMap = new DefinitionMap(entityMap, enumMap, complexMap)
        const scope: EntityMap = config.EntityTypes
        const entityScopeSet: Set<string> = new Set<string>(scope.keys())

        constructDataStructure(csdl, definitionMap, entityScopeSet)
        

    }).catch(console.log);
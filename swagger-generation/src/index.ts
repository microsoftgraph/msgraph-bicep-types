// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { DefinitionMap } from './definitions/DefinitionMap'
import { CSDL } from './definitions/RawTypes'
import { EntityType } from './definitions/EntityType'
import { ComplexType } from './definitions/ComplexType'
import { EnumType } from './definitions/EnumType'
import { EntityMap } from './definitions/DefinitionMap'
// Library imports
import { parseXML } from './parser'
import { constructDataStructure } from './deserializer'
import { loadScope } from './scope'


parseXML('https://graph.microsoft.com/v1.0/$metadata')
    .then((csdl: CSDL) => {
        const entityMap: EntityMap = new Map<string, EntityType>()
        const enumMap: Map<string, EnumType> = new Map<string, EnumType>()
        const complexMap: Map<string, ComplexType> = new Map<string, ComplexType>()
        const definitionMap: DefinitionMap = new DefinitionMap(entityMap, enumMap, complexMap)

        const scope: EntityMap = loadScope()
        const entityScopeSet: Set<string> = new Set<string>(scope.keys())

        console.log(entityScopeSet)

        constructDataStructure(csdl, definitionMap, entityScopeSet)


    }).catch(console.log);
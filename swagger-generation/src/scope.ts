// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
// Library imports
import { parse } from 'yaml'
import {readFileSync } from 'fs'

export const loadScope = (): EntityMap => {
    const config = readFileSync('./config.yaml', 'utf8')
    let scopeList: EntityType[] = parse(config) as EntityType[]
    let scopeDict: EntityMap = new Map<string, EntityType>()

    scopeList.forEach((entityType: EntityType) => {
        scopeDict.set(`microsoft.graph.${entityType.Name}`, entityType)
    })

    return scopeDict
};
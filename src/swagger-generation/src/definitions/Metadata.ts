// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface RelationshipMetadata {
    needsBatch?: boolean,
    bulkLimit?: number,
    properties: RelationshipPropertyMetadata[],
}

export interface RelationshipPropertyMetadata {
    name: string,
    type: string,
}

export interface ExtensionVersionMetadata {
    [extensionVersion: string]: Metadata
}

export interface Metadata {
    [entityName: string]: EntityAPIMetadata
}

export interface EntityAPIMetadata {
    [apiVersion: string]: EntityMetadata
}

export interface EntityMetadata {
    isIdempotent: boolean,
    updatable: boolean,
    isContainment: boolean,
    isReadonly?: boolean,
    alternateKey?: string,
    navigationProperties?: string[],
    containerEntitySet?: string,
    keyProperty?: string,
    temporaryFilterKeys?: string[],
    compositeKeyProperties?: string[],
    relationshipMetadata?: RelationshipMetadata
}

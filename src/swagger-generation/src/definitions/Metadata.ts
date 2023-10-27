// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
    alternateKey?: string,
    navigationProperties?: string[],
    containerEntitySet?: string,
    keyProperty?: string,
    temporaryFilterKeys?: string[],
    compositeKeyProperties?: string[],
}

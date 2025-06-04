// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum OrchestrationType {
    CustomMetadata = "customMetadata",
    BinaryStream = "binaryStream",
    CertificateCollection = "certificateCollection",
    BehaviorSettings = "behaviorSettings",
    InternalSettings = "internalSettings",
    ComplexObject = "complexObject",
    Collection = "collection",
    Primitive = "primitive"
}

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

export interface StreamPropertyMetadata {
    name: string,
    urlPattern: string,
    httpMethod: string
}

export interface ResourceKey {
    name: string
}

export interface OrchestrationProperty {
    name: string,
    orchestrationType: OrchestrationType,
    urlPattern?: string,
    httpMethod?: string
}

export interface OrchestrationProperties {
    save?: OrchestrationProperty[],
    get?: OrchestrationProperty[]
}

export interface EntityMetadata {
    entitySetPath?: string,
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
    relationshipMetadata?: RelationshipMetadata,
    resourceKey?: ResourceKey,
    orchestrationProperties?: OrchestrationProperties
}

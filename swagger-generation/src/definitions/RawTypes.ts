// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface CSDL{
    "edmx:Edmx": DataServices
}

export interface DataServices {
    "edmx:DataServices": DataService[]
}

export interface DataService {
    Schema: RawSchema[]
}

export interface RawSchema {
    $: RawSchemaAttributes,
    EnumType?: object[],
    EntityType?: RawEntityType[],
    ComplexType?: object[],
    EntityContainer?: EntityContainerRaw[]
}

export interface EntityContainerRaw {
    $: EntityContainerRawAttributes,
    EntitySet?: EntitySetRaw[],
}

export interface EntityContainerRawAttributes {
    Name: string
}

export interface EntitySetRaw {
    $: EntitySetRawAttributes
}

export interface EntitySetRawAttributes {
    Name: string,
    EntityType: string
}

export interface RawSchemaAttributes {
    Namespace: string
}

export interface RawEntityType {
    $: RawEntityTypeAttributes,
    Property: RawProperty[],
    NavigationProperty: RawNavigationProperty[]
}

export interface RawEntityTypeAttributes {
    Name: string,
    Abstract?: boolean,
    BaseType?: string,
    OpenType?: boolean,
    HasStream?: boolean
}

export interface RawProperty {
    $: RawPropertyAttributes
}

export interface RawPropertyAttributes {
    Name: string,
    Type: string,
    Nullable?: boolean,
}

export interface RawNavigationPropertyAttributes extends RawPropertyAttributes {
    ContainsTarget?: boolean,
}

export interface RawNavigationProperty {
    $: RawNavigationPropertyAttributes
}
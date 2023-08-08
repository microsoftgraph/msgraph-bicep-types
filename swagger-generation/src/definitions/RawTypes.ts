// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface CSDL{
    "edmx:Edmx": DataServices
}

export interface DataServices extends Object {
    "edmx:DataServices": DataService[]
}

export interface DataService extends Object {
    Schema: RawSchema[]
}

export interface RawSchema extends Object {
    $: RawSchemaAttributes,
    EnumType?: Object[],
    EntityType?: RawEntityType[],
    ComplexType?: Object[],
    EntityContainer?: EntityContainerRaw[]
}

export interface EntityContainerRaw extends Object {
    $: EntityContainerRawAttributes,
    EntitySet?: EntitySetRaw[],
}

export interface EntityContainerRawAttributes extends Object {
    Name: string
}

export interface EntitySetRaw extends Object {
    $: EntitySetRawAttributes
}

export interface EntitySetRawAttributes extends Object {
    Name: string,
    EntityType: string
}

export interface RawSchemaAttributes extends Object {
    Namespace: string
}

export interface RawEntityType extends Object {
    $: RawEntityTypeAttributes,
    Property: RawProperty[],
    NavigationProperty: RawNavigationProperty[]
}

export interface RawEntityTypeAttributes extends Object {
    Name: string,
    Abstract?: boolean,
    BaseType?: string,
    OpenType?: boolean,
    HasStream?: boolean
}

export interface RawProperty extends Object {
    $: RawPropertyAttributes
}

export interface RawPropertyAttributes extends Object {
    Name: string,
    Type: string,
    Nullable?: boolean,
}

export interface RawNavigationPropertyAttributes extends RawPropertyAttributes {
    ContainsTarget?: boolean,
}

export interface RawNavigationProperty extends Object {
    $: RawNavigationPropertyAttributes
}
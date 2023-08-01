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
    $: RawSchemaHeader,
    EnumType?: Object[],
    EntityType?: RawEntityType[],
    ComplexType?: Object[]
}

export interface RawSchemaHeader extends Object {
    Namespace: string,
    xmlns: string
}

export interface RawEntityType extends Object {
    $: RawEntityTypeHeader,
    Property: RawProperty[],
    NavigationProperty: RawNavigationProperty[]
}

export interface RawEntityTypeHeader extends Object {
    Name: string,
    Abstract?: boolean,
    BaseType?: string,
    OpenType?: boolean,
    HasStream?: boolean
}

export interface RawProperty extends Object {
    $: RawPropertyHeader
}

export interface RawPropertyHeader extends Object {
    Name: string,
    Type: string,
    Nullable?: boolean,
}

export interface RawNavigationPropertyHeader extends RawPropertyHeader {
    ContainsTarget?: boolean,
}

export interface RawNavigationProperty extends Object {
    $: RawNavigationPropertyHeader
}














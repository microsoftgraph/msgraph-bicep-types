// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface CSDL {
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
    EnumType?: RawEnumType[],
    EntityType?: RawEntityType[],
    ComplexType?: RawEntityType[]
    EntityContainer?: RawEntityContainer[]
}

export interface RawEntityContainer {
    $: RawEntityContainerAttributes,
    EntitySet: RawEntitySet[]
}

export interface RawEntityContainerAttributes {
    Name: string
}

export interface RawEntitySet {
    $: RawEntitySetAttributes,
    NavigationPropertyBinding?: RawNavigationPropertyBinding[]
}

export interface RawEntitySetAttributes {
    Name: string,
    EntityType: string,
}

export interface RawNavigationPropertyBinding {
    $: RawNavigationPropertyBindingAttributes
}

export interface RawNavigationPropertyBindingAttributes {
    Path: string,
    Target: string
}

export interface RawSchemaAttributes {
    Namespace: string
    Alias?: string
}

export interface RawEntityType {
    $: RawEntityTypeAttributes,
    Property: RawProperty[],
    NavigationProperty: RawNavigationProperty[],
    Annotation?: RawAnnotation[],
}

export interface RawEnumType {
    $: RawEnumTypeAttributes,
    Member: RawEnumMember[]
}

export interface RawEnumTypeAttributes {
    Name: string
}

export interface RawEnumMember {
    $: RawEnumMemberAttributes
}

export interface RawEnumMemberAttributes {
    Name: string,
    Value: string
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
    Annotation?: RawAnnotation[],
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
    Annotation?: RawAnnotation[],
}

export interface RawAnnotation {
    $: RawAnnotationAttributes
    Record?: RawRecord
    Collection?: RawCollectionItem[]
}

export interface RawAnnotationAttributes {
    Term: string,
    String?: string,
    Qualifier?: string,
}

export interface RawCollectionItem {
    Record?: RawRecord[]
}

export interface RawRecord {
    $: RawRecordAttributes,
    PropertyValue?: RawPropertyValue[]
}

export interface RawRecordAttributes {
    Type?: string
}

export interface RawPropertyValue {
    $: RawPropertyValueAttributes
    Collection?: RawCollectionItem[]
}

export interface RawPropertyValueAttributes {
    Property: string
    PropertyPath?: string
    String?: string
}

export enum PrimitivePropertyType {
    Binary = "Edm.Binary",
    Boolean = "Edm.Boolean",
    Byte = "Edm.Byte",
    Date = "Edm.Date",
    DateTimeOffset = "Edm.DateTimeOffset",
    Decimal = "Edm.Decimal",
    Double = "Edm.Double",
    Duration = "Edm.Duration",
    Guid = "Edm.Guid",
    Int16 = "Edm.Int16",
    Int32 = "Edm.Int32",
    Int64 = "Edm.Int64",
    SByte = "Edm.SByte",
    Single = "Edm.Single",
    Stream = "Edm.Stream",
    String = "Edm.String",
    TimeOfDay = "Edm.TimeOfDay",
    Geography = "Edm.Geography",
    GeographyPoint = "Edm.GeographyPoint",
    GeographyLineString = "Edm.GeographyLineString",
    GeographyPolygon = "Edm.GeographyPolygon",
    GeographyMultiPoint = "Edm.GeographyMultiPoint",
    GeographyMultiLineString = "Edm.GeographyMultiLineString",
    GeographyMultiPolygon = "Edm.GeographyMultiPolygon",
    GeographyCollection = "Edm.GeographyCollection",
    Geometry = "Edm.Geometry",
    GeometryPoint = "Edm.GeometryPoint",
    GeometryLineString = "Edm.GeometryLineString",
    GeometryPolygon = "Edm.GeometryPolygon",
    GeometryMultiPoint = "Edm.GeometryMultiPoint",
    GeometryMultiLineString = "Edm.GeometryMultiLineString",
    GeometryMultiPolygon = "Edm.GeometryMultiPolygon",
    GeometryCollection = "Edm.GeometryCollection",
    Untyped = "Edm.Untyped",
}

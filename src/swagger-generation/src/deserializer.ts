// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CollectionProperty } from "./definitions/CollectionProperty";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { NavigationProperty } from "./definitions/NavigationProperty";
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat, SwaggerMetaType } from "./definitions/PrimitiveSwaggerType";
import { Property } from "./definitions/Property";
import { CSDL, DataService, PrimitivePropertyType, RawEntityType, RawEntityTypeAttributes, RawEnumMember, RawEnumType, RawNavigationProperty, RawNavigationPropertyAttributes, RawProperty, RawPropertyAttributes, RawSchema } from "./definitions/RawTypes";
import { TypeTranslator } from "./util/typeTranslator";
import { EnumType } from "./definitions/EnumType";
import { Config, EntityTypeConfig, NavigationPropertyMode } from "./config";

export const constructDataStructure = (csdl: CSDL, definitionMap: DefinitionMap, config: Config): DefinitionMap => {
  console.log('Deserializing CSDL')

  const dataServices: DataService[] = csdl['edmx:Edmx']['edmx:DataServices']

  dataServices.forEach((dataService: DataService) => {
    const schemas: RawSchema[] = dataService.Schema

    schemas.forEach((schema: RawSchema) => {
      const namespace: string = schema.$.Namespace
      const alias: string | undefined = schema.$.Alias
      const rawEntityTypes: RawEntityType[] = schema.EntityType ? schema.EntityType : []
      const rawComplexTypes: RawEntityType[] = schema.ComplexType ? schema.ComplexType : []
      const rawEnumTypes: RawEnumType[] = schema.EnumType ? schema.EnumType : []

      if (alias) {
        definitionMap.AliasMap.set(alias, namespace)
      }

      rawComplexTypes.forEach((rawComplexType: RawEntityType) => entityHandler(definitionMap, config, rawComplexType, namespace));
      rawEntityTypes.forEach((rawEntityType: RawEntityType) => entityHandler(definitionMap, config, rawEntityType, namespace));
      rawEnumTypes.forEach((rawEnumType: RawEnumType) => enumHandler(definitionMap, rawEnumType, namespace));
    });
  });

  console.log(`Found ${definitionMap.EntityMap.size} entity types in the CSDL`)

  if (definitionMap.EntityMap.size === 0) throw new Error('No entity types found in the CSDL')

  return definitionMap
}

const propertyHandler = (entityConfig: EntityTypeConfig | undefined, rawProperty: RawProperty): Property => {
  const propertyAttributes: RawPropertyAttributes = rawProperty.$
  const propertyName: string = propertyAttributes.Name
  let propertyType: string = propertyAttributes.Type
  let typedPropertyType: PrimitiveSwaggerTypeStruct | CollectionProperty | string
  const collectionRegex: RegExp = /Collection\((.+)\)/
  let isCollection: boolean = false

  if (collectionRegex.test(propertyType)) { // Collection
    propertyType = propertyType.match(collectionRegex)![1]
    isCollection = true
  }

  // Primitive Types
  if (Object.values(PrimitivePropertyType).map(v => v.toString()).includes(propertyType)) {
    typedPropertyType = TypeTranslator.Instance.odataToSwaggerType(propertyType as PrimitivePropertyType)
  } else { // String references
    typedPropertyType = propertyType
  }

  if (isCollection) {
    typedPropertyType = new CollectionProperty(typedPropertyType)
  }

  const propertyNullable: boolean = propertyAttributes.Nullable ? propertyAttributes.Nullable : false

  let isReadOnly: boolean = false

  if (entityConfig) {
    const readOnlyProps: string[] | undefined = entityConfig.ReadOnly
    if (readOnlyProps) {
      isReadOnly = readOnlyProps.includes(propertyName)
    }
  }

  const property: Property = new Property(propertyName, typedPropertyType, propertyNullable, isReadOnly)

  return property
}

const navigationPropertiesHandler = (entityConfig: EntityTypeConfig | undefined, rawNavigationProperty: RawNavigationProperty): NavigationProperty => {
  const navigationPropertyAttributes: RawNavigationPropertyAttributes = rawNavigationProperty.$
  const navigationPropertyName: string = navigationPropertyAttributes.Name
  let navigationPropertyType: string = navigationPropertyAttributes.Type
  let typedNavigationPropertyType: CollectionProperty | string
  const navigationPropertyNullable: boolean = navigationPropertyAttributes.Nullable ? navigationPropertyAttributes.Nullable : false
  const navigationPropertyContainsTarget: boolean = navigationPropertyAttributes.ContainsTarget ? navigationPropertyAttributes.ContainsTarget : false

  const collectionRegex: RegExp = /Collection\((.+)\)/

  if (collectionRegex.test(navigationPropertyType)) { // Is Collection
    navigationPropertyType = navigationPropertyType.match(collectionRegex)![1]
    typedNavigationPropertyType = new CollectionProperty(navigationPropertyType)
  } else {
    typedNavigationPropertyType = navigationPropertyType
  }

  let isReadOnly: boolean = false

  if (entityConfig) {
    const readOnlyProps: string[] | undefined = entityConfig.ReadOnly
    if (readOnlyProps) {
      isReadOnly = readOnlyProps.includes(navigationPropertyName)
    }
  }

  //todo resolve undefined params
  const navigationProperty: NavigationProperty = new NavigationProperty(navigationPropertyName, typedNavigationPropertyType, navigationPropertyNullable, isReadOnly, navigationPropertyContainsTarget)

  return navigationProperty
}

const entityHandler = (definitionMap: DefinitionMap, config: Config, rawEntityType: RawEntityType, namespace: string): void => {
  const entityAttributes: RawEntityTypeAttributes = rawEntityType.$
  const entityName: string = entityAttributes.Name
  const abstract: boolean = entityAttributes.Abstract ? entityAttributes.Abstract : false
  const baseType: string = entityAttributes.BaseType ? entityAttributes.BaseType : ''
  const openType: boolean = entityAttributes.OpenType ? entityAttributes.OpenType : false
  const hasStream: boolean = entityAttributes.HasStream ? entityAttributes.HasStream : false
  const rawProperties: RawProperty[] = rawEntityType.Property ? rawEntityType.Property : []
  const rawNavigationProperties: RawNavigationProperty[] = rawEntityType.NavigationProperty ? rawEntityType.NavigationProperty : []
  const fullEntityName: string = `${namespace}.${entityName}`
  const entityConfig: EntityTypeConfig | undefined = config.EntityTypes.get(fullEntityName);

  const properties: Property[] = rawProperties
    .map((rawProperty: RawProperty): Property =>
      propertyHandler(entityConfig, rawProperty)
    )
    .filter((property: Property): boolean =>
      propertyFilter(entityConfig, property)
    );

  // Temporary workaround until inheritance is supported in this tool
  if (baseType === 'graph.writebackConfiguration') {
    properties.push(new Property('isEnabled', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined), true, false));
  } else if (baseType === 'graph.directoryObject') {
    properties.push(new Property('deletedDateTime', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime), false, true));
  }

  const navigationProperties: NavigationProperty[] = rawNavigationProperties
    .map((rawNavigationProperty: RawNavigationProperty): NavigationProperty =>
      navigationPropertiesHandler(entityConfig, rawNavigationProperty)
    )
    .filter((navigationProperty: NavigationProperty): boolean =>
      navigationPropertyFilter(entityConfig, navigationProperty)
    );

  const entityType: EntityType = new EntityType(entityName, abstract, baseType, openType, hasStream, properties, navigationProperties)

  definitionMap.EntityMap.set(fullEntityName, entityType)
}

const enumHandler = (definitionMap: DefinitionMap, rawEnumType: RawEnumType, namespace: string): void => {
  const currentEnumMap: Map<string, string> = new Map<string, string>()

  const enumName: string = rawEnumType.$.Name
  let enumMembers: RawEnumMember[] = rawEnumType.Member
  if (!enumMembers)
    enumMembers = []

  enumMembers = enumMembers.filter((enumMember: RawEnumMember) => {
    return !(enumMember.$.Name.toLowerCase().includes('futurevalue'))
  })

  enumMembers.forEach((enumMember: RawEnumMember) => {
    const enumMemberName: string = enumMember.$.Name
    const enumMemberValue: string = enumMember.$.Value
    currentEnumMap.set(enumMemberName, enumMemberValue)
  });
  const enumType = new EnumType(enumName, currentEnumMap)
  const id = `${namespace}.${enumName}`
  definitionMap.EnumMap.set(id, enumType)
}

const propertyFilter = (entityConfig: EntityTypeConfig | undefined, property: Property): boolean => {
  if (!entityConfig)
    return true // Include all properties by default

  const availableProperty: string[] | undefined = entityConfig.AvailableProperty

  // Core property is either not set or set to only allow listed properties (default behavior)
  if (!availableProperty || availableProperty.length === 0 || availableProperty.includes(property.Name)) {
    return true;
  }

  return false // Ignored because it's not listed
}

const navigationPropertyFilter = (entityConfig: EntityTypeConfig | undefined, navigationProperty: NavigationProperty): boolean => {
  if (!entityConfig)
    return false // Ignore all navigation properties by default

  // There's config for this entity

  const navigationPropertyMode: NavigationPropertyMode | undefined = entityConfig.NavigationPropertyMode

  // Mode is either not set or set to only allow listed navigation properties (default behavior)
  if (!navigationPropertyMode || navigationPropertyMode === NavigationPropertyMode.Allow) {
    if (entityConfig.NavigationProperty && entityConfig.NavigationProperty.includes(navigationProperty.Name)) {
      return true // Not ignored because it's listed
    }

    return false // Ignored because it's not listed or there's no list
  }

  // Mode is set to ignore listed navigation properties
  if (entityConfig.NavigationProperty && entityConfig.NavigationProperty.includes(navigationProperty.Name)) {
    return false // Because it's listed and list exists
  }

  return true // Not ignored either because it's not listed or there's no list
}

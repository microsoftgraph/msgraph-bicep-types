// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CollectionProperty } from "./definitions/CollectionProperty";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { NavigationProperty } from "./definitions/NavigationProperty";
import { PrimitiveSwaggerTypeStruct } from "./definitions/PrimitiveSwaggerType";
import { Property } from "./definitions/Property";
import { CSDL, DataService, PrimitivePropertyType, RawEntityType, RawEntityTypeAttributes, RawEnumMember, RawEnumType, RawNavigationProperty, RawNavigationPropertyAttributes, RawProperty, RawPropertyAttributes, RawSchema } from "./definitions/RawTypes";
import { AliasTranslator } from "./util/aliasTranslator";
import { TypeTranslator } from "./util/typeTranslator";
import { EnumType } from "./definitions/EnumType";

export const constructDataStructure = (csdl: CSDL): void => {
    console.log('Deserializing CSDL')

    const dataServices: DataService[] = csdl["edmx:Edmx"]['edmx:DataServices']

    dataServices.forEach((dataService: DataService) => {

        const schemas: RawSchema[] = dataService.Schema

        schemas.forEach((schema: RawSchema) => {

            const namespace: string = schema.$.Namespace
            const alias: string | undefined = schema.$.Alias 
            const rawEntityTypes: RawEntityType[] = schema.EntityType ? schema.EntityType : []
            const rawComplexTypes: RawEntityType[] = schema.ComplexType ? schema.ComplexType: []
            const rawEnumTypes: RawEnumType[] = schema.EnumType ? schema.EnumType : []

            if(alias){
                AliasTranslator.Instance.setAlias(alias, namespace)
            }

            rawComplexTypes.forEach((rawComplexType: RawEntityType) => entityHandler(rawComplexType, namespace));

            rawEntityTypes.forEach((rawEntityType: RawEntityType) => entityHandler(rawEntityType, namespace));

            rawEnumTypes.forEach((rawEnumType: RawEnumType) => enumHandler(rawEnumType, namespace));
       
        });
        
    });

    console.log(`Found ${DefinitionMap.Instance.EntityMap.size} entity types in the CSDL`)

    if(DefinitionMap.Instance.EntityMap.size === 0) throw new Error('No entity types found in the CSDL')
    
}

const propertyHandler = (rawProperty: RawProperty): Property => {
    const propertyAttributes: RawPropertyAttributes = rawProperty.$
    const propertyName: string = propertyAttributes.Name
    let propertyType: string = propertyAttributes.Type
    let typedPropertyType: PrimitiveSwaggerTypeStruct | CollectionProperty | string
    const collectionRegex: RegExp = /Collection\((.+)\)/
    let isCollection: boolean = false

    if(collectionRegex.test(propertyType)) { // Collection
        propertyType = propertyType.match(collectionRegex)![1]
        isCollection = true
    }
    
    // Primitive Types
    if(Object.values(PrimitivePropertyType).map(v => v.toString()).includes(propertyType)){
            typedPropertyType = TypeTranslator.Instance.odataToSwaggerType(propertyType as PrimitivePropertyType)
        if(isCollection){
            typedPropertyType = new CollectionProperty(typedPropertyType)
        }
    }else { // Other
        typedPropertyType = propertyType
    }
     
    const propertyNullable: boolean = propertyAttributes.Nullable ? propertyAttributes.Nullable : false

    //todo resolve undefined params
    const property: Property = new Property(propertyName, typedPropertyType, undefined, propertyNullable, undefined)

    return property
}

const navigationPropertiesHandler = (rawNavigationProperty: RawNavigationProperty): NavigationProperty => {
    const navigationPropertyAttributes: RawNavigationPropertyAttributes = rawNavigationProperty.$
    const navigationPropertyName: string = navigationPropertyAttributes.Name
    const navigationPropertyType: string = navigationPropertyAttributes.Type
    const navigationPropertyNullable: boolean = navigationPropertyAttributes.Nullable ? navigationPropertyAttributes.Nullable : false
    const navigationPropertyContainsTarget: boolean = navigationPropertyAttributes.ContainsTarget ? navigationPropertyAttributes.ContainsTarget : false
    
    //todo resolve undefined params
    const navigationProperty: NavigationProperty = new NavigationProperty(navigationPropertyName, navigationPropertyType, undefined, navigationPropertyNullable, undefined, navigationPropertyContainsTarget)

    return navigationProperty
}

const entityHandler = (rawEntityType: RawEntityType, namespace: string): void => {
    const entityAttributes: RawEntityTypeAttributes = rawEntityType.$
    const entityName: string = entityAttributes.Name

    const abstract: boolean = entityAttributes.Abstract ? entityAttributes.Abstract : false
    const baseType: string = entityAttributes.BaseType ? entityAttributes.BaseType : ''
    const openType: boolean = entityAttributes.OpenType ? entityAttributes.OpenType : false
    const hasStream: boolean = entityAttributes.HasStream ? entityAttributes.HasStream : false
    const rawProperties: RawProperty[] = rawEntityType.Property ? rawEntityType.Property : []
    const rawNavigationProperties: RawNavigationProperty[] = rawEntityType.NavigationProperty ? rawEntityType.NavigationProperty: []

    const properties: Property[] = rawProperties.map(propertyHandler)

    const navigationProperties: NavigationProperty[] = rawNavigationProperties.map(navigationPropertiesHandler);

    const entityType: EntityType = new EntityType(entityName, abstract, baseType, openType, hasStream, properties, navigationProperties)
    const id = `${namespace}.${entityName}`

    DefinitionMap.Instance.EntityMap.set(id, entityType)
}

const enumHandler = (rawEnumType: RawEnumType, namespace: string): void => {
    const currentEnumMap: Map<string, string> = new Map<string, string>()

    const enumName: string = rawEnumType.$.Name
    const enumMembers: RawEnumMember[] = rawEnumType.Member
    if(!enumMembers) return

    enumMembers.forEach((enumMember: RawEnumMember) => {
        const enumMemberName: string = enumMember.$.Name
        const enumMemberValue: string = enumMember.$.Value
        currentEnumMap.set(enumMemberName, enumMemberValue)
    });
    const enumType = new EnumType(enumName, currentEnumMap)
    const id = `${namespace}.${enumName}`
    DefinitionMap.Instance.EnumMap.set(id, enumType)
}
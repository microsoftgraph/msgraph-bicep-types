// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { NavigationProperty } from "./definitions/NavigationProperty";
import { Property } from "./definitions/Property";
import { CSDL, DataService, EntityContainerRaw, EntitySetRaw, RawEntityType, RawEntityTypeAttributes, RawNavigationProperty, RawNavigationPropertyAttributes, RawProperty, RawPropertyAttributes, RawSchema } from "./definitions/RawTypes";

export const constructDataStructure = (csdl: CSDL, definitionMap: DefinitionMap, scope: Set<string>): void => {

    const dataServices: DataService[] = csdl['edmx:Edmx']['edmx:DataServices']

    dataServices.forEach((dataService: DataService) => {

        const schemas: RawSchema[] = dataService['Schema']

        schemas.forEach((schema: RawSchema) => {

            const namespace: string = schema['$']['Namespace']
            const enumTypes: Object[] = schema['EnumType'] ? schema['EnumType'] : []
            const rawEntityTypes: RawEntityType[] = schema['EntityType'] ? schema['EntityType'] : []
            const complexTypes: Object[] = schema['ComplexType'] ? schema['ComplexType'] : []
            const entityContainers: EntityContainerRaw[] = schema['EntityContainer'] ? schema['EntityContainer'] : []

            rawEntityTypes.forEach((rawEntityTypes: RawEntityType) => {
                const entityAttributes: RawEntityTypeAttributes = rawEntityTypes['$']
                const entityName: string = entityAttributes['Name']

                if(!(scope.has(`${namespace}.${entityName}`))) return

                const abstract: boolean = entityAttributes['Abstract'] ? entityAttributes['Abstract'] : false
                const baseType: string = entityAttributes['BaseType'] ? entityAttributes['BaseType'] : ''
                const openType: boolean = entityAttributes['OpenType'] ? entityAttributes['OpenType'] : false
                const hasStream: boolean = entityAttributes['HasStream'] ? entityAttributes['HasStream'] : false
                const rawProperties: RawProperty[] = rawEntityTypes['Property'] ? rawEntityTypes['Property'] : []
                const rawNavigationProperties: RawNavigationProperty[] = rawEntityTypes['NavigationProperty'] ? rawEntityTypes['NavigationProperty'] : []

                const properties: Property[] = rawProperties.map((rawProperty: RawProperty) => {
                    const propertyAttributes: RawPropertyAttributes = rawProperty['$']
                    const propertyName: string = propertyAttributes['Name']
                    const propertyType: string = propertyAttributes['Type']
                    const propertyNullable: boolean = propertyAttributes['Nullable'] ? propertyAttributes['Nullable'] : false

                    //todo resolve undefined params
                    const property: Property = new Property(propertyName, propertyType, undefined, propertyNullable, undefined)
                    return property
                });

                const navigationProperties: NavigationProperty[] = rawNavigationProperties.map((rawNavigationProperty: RawNavigationProperty) => {
                    const navigationPropertyAttributes: RawNavigationPropertyAttributes = rawNavigationProperty['$']
                    const navigationPropertyName: string = navigationPropertyAttributes['Name']
                    const navigationPropertyType: string = navigationPropertyAttributes['Type']
                    const navigationPropertyNullable: boolean = navigationPropertyAttributes['Nullable'] ? navigationPropertyAttributes['Nullable'] : false
                    const navigationPropertyContainsTarget: boolean = navigationPropertyAttributes['ContainsTarget'] ? navigationPropertyAttributes['ContainsTarget'] : false
                    
                    //todo resolve undefined params
                    const navigationProperty: NavigationProperty = new NavigationProperty(navigationPropertyName, navigationPropertyType, undefined, navigationPropertyNullable, undefined, navigationPropertyContainsTarget)

                    return navigationProperty
                });

                const entityType: EntityType = new EntityType(entityName, abstract, baseType, openType, hasStream, properties, navigationProperties)

                const id = `${namespace}.${entityName}`
                definitionMap.EntityMap.set(id, entityType)
            });

            entityContainers.forEach((entityContainer: EntityContainerRaw) => {
                const entitySets: EntitySetRaw[] = entityContainer['EntitySet'] ? entityContainer['EntitySet'] : []

                entitySets.forEach((rawEntitySet: EntitySetRaw) => {
                    const entitySetAttributes = rawEntitySet['$']
                    const entitySetName = entitySetAttributes['Name']
                    const entitySetType = entitySetAttributes['EntityType']

                    definitionMap.PluralTranslationMap.set(entitySetType, entitySetName)
                });
                
            });
        
        });
        
    });

    
}
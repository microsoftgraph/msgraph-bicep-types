// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { NavigationProperty } from "./definitions/NavigationProperty";
import { Property } from "./definitions/Property";
import { CSDL, DataService, EntityContainerRaw, EntitySetRaw, RawEntityType, RawEntityTypeHeader, RawNavigationProperty, RawNavigationPropertyHeader, RawProperty, RawPropertyHeader, RawSchema } from "./definitions/RawTypes";

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
                const entityHeader: RawEntityTypeHeader = rawEntityTypes['$']
                const entityName: string = entityHeader['Name']

                if(!(scope.has(`${namespace}.${entityName}`))) return

                const abstract: boolean = entityHeader['Abstract'] ? entityHeader['Abstract'] : false
                const baseType: string = entityHeader['BaseType'] ? entityHeader['BaseType'] : ''
                const openType: boolean = entityHeader['OpenType'] ? entityHeader['OpenType'] : false
                const hasStream: boolean = entityHeader['HasStream'] ? entityHeader['HasStream'] : false
                const rawProperties: RawProperty[] = rawEntityTypes['Property'] ? rawEntityTypes['Property'] : []
                const rawNavigationProperties: RawNavigationProperty[] = rawEntityTypes['NavigationProperty'] ? rawEntityTypes['NavigationProperty'] : []

                const properties: Property[] = rawProperties.map((rawProperty: RawProperty) => {
                    const propertyHeader: RawPropertyHeader = rawProperty['$']
                    const propertyName: string = propertyHeader['Name']
                    const propertyType: string = propertyHeader['Type']
                    const propertyNullable: boolean = propertyHeader['Nullable'] ? propertyHeader['Nullable'] : false

                    const property: Property = new Property(propertyName, propertyType, propertyNullable)
                    return property
                });

                const navigationProperties: NavigationProperty[] = rawNavigationProperties.map((rawNavigationProperty: RawNavigationProperty) => {
                    const navigationPropertyHeader: RawNavigationPropertyHeader = rawNavigationProperty['$']
                    const navigationPropertyName: string = navigationPropertyHeader['Name']
                    const navigationPropertyType: string = navigationPropertyHeader['Type']
                    const navigationPropertyNullable: boolean = navigationPropertyHeader['Nullable'] ? navigationPropertyHeader['Nullable'] : false
                    const navigationPropertyContainsTarget: boolean = navigationPropertyHeader['ContainsTarget'] ? navigationPropertyHeader['ContainsTarget'] : false
                    
                    const navigationProperty: NavigationProperty = new NavigationProperty(navigationPropertyName, navigationPropertyType, navigationPropertyNullable, navigationPropertyContainsTarget)

                    return navigationProperty
                });

                const entityType: EntityType = new EntityType(entityName, abstract, baseType, openType, hasStream, properties, navigationProperties)

                const id = `${namespace}.${entityName}`
                definitionMap.EntityMap.set(id, entityType)
            });

            entityContainers.forEach((entityContainer: EntityContainerRaw) => {
                const entitySets: EntitySetRaw[] = entityContainer['EntitySet'] ? entityContainer['EntitySet'] : []

                entitySets.forEach((rawEntitySet: EntitySetRaw) => {
                    const entitySetHeader = rawEntitySet['$']
                    const entitySetName = entitySetHeader['Name']
                    const entitySetType = entitySetHeader['EntityType']

                    definitionMap.PluralTranslationMap.set(entitySetType, entitySetName)
                });
                
            });
        
        });
        
    });

    
}
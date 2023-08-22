// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { Config } from "./config";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { NavigationProperty } from "./definitions/NavigationProperty";
import { PrimitiveSwaggerTypeStruct } from "./definitions/PrimitiveSwaggerType";
import { Property } from "./definitions/Property";
import { CSDL, DataService, PrimitivePropertyType, RawEntityType, RawEntityTypeAttributes, RawNavigationProperty, RawNavigationPropertyAttributes, RawProperty, RawPropertyAttributes, RawSchema } from "./definitions/RawTypes";
import { TypeTranslator } from "./util/typeTranslator";

export const constructDataStructure = (csdl: CSDL, definitionMap: DefinitionMap): void => {
    const typeTranslator: TypeTranslator = new TypeTranslator();

    const dataServices: DataService[] = csdl['edmx:Edmx']['edmx:DataServices']

    dataServices.forEach((dataService: DataService) => {

        const schemas: RawSchema[] = dataService['Schema']

        schemas.forEach((schema: RawSchema) => {

            const namespace: string = schema['$']['Namespace']
            const rawEntityTypes: RawEntityType[] = schema['EntityType'] ? schema['EntityType'] : []

            rawEntityTypes.forEach((rawEntityTypes: RawEntityType) => {
                const entityAttributes: RawEntityTypeAttributes = rawEntityTypes['$']
                const entityName: string = entityAttributes['Name']

                if(!(Config.Instance.EntityTypes.has(`${namespace}.${entityName}`))) return

                const abstract: boolean = entityAttributes['Abstract'] ? entityAttributes['Abstract'] : false
                const baseType: string = entityAttributes['BaseType'] ? entityAttributes['BaseType'] : ''
                const openType: boolean = entityAttributes['OpenType'] ? entityAttributes['OpenType'] : false
                const hasStream: boolean = entityAttributes['HasStream'] ? entityAttributes['HasStream'] : false
                const rawProperties: RawProperty[] = rawEntityTypes['Property'] ? rawEntityTypes['Property'] : []
                const rawNavigationProperties: RawNavigationProperty[] = rawEntityTypes['NavigationProperty'] ? rawEntityTypes['NavigationProperty'] : []

                const properties: Property[] = rawProperties.map((rawProperty: RawProperty) => {
                    const propertyAttributes: RawPropertyAttributes = rawProperty['$']
                    const propertyName: string = propertyAttributes.Name
                    let propertyType: PrimitiveSwaggerTypeStruct | string
                    
                    // Primitive Types
                    if(Object.values(PrimitivePropertyType).map(v => v.toString()).includes(propertyAttributes.Type)){
                        propertyType = typeTranslator.odataToSwaggerType(propertyAttributes.Type as PrimitivePropertyType) 
                    } else { // Other
                        // ToDo: Implement complex types, enums, etc
                        return // temporary return
                        //propertyType = propertyAttributes.Type
                    }
                     
                    const propertyNullable: boolean = propertyAttributes['Nullable'] ? propertyAttributes['Nullable'] : false

                    //todo resolve undefined params
                    const property: Property = new Property(propertyName, propertyType, undefined, propertyNullable, undefined)

                    return property
                })
                .filter((property: Property | undefined) => property !== undefined) // temporary filter
                .map((prop: Property | undefined): Property => prop!); // temporary map

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
       
        });
        
    });

    if(definitionMap.EntityMap.size === 0) throw new Error('No entity types found in the CSDL')
    
}
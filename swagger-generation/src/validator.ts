// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config } from "./config";
import { CollectionProperty } from "./definitions/CollectionProperty";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { Property } from "./definitions/Property";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

export const validateReferences = (definitionMap: DefinitionMap): DefinitionMap => {
    console.log("Validating references")
    const config: Config = Config.Instance;

    config.EntityTypes.forEach(entityType => {
        const entity: EntityType | undefined = definitionMap.EntityMap.get(entityType.Name);
        if(!entity){
            throw new Error(`Entity ${entityType.Name} from config.yml is not present in the CSDL`);
        }

        entity.Property.forEach(property => {
            const isCollection: boolean = property.Type instanceof CollectionProperty;
            const reference: string | undefined = resolvePropertyTypeToReference(property);
            if(reference)
                propertyHandler(definitionMap, entity, reference, isCollection); // type is only and always string
        });

    });

    console.log("Finished validating config.yml references")

    definitionMap.EntityMap.forEach(entity => {
        entity.Property.forEach(property => {
            const isCollection: boolean = property.Type instanceof CollectionProperty;
            const reference: string | undefined = resolvePropertyTypeToReference(property);
            if(reference)
                propertyHandler(definitionMap, entity, reference, isCollection); // type is only and always string
        });
    });

    console.log("Finished validating CSDL references")

    return definitionMap;
}

export const propertyHandler = (definitionMap: DefinitionMap, entity: EntityType, propertyType: string, isCollection: boolean): void => {
    const isEnum: boolean = definitionMap.EnumMap.has(propertyType);
    const isEntity: boolean = definitionMap.EntityMap.has(propertyType);

    if(isEntity || isEnum) // There's an entity or enum with this id
        return;

    const propertyMetaName: string[] = propertyType.split('.')
    const namespacelessPropertyType: string = propertyMetaName.pop() as string;
    const alias: string = propertyMetaName.join('.')
    const namespace: string | undefined = definitionMap.AliasMap.get(alias)
    if(namespace){ // There's an alias, try again
        const entityName: string = `${namespace}.${namespacelessPropertyType}`
        if(definitionMap.EntityMap.has(entityName) || definitionMap.EnumMap.has(entityName)){ // Replace alias with namespace
            entity.Property = entity.Property.map((property: Property) => replaceAlias(property, propertyType, entityName, isCollection));
            definitionMap.EntityMap.set(entity.Name, entity);
        } else {
            console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL. Also tried to resolve ${entityName} but it is not defined in the CSDL either. Property will be removed from definitions`);
            entity.Property = entity.Property.filter(property => property.Type !== propertyType);
            definitionMap.EntityMap.set(entity.Name, entity);
        }
    } else { // There's no alias
        console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL. Property will be removed from definitions`);
        entity.Property = entity.Property.filter(property => property.Type !== propertyType);
        definitionMap.EntityMap.set(entity.Name, entity);
    }
    
}

export const replaceAlias = (property: Property, propertyType: string, entityName: string, isCollection: boolean) => {
    const propertyReference = resolvePropertyTypeToReference(property);
    if(isCollection && propertyReference === propertyType){  // If property corresponds and is collections
        property.Type = new CollectionProperty(entityName); // Replace inner type alias with namespace
    } else if(property.Type === propertyType){ // If property corresponds
        property.Type = entityName; // Replace alias with namespace
    }
    return property; // Return property
}
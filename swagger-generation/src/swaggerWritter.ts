// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig } from "./config";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { EnumType } from "./definitions/EnumType";
import { Property } from "./definitions/Property";
import { Reference } from "./definitions/Reference";
import { Path, Product, Scheme, Swagger, SwaggerVersion } from "./definitions/Swagger";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

export const writeSwagger = (): Swagger => {
    const MAX_DEPTH = 15;
    const swagger: Swagger = {
        swagger: SwaggerVersion.v2,
        info: {
            title: "Microsoft Graph",
            version: Config.Instance.APIVersion,
        },
        schemes: [
            Scheme.https
        ],
        consumes: [
            Product.application_json
        ],
        produces: [
            Product.application_json
        ],
        definitions: {},
        paths: {}
    }

    // Initialize exploration of Types

    const entityReferences: Map<string, EntityType> = new Map<string, EntityType>()
    const enumReferences: Map<string, EnumType> = new Map<string, EnumType>()

    const entityReferencesQueue: Reference[] = []

    let addedReferences: number = 0

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        const entity: EntityType = DefinitionMap.Instance.EntityMap.get(id)! // Validator already checked this assertion

        console.log("Writing swagger for " + id)
        entity.Property.forEach((property: Property) => {
            const referenceId: string | undefined = resolvePropertyTypeToReference(property);
            if(!referenceId)
                return;

            const reference: Reference = new Reference(referenceId, 0)
            
            if(handleComplexProperties(entity, reference, entityReferences, enumReferences, entityReferencesQueue))
                addedReferences++;
        });

        swagger.definitions[id] = entity.toSwaggerDefinition(entityTypeConfig.RequiredOnWrite)
    });

    while(addedReferences > 0 || entityReferencesQueue.length > 0){
        addedReferences = 0
        const currentReference: Reference = entityReferencesQueue.shift() as Reference
        const currentDepth: number = currentReference.depth
        if(currentDepth > MAX_DEPTH){
            console.error(`Max depth reached for ${currentReference.id}`)
            break;
        }
        const currentEntity: EntityType = entityReferences.get(currentReference.id) as EntityType
        currentEntity.Property.forEach((property: Property) => {
            const referenceId: string | undefined = resolvePropertyTypeToReference(property);
            if(!referenceId)
                return;

            const reference: Reference = new Reference(referenceId, currentDepth + 1)
            
            if(handleComplexProperties(currentEntity, reference, entityReferences, enumReferences, entityReferencesQueue))
                addedReferences++;
        });
    }



    // Write all references

    entityReferences.forEach((entity: EntityType, id: string) => {
        swagger.definitions[id] = entity.toSwaggerDefinition()
    });

    enumReferences.forEach((enumType: EnumType, id: string) => {
        swagger.definitions[id] = enumType.toSwaggerDefinition()
    });

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        const entityName: string = DefinitionMap.Instance.EntityMap.get(id)!.Name
        const relativeUri: string = entityTypeConfig.RootUri.split("/").pop() as string
        const host: string = `/{rootScope}/providers/Microsoft.Graph${entityTypeConfig.RootUri}/{${entityName}Id}`
        const path: Path = {
            put: {
                tags: [
                    relativeUri
                ],
                description: `Create or update a ${entityName}`,
                operationId: `${relativeUri}_Put`,
                consumes: [
                    Product.application_json
                ],
                produces: [
                    Product.application_json
                ],
                parameters: [
                    {
                        in: "body",
                        name: entityName,
                        description: `The ${entityName} to be created or updated`,
                        required: true,
                        schema: {
                            $ref: `#/definitions/${id}`
                        }
                    },
                    {
                        in: "path",
                        description: `The id of the ${entityName}`,
                        name: `${entityName}Id`,
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: `${entityName} created/updated successfully`,
                        schema: {
                            $ref: `#/definitions/${id}`
                        }
                    }
                }
            }
        }
        
        swagger.paths[host] = path
    });

    return swagger
};

const isEnumReference = (referenceId: string): boolean => {
    return DefinitionMap.Instance.EnumMap.has(referenceId)
}

const handleComplexProperties = (entity: EntityType, reference: Reference, entityReferences: Map<string,EntityType>, enumReferences: Map<string, EnumType>, referenceQueue: Reference[]): boolean => {
    const currentType: EntityType | undefined = DefinitionMap.Instance.EntityMap.get(reference.id)
    if(!currentType){ // There's no Complex Type with this id
        if(!isEnumReference(reference.id)){ // There isn't an Enum with this id
            throw new Error(`Something went wrong: Entity ${entity.Name} references non-existent ${reference.id} and skipped validator check. Depth: ${reference.depth}`);
        } 
        enumReferences.set(reference.id, DefinitionMap.Instance.EnumMap.get(reference.id)!)
        return false;
    } 
    
    // There's a ComplexType with this id
    entityReferences.set(reference.id, currentType)
    const newReference = new Reference(reference.id, reference.depth + 1)
    referenceQueue.push(newReference)
    return true;
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { Config, EntityTypeConfig } from "./config";
import { DefinitionMap, EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { EnumType } from "./definitions/EnumType";
import { Path, Product, Scheme, SecurityFlow, SecurityType, Swagger, SwaggerVersion } from "./definitions/Swagger";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

export const writeSwagger = (): Swagger => {
    const entityMap: EntityMap = DefinitionMap.Instance.EntityMap
    const enumMap: Map<string, EnumType> = DefinitionMap.Instance.EnumMap
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
        security: [
            {
                "azure_auth": [
                    "user_impersonation"
                ]
            }
        ],
        securityDefinitions: {
            "azure_auth": {
                type: SecurityType.oauth2,
                authorizationUrl: "https://login.microsoftonline.com/common/oauth2/authorize",
                flow: SecurityFlow.implicit,
                description: "Azure Active Directory OAuth2 Flow.",
                scopes: {
                    "user_impersonation": "impersonate your user account"
                }
            }
        },
        definitions: {},
        paths: {}
    }

    const entityReferences: Map<string, EntityType> = new Map<string, EntityType>()
    const enumReferences: Map<string, EnumType> = new Map<string, EnumType>()

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        const entity: EntityType = entityMap.get(id)! // Validator already checked this assertion

        console.log("Writing swagger for " + id)
        entity.Property.forEach((property) => {
            const reference: string | undefined = resolvePropertyTypeToReference(property);
            
            if(reference){ // only references (complex types)
                const complexType: EntityType | undefined = entityMap.get(reference)
                if(!complexType){ // There's no Complex Type with this id 
                    if(enumMap.has(reference)){ // There's an Enum with this id
                        enumReferences.set(reference, enumMap.get(reference)!)
                    } else {
                        throw new Error(`Something is wrong: Entity ${entity.Name} references non-existent ${reference} and skipped validator check`);
                    }
                } else { // There's a ComplexType with this id
                    entityReferences.set(reference, complexType)
                }
            }
        });


        swagger.definitions[id] = entity.toSwaggerDefinition(entityTypeConfig.RequiredOnWrite)
    });

    entityReferences.forEach((entity: EntityType, id: string) => {
        swagger.definitions[id] = entity.toSwaggerDefinition()
    });

    enumReferences.forEach((enumType: EnumType, id: string) => {
        swagger.definitions[id] = enumType.toSwaggerDefinition()
    });

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        const entityName: string = entityMap.get(id)!.Name
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
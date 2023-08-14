// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { Config, EntityTypeConfig } from "./config";
import { EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { Property } from "./definitions/Property";
import { Path, Product, Scheme, SecurityFlow, SecurityType, Swagger, SwaggerVersion } from "./definitions/Swagger";

export const writeSwagger = (entityMap: EntityMap): Swagger => {
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

    entityMap.forEach((entityType: EntityType, id: string) => {
        const properties: Property[] = []
        const property: Property = new Property("id", "string", true, false, true)
        properties.push(property)
        entityType.Property = properties

        swagger.definitions[id] = entityType.toSwaggerDefinition()
    });

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        if(! entityMap.get(id)){
            console.warn(`Entity ${id} from config.yml is not present in the CSDL`)
        }
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
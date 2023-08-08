// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { Config } from "./config";
import { EntityMap, PluralTranslationMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { Property } from "./definitions/Property";
import { Path, Product, Scheme, SecurityFlow, SecurityType, Swagger, SwaggerVersion } from "./definitions/Swagger";

export const writeSwagger = (entityMap: EntityMap, scope: EntityMap, translation: PluralTranslationMap): Swagger => {
    const swagger: Swagger = {
        swagger: SwaggerVersion.v2,
        info: {
            title: "Microsoft Graph",
            version: Config.Instance.SwaggerVersion,
        },
        schemes: [
            Scheme.http,
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

    scope.forEach((entityType: EntityType, id: string) => {
        let plural: string 
        if(translation.get(id)){
            plural = translation.get(id)!
        } else {
            console.warn(`No entity set found for ${id}`)
            const lastChar: string = id.charAt(id.length - 1)
            switch(lastChar){
            case "s":
                plural = `${id}es`
                break
            case "y":
                plural = `${id.substring(0, id.length - 1)}ies`
                break
            default:
                plural = `${id}s`
                break
            }       
        }

        let pascalCase: string = entityType.Name.charAt(0).toUpperCase() + entityType.Name.slice(1)
        let pascalPlural: string = plural.charAt(0).toUpperCase() + plural.slice(1)
        
        const host: string = `/{rootScope}/providers/Microsoft.Graph/${plural}/{${entityType.Name}Id}`
        const path: Path = {
            put: {
                tags: [
                    pascalPlural
                ],
                description: `Create or update a ${pascalCase}`,
                operationId: `${pascalPlural}_Put`,
                consumes: [
                    Product.application_json
                ],
                produces: [
                    Product.application_json
                ],
                parameters: [
                    {
                        in: "body",
                        name: entityType.Name,
                        description: `The ${entityType.Name} to be created or updated`,
                        required: true,
                        schema: {
                            $ref: `#/definitions/${id}`
                        }
                    },
                    {
                        in: "path",
                        description: `The id of the ${entityType.Name}`,
                        name: `${entityType.Name}Id`,
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: `${pascalCase} created/updated successfully`,
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
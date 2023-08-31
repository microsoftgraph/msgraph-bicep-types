// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type imports
import { Config, EntityTypeConfig } from "./config";
import { DefinitionMap, EntityMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { Path, Product, Scheme, SecurityFlow, SecurityType, Swagger, SwaggerVersion } from "./definitions/Swagger";
import { AliasTranslator } from "./util/aliasTranslator";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

export const writeSwagger = (): Swagger => {
    const entityMap: EntityMap = DefinitionMap.Instance.EntityMap
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

    Config.Instance.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
        const entity: EntityType = entityMap.get(id)! // Validator already checked this assertion

        console.log("Writing swagger for " + id)
        entity.Property.forEach((property) => {
            let reference: string | undefined = resolvePropertyTypeToReference(property);
            if(reference){ // only references (complex types)
                let complexType: EntityType | undefined = entityMap.get(reference)
                if(!complexType){ // There's no Complex Type with this id (not considering aliases)
                    const referenceMetaName: string[] = reference.split('.')
                    const namespacelessReference: string = referenceMetaName.pop() as string;
                    const alias: string = referenceMetaName.join('.')
                    const namespace: string | undefined = AliasTranslator.Instance.getNamespace(alias)
                    if(namespace){ // There's an alias, try again
                        reference = `${namespace}.${namespacelessReference}`
                        complexType = entityMap.get(reference)
                        if(complexType){ // There's a ComplexType with this id in the alias
                            entityReferences.set(reference, complexType)
                        } else {
                            throw new Error(`Entity ${entity.Name} references non-existent aliased ${reference}. This skipped validator check. Something is wrong.`);
                        }
                    } else { // There's no alias
                        throw new Error(`Entity ${entity.Name} references non-existent ${reference}. This skipped validator check. Something is wrong.`);
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
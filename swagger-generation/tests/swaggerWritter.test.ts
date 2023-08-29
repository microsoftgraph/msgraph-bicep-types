import { EntityMap } from '../src/definitions/DefinitionMap';
import { EntityType } from '../src/definitions/EntityType';
import { Config, EntityTypeConfig } from '../src/config';
import { Property } from '../src/definitions/Property';
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat, SwaggerMetaType } from '../src/definitions/PrimitiveSwaggerType';
import { Scheme, Swagger, SwaggerVersion, Product, SecurityType, SecurityFlow } from '../src/definitions/Swagger';

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('microsoft.graph.entityNameOne', {
    Name: 'microsoft.graph.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

const mockConfig = class {
    public static get Instance(): Config {
        return {
            EntityTypes: entityTypes,
            URL: 'https://example.com',
            APIVersion: 'beta'
        }
    }

}

jest.mock('../src/config', () => {
  const Config = mockConfig;

  return { Config };
})

describe('writeSwagger', () => {
    let writeSwagger: typeof import('../src/swaggerWritter').writeSwagger;
    let definitionMap: typeof import('../src/definitions/DefinitionMap').DefinitionMap;

    beforeEach(() => {
        jest.resetModules();
        writeSwagger = require('../src/swaggerWritter').writeSwagger;
        definitionMap = require('../src/definitions/DefinitionMap').DefinitionMap;
    });

    it('should generate Swagger object', () => {
        const entityMap: EntityMap = new Map<string, EntityType>();
        const properties: Property[] = [
            new Property('contentBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary), false, false, false),
            new Property('isEnabled', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined), false, false, false),
            new Property('caseStatus', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte), false, false, false),
            new Property('startDate', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date), false, false, false),
            new Property('effectiveDateTime', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime), false, false, false),
            new Property('balanceDue', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float), false, false, false),
            new Property('weight', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double), false, false, false),
            new Property('duration', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false, false),
            new Property('callChainId', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false, false),
            new Property('disc', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), false, false, false),
            new Property('version', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), false, false, false),
            new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), false, false, false),
            new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false, false),
            new Property('fakeProp', 'fakeType', false, false, false)
        ];


        const entity: EntityType = new EntityType('entityNameOne', false, undefined, undefined, undefined, properties, [])

        entityMap.set('microsoft.graph.entityNameOne', entity);

        const expectedSwagger: Swagger = {
            "swagger": SwaggerVersion.v2,
            "info": {
            "title": "Microsoft Graph",
            "version": "beta"
            },
            "schemes": [
                Scheme.https
            ],
            "consumes": [
                Product.application_json
            ],
            "produces": [
                Product.application_json
            ],
            "security": [
            {
                "azure_auth": [
                "user_impersonation"
                ]
            }
            ],
            "securityDefinitions": {
                "azure_auth": {
                    "type": SecurityType.oauth2,
                    "authorizationUrl": "https://login.microsoftonline.com/common/oauth2/authorize",
                    "flow": SecurityFlow.implicit,
                    "description": "Azure Active Directory OAuth2 Flow.",
                    "scopes": {
                    "user_impersonation": "impersonate your user account"
                    }
                }
            },
            "definitions": {
                "microsoft.graph.entityNameOne": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "contentBytes": {
                            "type": "string",
                            "format": "binary"
                        },
                        "isEnabled": {
                            "type": "boolean"
                        },
                        "caseStatus": {
                            "type": "string",
                            "format": "byte"
                        },
                        "startDate": {
                            "type": "string",
                            "format": "date"
                        },
                        "effectiveDateTime": {
                            "type": "string",
                            "format": "date-time"
                        },
                        "balanceDue": {
                            "type": "number",
                            "format": "float"
                        },
                        "weight": {
                            "type": "number",
                            "format": "double"
                        },
                        "duration": {
                            "type": "string"
                        },
                        "callChainId": {
                            "type": "string"
                        },
                        "disc": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "version": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "freeStorageSpaceInBytes": {
                            "type": "integer",
                            "format": "int64"
                        },
                        "fakeProp": {
                            "type": "fakeType"
                        }
                    }
                },
            },
            "paths": {
                "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
                    "put": {
                        "tags": [
                        "entityNameOnes"
                        ],
                        "description": "Create or update a entityNameOne",
                        "operationId": "entityNameOnes_Put",
                        "consumes": [
                        "application/json"
                        ],
                        "produces": [
                        "application/json"
                        ],
                        "parameters": [
                        {
                            "in": "body",
                            "name": "entityNameOne",
                            "description": "The entityNameOne to be created or updated",
                            "required": true,
                            "schema": {
                            "$ref": "#/definitions/microsoft.graph.entityNameOne"
                            }
                        },
                        {
                            "in": "path",
                            "description": "The id of the entityNameOne",
                            "name": "entityNameOneId",
                            "required": true,
                            "type": "string"
                        }
                        ],
                        "responses": {
                        "200": {
                            "description": "entityNameOne created/updated successfully",
                            "schema": {
                            "$ref": "#/definitions/microsoft.graph.entityNameOne"
                            }
                        }
                        }
                    }
                },
            }
        };

        definitionMap.Instance.EntityMap = entityMap;

        expect(writeSwagger()).toEqual(expectedSwagger);

    });
});
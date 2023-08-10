import { EntityMap } from '../src/definitions/DefinitionMap';
import { EntityType } from '../src/definitions/EntityType';
import { Config, EntityTypeConfig } from '../src/config';

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('microsoft.graph.entityNameOne', {
    Name: 'microsoft.graph.entityNameOne',
    RootUri: 'entityNameOnes',
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

    beforeEach(() => {
        jest.resetModules();
        writeSwagger = require('../src/swaggerWritter').writeSwagger;
    });

    it('should generate Swagger object', () => {
        const entityMap: EntityMap = new Map<string, EntityType>();

        const entity: EntityType = new EntityType('entityNameOne', undefined, undefined, undefined, undefined, [], [])

        entityMap.set('microsoft.graph.entityNameOne', entity);

        const expectedSwagger = {
            "swagger": "2.0",
            "info": {
            "title": "Microsoft Graph",
            "version": "beta"
            },
            "schemes": [
            "http",
            "https"
            ],
            "consumes": [
            "application/json"
            ],
            "produces": [
            "application/json"
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
                "type": "oauth2",
                "authorizationUrl": "https://login.microsoftonline.com/common/oauth2/authorize",
                "flow": "implicit",
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

        expect(writeSwagger(entityMap)).toEqual(expectedSwagger);

    });
});
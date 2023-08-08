import { EntityMap, PluralTranslationMap } from '../src/definitions/DefinitionMap';
import { EntityType } from '../src/definitions/EntityType';
import { Definition } from '../src/definitions/Swagger';
import { writeSwagger } from '../src/swaggerWritter';

describe('writeSwagger', () => {
  it('should generate Swagger object', () => {
    const entityMap: EntityMap = new Map<string, EntityType>();
    const scope: EntityMap = new Map<string, EntityType>();
    const translation: PluralTranslationMap = new Map<string, string>();

    const entity: EntityType = new EntityType('entityName1', undefined, undefined, undefined, undefined, [], [])

    entityMap.set('microsoft.graph.entityName1', entity);


    scope.set('microsoft.graph.entityName1', {
        Name: 'entityName1',
    } as EntityType);


    translation.set('microsoft.graph.entityName1', 'entityName1s');

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
            "microsoft.graph.entityName1": {
                "type": "object",
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string"
                  }
                }
              },
        },
        "paths": {
            "/{rootScope}/providers/Microsoft.Graph/entityName1s/{entityName1Id}": {
                "put": {
                    "tags": [
                      "EntityName1s"
                    ],
                    "description": "Create or update a EntityName1",
                    "operationId": "EntityName1s_Put",
                    "consumes": [
                      "application/json"
                    ],
                    "produces": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "body",
                        "name": "entityName1",
                        "description": "The entityName1 to be created or updated",
                        "required": true,
                        "schema": {
                          "$ref": "#/definitions/microsoft.graph.entityName1"
                        }
                      },
                      {
                        "in": "path",
                        "description": "The id of the entityName1",
                        "name": "entityName1Id",
                        "required": true,
                        "type": "string"
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": "EntityName1 created/updated successfully",
                        "schema": {
                          "$ref": "#/definitions/microsoft.graph.entityName1"
                        }
                      }
                    }
                  }
            },
        }
    };

    expect(writeSwagger(entityMap, scope, translation)).toEqual(expectedSwagger);

  });
});
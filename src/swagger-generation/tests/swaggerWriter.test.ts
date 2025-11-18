import { DefinitionMap, EntityMap } from '../src/definitions/DefinitionMap';
import { EntityType } from '../src/definitions/EntityType';
import { Config, EntityTypeConfig } from '../src/config';
import { Property } from '../src/definitions/Property';
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat, SwaggerMetaType } from '../src/definitions/PrimitiveSwaggerType';
import { Scheme, Swagger, SwaggerVersion, Product } from '../src/definitions/Swagger';
import { CollectionProperty } from '../src/definitions/CollectionProperty';
import { writeSwagger } from '../src/swaggerWriter';
import { EnumType } from '../src/definitions/EnumType';

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('microsoft.graph.entityNameOne', {
  Name: 'microsoft.graph.entityNameOne',
  RootUri: '/entityNameOnes',
  NavigationProperty: []
} as EntityTypeConfig);

const config = {
  ExtensionVersion: "0.1.8-preview",
  EntityTypes: entityTypes,
  MetadataFilePath: 'https://example.com',
  APIVersion: 'beta'
} as Config;


describe('generate swagger with primitive types', () => {
  jest.mock('../src/util/propertyTypeResolver', () => {
    const mockPropertyType = jest.requireActual('../src/util/propertyTypeResolver');
    return {
      resolvePropertyTypeToReference: jest.fn(mockPropertyType.resolvePropertyTypeToReference)
    }
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should generate swagger for entities with primitive properties', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('contentBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary), 'Content Bytes description.', false, false),
      new Property('isEnabled', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined), '', false, false),
      new Property('caseStatus', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte), '', false, false),
      new Property('startDate', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date), '', false, false),
      new Property('effectiveDateTime', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime), '', false, false),
      new Property('balanceDue', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float), '', false, false),
      new Property('weight', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double), '', false, false),
      new Property('duration', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
      new Property('callChainId', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
      new Property('disc', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), '', false, false),
      new Property('version', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), '', false, false),
      new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), '', false, false),
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];


    const entity: EntityType = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, [])

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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            },
            "contentBytes": {
              "type": "string",
              "format": "base64url",
              "description": "Content Bytes description.",
              "readOnly": false
            },
            "isEnabled": {
              "type": "boolean",
              "description": "",
              "format": undefined,
              "readOnly": false
            },
            "caseStatus": {
              "type": "string",
              "format": "byte",
              "description": "",
              "readOnly": false
            },
            "startDate": {
              "type": "string",
              "format": "date",
              "description": "",
              "readOnly": false
            },
            "effectiveDateTime": {
              "type": "string",
              "format": "date-time",
              "description": "",
              "readOnly": false
            },
            "balanceDue": {
              "type": "number",
              "format": "float",
              "description": "",
              "readOnly": false
            },
            "weight": {
              "type": "number",
              "format": "double",
              "description": "",
              "readOnly": false
            },
            "duration": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            },
            "callChainId": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            },
            "disc": {
              "type": "integer",
              "format": "int32",
              "description": "",
              "readOnly": false
            },
            "version": {
              "type": "integer",
              "format": "int32",
              "description": "",
              "readOnly": false
            },
            "freeStorageSpaceInBytes": {
              "type": "integer",
              "format": "int64",
              "description": "",
              "readOnly": false
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
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);

  });

  it('should generate swagger for entities with collections of primitive properties', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('contentBytes', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary)), 'Content Bytes description.', true, false),
      new Property('isEnabled', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined)), '', true, false),
      new Property('caseStatus', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte)), '', true, false),
      new Property('startDate', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date)), '', true, false),
      new Property('effectiveDateTime', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime)), '', true, false),
      new Property('balanceDue', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float)), '', true, false),
      new Property('weight', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double)), '', true, false),
      new Property('duration', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), '', true, false),
      new Property('callChainId', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), '', true, false),
      new Property('disc', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32)), '', true, false),
      new Property('version', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32)), '', true, false),
      new Property('freeStorageSpaceInBytes', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64)), '', true, false),
      new Property('id', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), '', true, false),
    ];

    const entity: EntityType = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, [])

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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "array",
              "items": {
                "type": "string",
                "format": undefined
              },
              "description": "",
              "readOnly": false
            },
            "contentBytes": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "base64url"
              },
              "description": "Content Bytes description.",
              "readOnly": false
            },
            "isEnabled": {
              "type": "array",
              "items": {
                "type": "boolean",
                "format": undefined
              },
              "description": "",
              "readOnly": false
            },
            "caseStatus": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "byte"
              },
              "description": "",
              "readOnly": false
            },
            "startDate": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "date"
              },
              "description": "",
              "readOnly": false
            },
            "effectiveDateTime": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "date-time"
              },
              "description": "",
              "readOnly": false
            },
            "balanceDue": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "float"
              },
              "description": "",
              "readOnly": false
            },
            "weight": {
              "type": "array",
              "items": {
                "type": "number",
                "format": "double"
              },
              "description": "",
              "readOnly": false
            },
            "duration": {
              "type": "array",
              "items": {
                "type": "string",
                "format": undefined
              },
              "description": "",
              "readOnly": false
            },
            "callChainId": {
              "type": "array",
              "items": {
                "type": "string",
                "format": undefined
              },
              "description": "",
              "readOnly": false
            },
            "disc": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int32"
              },
              "description": "",
              "readOnly": false
            },
            "version": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int32"
              },
              "description": "",
              "readOnly": false
            },
            "freeStorageSpaceInBytes": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int64"
              },
              "description": "",
              "readOnly": false
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
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);
  });

  it('should generate swagger for nested entities', () => {
    const configWithNestedEntities = {
      EntityTypes: new Map<string, EntityTypeConfig>([
        ['microsoft.graph.nestedEntity', {
          Name: 'microsoft.graph.nestedEntity',
          RootUri: '/parentEntities/nestedEntities',
          NavigationProperty: []
        } as EntityTypeConfig]
      ]),
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    } as Config;

    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), 'Free storage space in bytes description.', false, false),
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];

    const entity: EntityType = new EntityType('nestedEntity', undefined, false, undefined, undefined, undefined, properties, [])

    entityMap.set('microsoft.graph.nestedEntity', entity);

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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.nestedEntity": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            },
            "freeStorageSpaceInBytes": {
              "type": "integer",
              "format": "int64",
              "description": "Free storage space in bytes description.",
              "readOnly": false
            }
          }
        },
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/parentEntities/{parentEntitiesId}/nestedEntities/{nestedEntityId}": {
          "put": {
            "tags": [
              "nestedEntities"
            ],
            "description": "Create or update a nestedEntity",
            "operationId": "nestedEntities_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the nestedEntity",
                "name": "nestedEntityId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "nestedEntity",
                "description": "The nestedEntity to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.nestedEntity"
                }
              },
              {
                "in": "path",
                "description": "The id of the parentEntities",
                "name": "parentEntitiesId",
                "required": true,
                "type": "string"
              }
            ],
            "responses": {
              "200": {
                "description": "nestedEntity created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.nestedEntity"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, configWithNestedEntities)).toEqual(expectedSwagger);

  });

  it('should generate swagger including base entities', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), 'Free storage space in bytes description.', false, false),
    ];
    const baseProperties: Property[] = [
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];

    const entity: EntityType = new EntityType('entityNameOne', undefined, false, 'microsoft.graph.baseEntity', undefined, undefined, properties, [])
    const baseEntity: EntityType = new EntityType('baseEntity', undefined, false, undefined, undefined, undefined, baseProperties, [])

    entityMap.set('microsoft.graph.entityNameOne', entity);
    entityMap.set('microsoft.graph.baseEntity', baseEntity);

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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.baseEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameOne": {
          "allOf": [
            {
              "$ref": "#/definitions/microsoft.graph.baseEntity"
            },
            {
              "type": "object",
              "x-ms-graph-resource": true,
              "properties": {
                "freeStorageSpaceInBytes": {
                  "type": "integer",
                  "format": "int64",
                  "description": "Free storage space in bytes description.",
                  "readOnly": false
                }
              }
            }
          ]
        },
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          "put": {
            "tags": [
              "entityNameOnes"
            ],
            "description": "Create or update a entityNameOne",
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);

  });

  it('should generate swagger for readonly entities', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('uniqueName', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), 'Unique name description.', false, false),
      new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), 'Free storage space in bytes description.', false, false),
    ];
    const entity: EntityType = new EntityType('entityNameOne', 'uniqueName', false, undefined, undefined, undefined, properties, [])
    const readonlyEntityConfig: EntityTypeConfig = {
      Name: 'microsoft.graph.entityNameOne',
      RootUri: '/entityNameOnes',
      IsReadonlyResource: true
    } as EntityTypeConfig;

    const readonlyConfig: Config = {
      ExtensionVersion: "0.1.8-preview",
      EntityTypes: new Map<string, EntityTypeConfig>([
        ['microsoft.graph.entityNameOne', readonlyEntityConfig]
      ]),
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    }
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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "uniqueName": {
              "type": "string",
              "x-constant-key": true,
              "x-ms-graph-key": true,
              "description": "Unique name description.",
              "format": undefined,
              "readOnly": false
            },
            "freeStorageSpaceInBytes": {
              "type": "integer",
              "format": "int64",
              "description": "Free storage space in bytes description.",
              "readOnly": false
            }
          }
        },
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          "get": {
            "tags": [
              "entityNameOnes"
            ],
            "description": "Get a entityNameOne",
            "operationId": "entityNameOnes_get",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
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
                "description": "entityNameOne get successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, readonlyConfig)).toEqual(expectedSwagger);

  });
});

describe('complexTypes', () => {
  jest.mock('../src/util/propertyTypeResolver', () => {
    const mockPropertyType = jest.requireActual('../src/util/propertyTypeResolver');
    return {
      resolvePropertyTypeToReference: jest.fn(mockPropertyType.resolvePropertyTypeToReference)
    }
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should generate swagger for entities with complex nested types', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('contentBytes', 'microsoft.graph.entityNameTwo', 'Content bytes description', false, false),
      new Property('isEnabled', 'microsoft.graph.entityNameThree', '', false, false),
    ];
    const entity: EntityType = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, [])

    const propertiesComplexOne: Property[] = [
      new Property('propertyOne', 'microsoft.graph.entityNameFour', 'Property one description', false, false),
    ];
    const complexTypeOne: EntityType = new EntityType('entityNameTwo', undefined, false, undefined, undefined, undefined, propertiesComplexOne, [])

    const entityComplexTwo: EntityType = new EntityType('entityNameThree', undefined, false, undefined, undefined, undefined, [
      new Property('propertyOne', new CollectionProperty('microsoft.graph.entityNameFour'), '', false, false)
    ], [])

    const entityComplexThree: EntityType = new EntityType('entityNameFour', undefined, false, undefined, undefined, undefined, [], [])

    entityMap.set('microsoft.graph.entityNameOne', entity);
    entityMap.set('microsoft.graph.entityNameTwo', complexTypeOne);
    entityMap.set('microsoft.graph.entityNameThree', entityComplexTwo);
    entityMap.set('microsoft.graph.entityNameFour', entityComplexThree);

    const expectedSwagger: Swagger = {
      swagger: SwaggerVersion.v2,
      info: {
        title: "Microsoft Graph",
        version: "beta"
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
      definitions: {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          type: "object",
          "x-ms-graph-resource": true,
          properties: {
            "contentBytes": {
              $ref: "#/definitions/microsoft.graph.entityNameTwo",
              "description": "Content bytes description",
              "readOnly": false
            },
            "isEnabled": {
              $ref: "#/definitions/microsoft.graph.entityNameThree",
              "description": "",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameTwo": {
          type: "object",
          properties: {
            "propertyOne": {
              $ref: "#/definitions/microsoft.graph.entityNameFour",
              "description": "Property one description",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameThree": {
          type: "object",
          properties: {
            "propertyOne": {
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.entityNameFour"
              },
              "description": "",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameFour": {
          type: "object",
          properties: {}
        }
      },
      paths: {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          put: {
            tags: [
              "entityNameOnes"
            ],
            description: "Create or update a entityNameOne",
            operationId: "entityNameOnes_upsert",
            consumes: [
              "application/json"
            ],
            produces: [
              "application/json"
            ],
            parameters: [
              {
                in: "path",
                description: "The id of the entityNameOne",
                name: "entityNameOneId",
                required: true,
                type: "string"
              },
              {
                in: "body",
                name: "entityNameOne",
                description: "The entityNameOne to create or update",
                required: true,
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            responses: {
              "200": {
                description: "entityNameOne created or updated successfully",
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);

  });


});

describe('complex types with collections', () => {
  jest.mock('../src/util/propertyTypeResolver', () => {
    return {
      resolvePropertyTypeToReference: (property: Property) => {
        return (property.Type as CollectionProperty).Type as string;
      }
    }
  });

  it('should generate swagger for entities with collections of complex nested types', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('contentBytes', new CollectionProperty('microsoft.graph.entityNameTwo'), 'Content bytes description', false, false),
      new Property('isEnabled', new CollectionProperty('microsoft.graph.entityNameThree'), '', false, false),
    ];
    const entity: EntityType = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, [])

    const propertiesComplexOne: Property[] = [
      new Property('propertyOne', new CollectionProperty('microsoft.graph.entityNameFour'), 'Property one description', false, false),
    ];
    const complexTypeOne: EntityType = new EntityType('entityNameTwo', undefined, false, undefined, undefined, undefined, propertiesComplexOne, [])

    const entityComplexTwo: EntityType = new EntityType('entityNameThree', undefined, false, undefined, undefined, undefined, [
      new Property('propertyOne', new CollectionProperty('microsoft.graph.entityNameFour'), '', false, false)
    ], [])

    const entityComplexThree: EntityType = new EntityType('entityNameFour', undefined, false, undefined, undefined, undefined, [], [])

    entityMap.set('microsoft.graph.entityNameOne', entity);
    entityMap.set('microsoft.graph.entityNameTwo', complexTypeOne);
    entityMap.set('microsoft.graph.entityNameThree', entityComplexTwo);
    entityMap.set('microsoft.graph.entityNameFour', entityComplexThree);

    const expectedSwagger: Swagger = {
      swagger: SwaggerVersion.v2,
      info: {
        title: "Microsoft Graph",
        version: "beta"
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
      definitions: {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          type: "object",
          "x-ms-graph-resource": true,
          properties: {
            "contentBytes": {
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.entityNameTwo"
              },
              "description": "Content bytes description",
              "readOnly": false
            },
            "isEnabled": {
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.entityNameThree"
              },
              "description": "",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameTwo": {
          type: "object",
          properties: {
            "propertyOne": {
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.entityNameFour"
              },
              "description": "Property one description",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameThree": {
          type: "object",
          properties: {
            "propertyOne": {
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.entityNameFour"
              },
              "description": "",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameFour": {
          type: "object",
          properties: {}
        }
      },
      paths: {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          put: {
            tags: [
              "entityNameOnes"
            ],
            description: "Create or update a entityNameOne",
            operationId: "entityNameOnes_upsert",
            consumes: [
              "application/json"
            ],
            produces: [
              "application/json"
            ],
            parameters: [
              {
                in: "path",
                description: "The id of the entityNameOne",
                name: "entityNameOneId",
                required: true,
                type: "string"
              },
              {
                in: "body",
                name: "entityNameOne",
                description: "The entityNameOne to create or update",
                required: true,
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            responses: {
              "200": {
                description: "entityNameOne created or updated successfully",
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);

  });
});

describe('enums', () => {
  jest.mock('../src/util/propertyTypeResolver', () => {
    const mockPropertyType = jest.requireActual('../src/util/propertyTypeResolver');
    return {
      resolvePropertyTypeToReference: jest.fn(mockPropertyType.resolvePropertyTypeToReference)
    }
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should generate swagger for entities with enum properties', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const EnumMap: Map<string, EnumType> = new Map<string, EnumType>();

    const enumValues: Map<string, string> = new Map<string, string>();
    enumValues.set('enumValueOne', 'enumValueOne');
    enumValues.set('enumValueTwo', 'enumValueTwo');
    enumValues.set('enumValueThree', 'enumValueThree');
    const enumType: EnumType = new EnumType('entityNameFour', enumValues);
    EnumMap.set('microsoft.graph.entityNameFour', enumType);

    const properties: Property[] = [
      new Property('contentBytes', 'microsoft.graph.entityNameTwo', 'Content bytes description', false, false),
    ];
    const entity: EntityType = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, [])

    const propertiesComplexOne: Property[] = [
      new Property('propertyOne', 'microsoft.graph.entityNameThree', 'Property one description', false, false),
    ];

    const complexTypeOne: EntityType = new EntityType('entityNameTwo', undefined, false, undefined, undefined, undefined, propertiesComplexOne, [])

    const propertiesComplexTwo: Property[] = [
      new Property('propertyOne', 'microsoft.graph.entityNameFour', '', false, false),
    ];

    const entityComplexTwo: EntityType = new EntityType('entityNameThree', undefined, false, undefined, undefined, undefined, propertiesComplexTwo, [])

    entityMap.set('microsoft.graph.entityNameOne', entity);
    entityMap.set('microsoft.graph.entityNameTwo', complexTypeOne);
    entityMap.set('microsoft.graph.entityNameThree', entityComplexTwo);

    const expectedSwagger: Swagger = {
      swagger: SwaggerVersion.v2,
      info: {
        title: "Microsoft Graph",
        version: "beta"
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
      definitions: {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          type: "object",
          "x-ms-graph-resource": true,
          properties: {
            "contentBytes": {
              $ref: "#/definitions/microsoft.graph.entityNameTwo",
              "description": "Content bytes description",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameTwo": {
          type: "object",
          properties: {
            "propertyOne": {
              $ref: "#/definitions/microsoft.graph.entityNameThree",
              description: "Property one description",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameThree": {
          type: "object",
          properties: {
            "propertyOne": {
              $ref: "#/definitions/microsoft.graph.entityNameFour",
              description: "",
              "readOnly": false
            }
          }
        },
        "microsoft.graph.entityNameFour": {
          type: "string",
          enum: [
            "enumValueOne",
            "enumValueTwo",
            "enumValueThree"
          ],
        }
      },
      paths: {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          put: {
            tags: [
              "entityNameOnes"
            ],
            description: "Create or update a entityNameOne",
            operationId: "entityNameOnes_upsert",
            consumes: [
              "application/json"
            ],
            produces: [
              "application/json"
            ],
            parameters: [
              {
                in: "path",
                description: "The id of the entityNameOne",
                name: "entityNameOneId",
                required: true,
                type: "string"
              },
              {
                in: "body",
                name: "entityNameOne",
                description: "The entityNameOne to create or update",
                required: true,
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            responses: {
              "200": {
                description: "entityNameOne created or updated successfully",
                schema: {
                  $ref: "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        },
      }
    };

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = EnumMap;

    expect(writeSwagger(definitionMap, config)).toEqual(expectedSwagger);
  });
});

describe('singleton resource support', () => {
  it('should generate swagger path without ID parameter for singleton resources', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    
    const adminEntity = new EntityType('admin', undefined, false, undefined, false, false, [], []);
    entityMap.set('microsoft.graph.admin', adminEntity);

    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
    entityTypes.set('microsoft.graph.admin', {
      Name: 'microsoft.graph.admin',
      RootUri: '/admin',
      Upsertable: true,
      IsSingleton: true,
      PathSegmentName: 'admin',
      EntitySetPath: 'admin',
      NavigationProperty: []
    } as EntityTypeConfig);

    const config = {
      ExtensionVersion: "1.0.0",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    } as Config;

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    const result = writeSwagger(definitionMap, config);

    // Check that the singleton path exists without ID parameter
    expect(result.paths['/{rootScope}/providers/Microsoft.Graph/admin']).toBeDefined();
    
    // Check that the operation exists
    const adminPath = result.paths['/{rootScope}/providers/Microsoft.Graph/admin'];
    expect(adminPath.put).toBeDefined();
    
    // Check that no ID parameter is included for singleton
    if (adminPath.put) {
      const parameters = adminPath.put.parameters;
      const idParameter = parameters.find(p => p.name === 'adminId');
      expect(idParameter).toBeUndefined();
      
      // Should still have body parameter
      const bodyParameter = parameters.find(p => p.in === 'body');
      expect(bodyParameter).toBeDefined();
    }
  });

  it('should generate swagger path with ID parameter for non-singleton resources', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    
    const userEntity = new EntityType('user', undefined, false, undefined, false, false, [], []);
    entityMap.set('microsoft.graph.user', userEntity);

    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
    entityTypes.set('microsoft.graph.user', {
      Name: 'microsoft.graph.user',
      RootUri: '/users',
      Upsertable: true,
      IsSingleton: false,
      NavigationProperty: []
    } as EntityTypeConfig);

    const config = {
      ExtensionVersion: "1.0.0",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    } as Config;

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    const result = writeSwagger(definitionMap, config);

    // Check that the regular path exists with ID parameter
    expect(result.paths['/{rootScope}/providers/Microsoft.Graph/users/{userId}']).toBeDefined();
    
    // Check that the operation exists
    const userPath = result.paths['/{rootScope}/providers/Microsoft.Graph/users/{userId}'];
    expect(userPath.put).toBeDefined();
    
    // Check that ID parameter is included for non-singleton
    if (userPath.put) {
      const parameters = userPath.put.parameters;
      const idParameter = parameters.find(p => p.name === 'userId');
      expect(idParameter).toBeDefined();
      if (idParameter) {
        expect(idParameter.in).toBe('path');
        expect(idParameter.required).toBe(true);
      }
    }
  });

  it('should generate swagger for container singleton resources', () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    
    const domainRegEntity = new EntityType('domainRegistration', undefined, false, undefined, false, false, [], []);
    entityMap.set('microsoft.graph.domainRegistration', domainRegEntity);

    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
    entityTypes.set('microsoft.graph.domainRegistration', {
      Name: 'microsoft.graph.domainRegistration',
      RootUri: '/applications/domainRegistration',
      Upsertable: true,
      IsSingleton: true,
      PathSegmentName: 'domainRegistration',
      EntitySetPath: 'applications/domainRegistration',
      ContainerEntitySet: 'applications',
      NavigationProperty: []
    } as EntityTypeConfig);

    const config = {
      ExtensionVersion: "1.0.0",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    } as Config;

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    const result = writeSwagger(definitionMap, config);

    // Check that the container singleton path exists without ID parameter
    expect(result.paths['/{rootScope}/providers/Microsoft.Graph/applications/{applicationsId}/domainRegistration']).toBeDefined();
    
    // Check that the operation exists
    const domainRegPath = result.paths['/{rootScope}/providers/Microsoft.Graph/applications/{applicationsId}/domainRegistration'];
    expect(domainRegPath.put).toBeDefined();
    
    // Check that no ID parameter is included for the singleton itself
    if (domainRegPath.put) {
      const parameters = domainRegPath.put.parameters;
      const singletonIdParameter = parameters.find(p => p.name === 'domainRegistrationId');
      expect(singletonIdParameter).toBeUndefined();
      
      // Should still have container ID parameter
      const containerIdParameter = parameters.find(p => p.name === 'applicationsId');
      expect(containerIdParameter).toBeDefined();
      
      // Should still have body parameter
      const bodyParameter = parameters.find(p => p.in === 'body');
      expect(bodyParameter).toBeDefined();
    }
  });
});

describe('generate swagger with enhanced relationship types', () => {
  const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

  entityTypes.set('microsoft.graph.entityNameOne', {
    Name: 'microsoft.graph.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: []
  } as EntityTypeConfig);

  it('should generate enhanced relationship structure for beta 1.1.0-preview', () => {
    const configEnhanced = {
      ExtensionVersion: "1.1.0-preview",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'beta'
    } as Config;

    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];
    const rootEntity = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, []);
    entityMap.set('microsoft.graph.entityNameOne', rootEntity);

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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationshipMember": {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier of the relationship member."
            },
            type: {
              type: "string",
              description: "The type of the relationship member (e.g., user, group, servicePrincipal). This is a read-only property populated by the system.",
              readOnly: true
            },
            displayName: {
              type: "string",
              description: "The display name of the relationship member. This is a read-only property populated by the system.",
              readOnly: true
            },
            userPrincipalName: {
              type: "string",
              description: "The user principal name (UPN) of the relationship member. Only populated for user objects. This is a read-only property populated by the system.",
              readOnly: true
            },
            appId: {
              type: "string",
              description: "The application ID of the relationship member. Only populated for service principal objects. This is a read-only property populated by the system.",
              readOnly: true
            },
            uniqueName: {
              type: "string", 
              description: "A unique name that can be used to reference this relationship member in templates. This is a read-only property populated by the system.",
              readOnly: true
            }
          },
          required: ["id"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of relationship members with their IDs and types.",
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.relationshipMember"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            }
          }
        }
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          "put": {
            "tags": [
              "entityNameOnes"
            ],
            "description": "Create or update a entityNameOne",
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        }
      }
    };

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    expect(writeSwagger(definitionMap, configEnhanced)).toEqual(expectedSwagger);
  });

  it('should generate enhanced relationship structure for v1.1 0.1.1-preview', () => {
    const configEnhanced = {
      ExtensionVersion: "0.1.1-preview",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'v1.1'
    } as Config;

    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];
    const rootEntity = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, []);
    entityMap.set('microsoft.graph.entityNameOne', rootEntity);

    const expectedSwagger: Swagger = {
      "swagger": SwaggerVersion.v2,
      "info": {
        "title": "Microsoft Graph",
        "version": "v1.1"
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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationshipMember": {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier of the relationship member."
            },
            type: {
              type: "string",
              description: "The type of the relationship member (e.g., user, group, servicePrincipal). This is a read-only property populated by the system.",
              readOnly: true
            },
            displayName: {
              type: "string",
              description: "The display name of the relationship member. This is a read-only property populated by the system.",
              readOnly: true
            },
            userPrincipalName: {
              type: "string",
              description: "The user principal name (UPN) of the relationship member. Only populated for user objects. This is a read-only property populated by the system.",
              readOnly: true
            },
            appId: {
              type: "string",
              description: "The application ID of the relationship member. Only populated for service principal objects. This is a read-only property populated by the system.",
              readOnly: true
            },
            uniqueName: {
              type: "string", 
              description: "A unique name that can be used to reference this relationship member in templates. This is a read-only property populated by the system.",
              readOnly: true
            }
          },
          required: ["id"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of relationship members with their IDs and types.",
              type: "array",
              items: {
                $ref: "#/definitions/microsoft.graph.relationshipMember"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            }
          }
        }
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          "put": {
            "tags": [
              "entityNameOnes"
            ],
            "description": "Create or update a entityNameOne",
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        }
      }
    };

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    expect(writeSwagger(definitionMap, configEnhanced)).toEqual(expectedSwagger);
  });

  it('should generate legacy relationship structure for non-enhanced versions', () => {
    const configLegacy = {
      ExtensionVersion: "1.0.0",
      EntityTypes: entityTypes,
      MetadataFilePath: 'https://example.com',
      APIVersion: 'v1.0'
    } as Config;

    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityMap: EntityMap = new Map<string, EntityType>();
    const properties: Property[] = [
      new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), '', false, false),
    ];
    const rootEntity = new EntityType('entityNameOne', undefined, false, undefined, undefined, undefined, properties, []);
    entityMap.set('microsoft.graph.entityNameOne', rootEntity);

    const expectedSwagger: Swagger = {
      "swagger": SwaggerVersion.v2,
      "info": {
        "title": "Microsoft Graph",
        "version": "v1.0"
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
      "definitions": {
        "microsoft.graph.relationshipSemantics": {
          type: "string",
          enum: ["append", "replace"]
        },
        "microsoft.graph.relationship": {
          type: "object",
          properties: {
            relationshipSemantics: {
              $ref: "#/definitions/microsoft.graph.relationshipSemantics",
              description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
            },
            relationships: {
              description: "The list of object ids to be included in the relationship.",
              type: "array",
              items: {
                "type": "string"
              },
            },
          },
          required: ["relationships"]
        },
        "microsoft.graph.entityNameOne": {
          "type": "object",
          "x-ms-graph-resource": true,
          "properties": {
            "id": {
              "type": "string",
              "description": "",
              "format": undefined,
              "readOnly": false
            }
          }
        }
      },
      "paths": {
        "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
          "put": {
            "tags": [
              "entityNameOnes"
            ],
            "description": "Create or update a entityNameOne",
            "operationId": "entityNameOnes_upsert",
            "consumes": [
              "application/json"
            ],
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "description": "The id of the entityNameOne",
                "name": "entityNameOneId",
                "required": true,
                "type": "string"
              },
              {
                "in": "body",
                "name": "entityNameOne",
                "description": "The entityNameOne to create or update",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "entityNameOne created or updated successfully",
                "schema": {
                  "$ref": "#/definitions/microsoft.graph.entityNameOne"
                }
              }
            }
          }
        }
      }
    };

    definitionMap.EntityMap = entityMap;
    definitionMap.EnumMap = new Map();

    expect(writeSwagger(definitionMap, configLegacy)).toEqual(expectedSwagger);
  });

});
import { DefinitionMap, EntityMap } from '../src/definitions/DefinitionMap';
import { EntityType } from '../src/definitions/EntityType';
import { Config, EntityTypeConfig } from '../src/config';
import { Property } from '../src/definitions/Property';
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat, SwaggerMetaType } from '../src/definitions/PrimitiveSwaggerType';
import { Scheme, Swagger, SwaggerVersion, Product } from '../src/definitions/Swagger';
import { CollectionProperty } from '../src/definitions/CollectionProperty';
import { writeSwagger } from '../src/swaggerWritter';
import { EnumType } from '../src/definitions/EnumType';

jest.mock('../src/config', () => {
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

    const Config = mockConfig;

    return { Config };
})

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
            new Property('contentBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary), false, false),
            new Property('isEnabled', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined), false, false),
            new Property('caseStatus', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte), false, false),
            new Property('startDate', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date), false, false),
            new Property('effectiveDateTime', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime), false, false),
            new Property('balanceDue', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float), false, false),
            new Property('weight', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double), false, false),
            new Property('duration', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false),
            new Property('callChainId', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false),
            new Property('disc', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), false, false),
            new Property('version', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32), false, false),
            new Property('freeStorageSpaceInBytes', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64), false, false),
            new Property('id', new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined), false, false),
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
            "definitions": {
                "microsoft.graph.entityNameOne": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "contentBytes": {
                            "type": "string",
                            "format": "base64url"
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

        definitionMap.EntityMap = entityMap;

        expect(writeSwagger(definitionMap)).toEqual(expectedSwagger);

    });

    it('should generate swagger for entities with collections of primitive properties', () => {
        const definitionMap: DefinitionMap = new DefinitionMap();
        const entityMap: EntityMap = new Map<string, EntityType>();
        const properties: Property[] = [
            new Property('contentBytes', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary)), true, false),
            new Property('isEnabled', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined)), true, false),
            new Property('caseStatus', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte)), true, false),
            new Property('startDate', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date)), true, false),
            new Property('effectiveDateTime', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime)), true, false),
            new Property('balanceDue', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float)), true, false),
            new Property('weight', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double)), true, false),
            new Property('duration', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), true, false),
            new Property('callChainId', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), true, false),
            new Property('disc', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32)), true, false),
            new Property('version', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32)), true, false),
            new Property('freeStorageSpaceInBytes', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64)), true, false),
            new Property('id', new CollectionProperty(new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)), true, false),
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
            "definitions": {
                "microsoft.graph.entityNameOne": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "contentBytes": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "format": "base64url"
                            }
                        },
                        "isEnabled": {
                            "type": "array",
                            "items": {
                                "type": "boolean"
                            }
                        },
                        "caseStatus": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "format": "byte"
                            }
                        },
                        "startDate": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "format": "date"
                            }
                        },
                        "effectiveDateTime": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "format": "date-time"
                            }
                        },
                        "balanceDue": {
                            "type": "array",
                            "items": {
                                "type": "number",
                                "format": "float"
                            }
                        },
                        "weight": {
                            "type": "array",
                            "items": {
                                "type": "number",
                                "format": "double"
                            }
                        },
                        "duration": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "callChainId": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "disc": {
                            "type": "array",
                            "items": {
                                "type": "integer",
                                "format": "int32"
                            }
                        },
                        "version": {
                            "type": "array",
                            "items": {
                                "type": "integer",
                                "format": "int32"
                            }
                        },
                        "freeStorageSpaceInBytes": {
                            "type": "array",
                            "items": {
                                "type": "integer",
                                "format": "int64"
                            }
                        },
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

        definitionMap.EntityMap = entityMap;

        expect(writeSwagger(definitionMap)).toEqual(expectedSwagger);
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
    }

    );

    it('should generate swagger for entities with complex nested types', () => {
        const definitionMap: DefinitionMap = new DefinitionMap();
        const entityMap: EntityMap = new Map<string, EntityType>();
        const properties: Property[] = [
            new Property('contentBytes', 'microsoft.graph.entityNameTwo', false, false),
            new Property('isEnabled', 'microsoft.graph.entityNameThree', false, false),
        ];
        const entity: EntityType = new EntityType('entityNameOne', false, undefined, undefined, undefined, properties, [])

        const propertiesComplexOne: Property[] = [
            new Property('propertyOne', 'microsoft.graph.entityNameFour', false, false),
        ];
        const complexTypeOne: EntityType = new EntityType('entityNameTwo', false, undefined, undefined, undefined, propertiesComplexOne, [])
        
        const entityComplexTwo: EntityType = new EntityType('entityNameThree', false, undefined, undefined, undefined, [], [])

        const entityComplexThree: EntityType = new EntityType('entityNameFour', false, undefined, undefined, undefined, [], [])
        
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
                "microsoft.graph.entityNameOne": {
                    type: "object",
                    properties: {
                        "contentBytes": {
                            $ref: "#/definitions/microsoft.graph.entityNameTwo"
                        },
                        "isEnabled": {
                            $ref: "#/definitions/microsoft.graph.entityNameThree"
                        }
                    }
                },
                "microsoft.graph.entityNameTwo": {
                    type: "object",
                    properties: {
                        "propertyOne": {
                            $ref: "#/definitions/microsoft.graph.entityNameFour"
                        }
                    }
                },
                "microsoft.graph.entityNameThree": {
                    type: "object",
                    properties: {}
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
                        operationId: "entityNameOnes_Put",
                        consumes: [
                            "application/json"
                        ],
                        produces: [
                            "application/json"
                        ],
                        parameters: [
                        {
                            in: "body",
                            name: "entityNameOne",
                            description: "The entityNameOne to be created or updated",
                            required: true,
                            schema: {
                                $ref: "#/definitions/microsoft.graph.entityNameOne"
                            }
                        },
                        {
                            in: "path",
                            description: "The id of the entityNameOne",
                            name: "entityNameOneId",
                            required: true,
                            type: "string"
                        }
                        ],
                        responses: {
                        "200": {
                            description: "entityNameOne created/updated successfully",
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

        expect(writeSwagger(definitionMap)).toEqual(expectedSwagger);

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
            new Property('contentBytes', new CollectionProperty('microsoft.graph.entityNameTwo'), false, false),
            new Property('isEnabled', new CollectionProperty('microsoft.graph.entityNameThree'), false, false),
        ];
        const entity: EntityType = new EntityType('entityNameOne', false, undefined, undefined, undefined, properties, [])

        const propertiesComplexOne: Property[] = [
            new Property('propertyOne', new CollectionProperty('microsoft.graph.entityNameFour'), false, false),
        ];
        const complexTypeOne: EntityType = new EntityType('entityNameTwo', false, undefined, undefined, undefined, propertiesComplexOne, [])
        
        const entityComplexTwo: EntityType = new EntityType('entityNameThree', false, undefined, undefined, undefined, [], [])

        const entityComplexThree: EntityType = new EntityType('entityNameFour', false, undefined, undefined, undefined, [], [])
        
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
                "microsoft.graph.entityNameOne": {
                    type: "object",
                    properties: {
                        "contentBytes": {
                            type: "array",
                            items: {
                                $ref: "#/definitions/microsoft.graph.entityNameTwo"
                            }
                        },
                        "isEnabled": {
                            type: "array",
                            items: {
                                $ref: "#/definitions/microsoft.graph.entityNameThree"
                            }
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
                            }
                        }
                    }
                },
                "microsoft.graph.entityNameThree": {
                    type: "object",
                    properties: {}
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
                        operationId: "entityNameOnes_Put",
                        consumes: [
                            "application/json"
                        ],
                        produces: [
                            "application/json"
                        ],
                        parameters: [
                        {
                            in: "body",
                            name: "entityNameOne",
                            description: "The entityNameOne to be created or updated",
                            required: true,
                            schema: {
                                $ref: "#/definitions/microsoft.graph.entityNameOne"
                            }
                        },
                        {
                            in: "path",
                            description: "The id of the entityNameOne",
                            name: "entityNameOneId",
                            required: true,
                            type: "string"
                        }
                        ],
                        responses: {
                        "200": {
                            description: "entityNameOne created/updated successfully",
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

        expect(writeSwagger(definitionMap)).toEqual(expectedSwagger);
    
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
            new Property('contentBytes', 'microsoft.graph.entityNameTwo', false, false),
        ];
        const entity: EntityType = new EntityType('entityNameOne', false, undefined, undefined, undefined, properties, [])

        const propertiesComplexOne: Property[] = [
            new Property('propertyOne', 'microsoft.graph.entityNameThree', false, false),
        ];

        const complexTypeOne: EntityType = new EntityType('entityNameTwo', false, undefined, undefined, undefined, propertiesComplexOne, [])

        const propertiesComplexTwo: Property[] = [
            new Property('propertyOne', 'microsoft.graph.entityNameFour', false, false),
        ];
        
        const entityComplexTwo: EntityType = new EntityType('entityNameThree', false, undefined, undefined, undefined, propertiesComplexTwo, [])

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
                "microsoft.graph.entityNameOne": {
                    type: "object",
                    properties: {
                        "contentBytes": {
                            $ref: "#/definitions/microsoft.graph.entityNameTwo"
                        }
                    }
                },
                "microsoft.graph.entityNameTwo": {
                    type: "object",
                    properties: {
                        "propertyOne": {
                            $ref: "#/definitions/microsoft.graph.entityNameThree"
                        }
                    }
                },
                "microsoft.graph.entityNameThree": {
                    type: "object",
                    properties: {
                        "propertyOne": {
                            $ref: "#/definitions/microsoft.graph.entityNameFour"
                        }
                    }
                },
                "microsoft.graph.entityNameFour": {
                    type: "string",
                    enum: [
                        "enumValueOne",
                        "enumValueTwo",
                        "enumValueThree"
                    ]
                }
            },
            paths: {
                "/{rootScope}/providers/Microsoft.Graph/entityNameOnes/{entityNameOneId}": {
                    put: {
                        tags: [
                        "entityNameOnes"
                        ],
                        description: "Create or update a entityNameOne",
                        operationId: "entityNameOnes_Put",
                        consumes: [
                            "application/json"
                        ],
                        produces: [
                            "application/json"
                        ],
                        parameters: [
                        {
                            in: "body",
                            name: "entityNameOne",
                            description: "The entityNameOne to be created or updated",
                            required: true,
                            schema: {
                                $ref: "#/definitions/microsoft.graph.entityNameOne"
                            }
                        },
                        {
                            in: "path",
                            description: "The id of the entityNameOne",
                            name: "entityNameOneId",
                            required: true,
                            type: "string"
                        }
                        ],
                        responses: {
                        "200": {
                            description: "entityNameOne created/updated successfully",
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

        expect(writeSwagger(definitionMap)).toEqual(expectedSwagger);
    });

});

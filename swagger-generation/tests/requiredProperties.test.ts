import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { CSDL } from "../src/definitions/RawTypes";
import { constructDataStructure } from "../src/deserializer";
import { Config, EntityTypeConfig } from "../src/config";
import { Swagger } from "../src/definitions/Swagger";

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: [],
    RequiredOnWrite: [
        "fakeProp",
    ],
} as EntityTypeConfig);

const entityTypesTwo: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypesTwo.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: [],
    RequiredOnWrite: [
        "propertyName",
    ],
} as EntityTypeConfig);



jest.mock('../src/config', () => {
    const mockConfiguration = class {
        public static get Instance(): Config {
            return {
                EntityTypes: entityTypes,
                URL: 'https://example.com',
                APIVersion: 'beta'
            }
        }
    }
    return { Config: mockConfiguration };
})

const csdl: CSDL = {
    'edmx:Edmx': {
        'edmx:DataServices': [
            {
                Schema: [
                    {
                        $: {
                            Namespace: 'namespace',

                        },
                        EntityType: [
                            {
                                $: {
                                    Name: 'entityNameOne',
                                },
                                Property: [
                                    {
                                        $: {
                                            Name: 'propertyName',
                                            Type: 'Edm.String'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameTwo',
                                            Type: 'namespace.entityNameTwo'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameThree',
                                            Type: 'namespace.entityNameTwo'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameFour',
                                            Type: 'Edm.Test'
                                        },
                                    }
                                ],
                                NavigationProperty: []
                            }
                        ],
                    },
                ],
            },
        ],
    },
};

describe("when required properties are not real", () => {

    let writeSwagger: typeof import('../src/swaggerWritter').writeSwagger;

    beforeEach(() => {
        jest.resetModules();
        writeSwagger = require('../src/swaggerWritter').writeSwagger;
    });

    it("should throw an error", () => {
        const definitionMap: DefinitionMap = new DefinitionMap()

        constructDataStructure(csdl, definitionMap)

        expect(() => writeSwagger(definitionMap.EntityMap)).toThrowError("Required property fakeProp not found in entityNameOne")
    })
})

describe("when required properties are real", () => {

    let writeSwagger: typeof import('../src/swaggerWritter').writeSwagger;

    beforeEach(() => {
        jest.resetModules();
        jest.mock('../src/config', () => {
            const mockConfiguration = class {
                public static get Instance(): Config {
                    return {
                        EntityTypes: entityTypesTwo,
                        URL: 'https://example.com',
                        APIVersion: 'beta'
                    }
                }
            }
            return { Config: mockConfiguration };
        })

        writeSwagger = require('../src/swaggerWritter').writeSwagger;
    });

    it("should not throw an error", () => {
        const definitionMap: DefinitionMap = new DefinitionMap()

        constructDataStructure(csdl, definitionMap)

        expect(() => writeSwagger(definitionMap.EntityMap)).not.toThrowError()

        const swagger: Swagger = writeSwagger(definitionMap.EntityMap)

        expect(swagger.definitions['namespace.entityNameOne'].required).toContain('propertyName')

    })
})
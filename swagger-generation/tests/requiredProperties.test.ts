import { CSDL } from "../src/definitions/RawTypes";
import { Config, EntityTypeConfig } from "../src/config";
import { Definition, Swagger } from "../src/definitions/Swagger";
import { EntityType } from "../src/definitions/EntityType";
import { DefinitionMap } from "../src/definitions/DefinitionMap";

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
                            },
                            {
                                $: {
                                    Name: 'entityNameTwo',
                                },
                                Property: [
                                    {
                                        $: {
                                            Name: 'propertyName',
                                            Type: 'Edm.String'
                                        },
                                    },
                                ],
                                NavigationProperty: []
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

describe("when required properties are not real", () => {
    
    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;
    let writeSwagger: typeof import('../src/swaggerWritter').writeSwagger;    

    beforeEach(() => {
        jest.resetModules();
        writeSwagger = require('../src/swaggerWritter').writeSwagger;
        constructDataStructure = require('../src/deserializer').constructDataStructure;
    });

    it("should throw an error", () => {
        let definitionMap: DefinitionMap = new DefinitionMap();

        definitionMap = constructDataStructure(csdl, definitionMap)

        expect(() => writeSwagger(definitionMap)).toThrowError("Something went wrong: Entity entityNameOne references non-existent Edm.Test and skipped validator check. Depth: 0")
    })
})

describe("when required properties are real", () => {

    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;
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

        constructDataStructure = require('../src/deserializer').constructDataStructure;
        writeSwagger = require('../src/swaggerWritter').writeSwagger;
    });

    it("should not throw an error", () => {
        let definitionMap: DefinitionMap = new DefinitionMap();

        definitionMap.EntityMap.set('Edm.Test', new EntityType('Test', false, undefined, undefined, undefined, [], []))

        definitionMap = constructDataStructure(csdl, definitionMap)

        expect(() => writeSwagger(definitionMap)).not.toThrowError()

        const swagger: Swagger = writeSwagger(definitionMap)

        const definition: Definition = swagger.definitions['namespace.entityNameOne'] as Definition

        expect(definition.required).toContain('propertyName')

    })
})
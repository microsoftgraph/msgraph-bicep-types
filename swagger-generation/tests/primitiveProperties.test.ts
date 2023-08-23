import { Config, EntityTypeConfig } from "../src/config";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { CSDL } from "../src/definitions/RawTypes";


const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: 'entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespace.entityNameTwo', {
    Name: 'namespace.entityNameTwo',
    RootUri: 'entityNameTwos',
    NavigationProperty: []
})

const mockConfig = class {
    public static get Instance(): Config {
        return {
            EntityTypes: entityTypes,
            URL: 'https://example.com',
            APIVersion: 'beta'
        }
    }
}

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
                                    {
                                        $: {
                                            Name: 'propertyNameTwo',
                                            Type: 'Edm.TimeOfDay'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameThree',
                                            Type: 'Edm.Test'
                                        },
                                    }
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

jest.mock('../src/config', () => {
    return { Config: mockConfig };
})

describe("when csdl contains not mapped types", () =>{

    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;

    beforeEach(() => {
        jest.resetModules();
        constructDataStructure = require('../src/deserializer').constructDataStructure;
    });

    it("should return the correct properties", () => {
        const definitionMap: DefinitionMap = new DefinitionMap();
    
        expect(() => constructDataStructure(csdl, definitionMap)).not.toThrow();
    
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.length).toBe(1)
    
    });
});


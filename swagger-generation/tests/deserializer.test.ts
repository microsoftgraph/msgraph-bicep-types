//import { constructDataStructure } from '../src/deserializer';
import { DefinitionMap } from '../src/definitions/DefinitionMap';
import { Config, EntityTypeConfig } from '../src/config';
import { CSDL } from '../src/definitions/RawTypes';

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
const entityTypesNonNamespaced: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: 'entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespace.entityNameTwo', {
    Name: 'namespace.entityNameTwo',
    RootUri: 'entityNameTwos',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceTwo.entityNameOne', {
    Name: 'namespaceTwo.entityNameOne',
    RootUri: 'entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceThree.entityNameTwo', {
    Name: 'namespaceThree.entityNameTwo',
    RootUri: 'entityNameTwos',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespace.fakeEntity', {
    Name: 'namespace.fakeEntity',
    RootUri: 'fakeEntities',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypesNonNamespaced.set('entityTypeOne', {
    Name: 'entityTypeOne',
    RootUri: 'entityTypeOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypesNonNamespaced.set('entityTypeTwo', {
    Name: 'entityTypeTwo',
    RootUri: 'entityTypeTwos',
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

const mockConfigNonNamespaced = class {
    public static get Instance(): Config {
        return {
            EntityTypes: entityTypesNonNamespaced,
            URL: 'https://example.com',
            APIVersion: 'beta'
        }
    }
}

jest.mock('../src/config', () => {
    return { Config: mockConfig };
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
            {
                $: {
                    Namespace: 'namespaceTwo',
                },
                EntityType: [
                    {
                        $: {
                            Name: 'entityNameOne',
                        },
                        Property: [
                            {
                                $: {
                                    Name: 'propertyNameDiff',
                                    Type: 'Edm.String'
                                },
                            },
                        ],
                        NavigationProperty: []
                    },
                ],
            },
            {
                $: {
                    Namespace: 'namespaceThree',
    
                    },
                    EntityType: [
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
                    ]
            }
            ],
        },
        ],
    },
};
  

describe('constructDataStructure', () => {

    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;

    beforeEach(() => {
        jest.resetModules();
        constructDataStructure = require('../src/deserializer').constructDataStructure;
    });

    it('should construct data structure', () => {
        const definitionMap = new DefinitionMap();
        expect(() => constructDataStructure(csdl, definitionMap)).not.toThrow();
    });

    it('should identify namespaces of scope', () => {
        const definitionMap = new DefinitionMap();
        constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespaceThree.entityNameTwo')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceThree.entityNameOne')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
    });

    it('should differenciate entities with same name in different namespaces', () => {
        const definitionMap = new DefinitionMap();
        constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeUndefined();
    });

    it('should identify properties of entities', () => {
        const definitionMap = new DefinitionMap();
        constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameTwo')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameTwo')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
    });

    it('should have integrity between csdl and definitionMap', () => {
        const definitionMap = new DefinitionMap();
        constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.size).toBe(entityTypes.size - 1);
    });

    it('should not create entities from scope', () => {
        const definitionMap = new DefinitionMap();
        constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.size).toBe(entityTypes.size - 1);
        expect(definitionMap.EntityMap.get('namespace.fakeEntityName')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameTwo')).toBeDefined();
    });
    
    
});

describe('constructDataStructure with non-namespaced entities', () => {
    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;

    beforeEach(() => {
        jest.resetModules();
        jest.mock('../src/config', () => {
            return { Config: mockConfigNonNamespaced };
        });
        constructDataStructure = require('../src/deserializer').constructDataStructure;
    });

    it('should not relate unnamespaced entities', () => {
        const definitionMap = new DefinitionMap();
        expect(() => constructDataStructure(csdl, definitionMap)).toThrowError();
        expect(definitionMap.EntityMap.size).toBe(0);
        expect(definitionMap.EntityMap.get('entityTypeOne')).toBeUndefined();
    });
});
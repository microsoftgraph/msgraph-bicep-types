import { Config, EntityTypeConfig } from '../src/config';
import { CollectionProperty } from '../src/definitions/CollectionProperty';
import { DefinitionMap } from '../src/definitions/DefinitionMap';
import { CSDL } from '../src/definitions/RawTypes';

const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
const entityTypesNonNamespaced: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

entityTypes.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespace.entityNameTwo', {
    Name: 'namespace.entityNameTwo',
    RootUri: '/entityNameTwos',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceTwo.entityNameOne', {
    Name: 'namespaceTwo.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceThree.entityNameTwo', {
    Name: 'namespaceThree.entityNameTwo',
    RootUri: '/entityNameTwos',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceThree.complexTypeName', {
    Name: 'namespaceThree.complexTypeName',
    RootUri: '/complexTypeName',
    NavigationProperty: []
} as EntityTypeConfig);

entityTypes.set('namespaceFour.entityNameOne', {
    Name: 'namespaceFour.entityNameOne',
    RootUri: '/namespaceFour/entityNameOnes',
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
                ],
                ComplexType: [
                    {
                        $: {
                            Name: 'complexTypeName',
                        },
                        Property: [
                            {
                                $: {
                                    Name: 'complexPropertyName',
                                    Type: 'Edm.String'
                                },
                                
                            },
                        ],
                        NavigationProperty: []
                    },
                ],
                EnumType: [
                    {
                        $: {
                            Name: 'enumTypeName',
                        },
                        Member: [
                            {
                                $: {
                                    Name: 'enumMemberName',
                                    Value: 'enumMemberValue'
                                },
                            },

                        ],
                    },
                ],
            },
            {
                $: {
                    Namespace: 'namespaceFour',
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
                                    Type: 'Collection(Edm.String)'
                                },
                            },
                            {
                                $: {
                                    Name: 'propertyName2',
                                    Type: 'Collection(namespaceThree.complexTypeName)'
                                },
                            }
                        ],
                        NavigationProperty: []
                    },
                ],
                
            }
            ],
        },
        ],
    },
};
  

describe('constructDataStructure', () => {

    let constructDataStructure: typeof import('../src/deserializer').constructDataStructure;
    let CollectionPropertyInstance: typeof import('../src/definitions/CollectionProperty').CollectionProperty;
    let PrimitiveSwaggerTypeStructInstance: typeof import('../src/definitions/PrimitiveSwaggerType').PrimitiveSwaggerTypeStruct;

    beforeEach(() => {
        jest.resetModules();
        constructDataStructure = require('../src/deserializer').constructDataStructure;
        CollectionPropertyInstance = require('../src/definitions/CollectionProperty').CollectionProperty;
        PrimitiveSwaggerTypeStructInstance = require('../src/definitions/PrimitiveSwaggerType').PrimitiveSwaggerTypeStruct;
    });

    it('should construct data structure', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        expect(() => definitionMap = constructDataStructure(csdl, definitionMap)).not.toThrow();
    });

    it('should identify namespaces of scope', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespaceThree.entityNameTwo')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceThree.entityNameOne')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
    });

    it('should differenciate entities with same name in different namespaces', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeUndefined();
    });

    it('should identify properties of entities', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameTwo')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityNameTwo')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
    });

    it('should identify complex types', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.get('namespaceThree.complexTypeName')).toBeDefined();
    });

    it('should identify and correctly cassify enum types', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')).toBeDefined();
    });

    it('should identify and correctly wrap collection types', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        const entity = definitionMap.EntityMap.get('namespaceFour.entityNameOne');
        expect(entity).toBeDefined();
        entity!.Property.forEach((property) => {
            expect(property.Type).toBeInstanceOf(CollectionPropertyInstance);
            expect((property.Type as CollectionProperty).Type).toBeDefined();
        });
        expect((entity!.Property[0].Type as CollectionProperty).Type).toBeInstanceOf(PrimitiveSwaggerTypeStructInstance);
        expect((entity!.Property[1].Type as CollectionProperty).Type).toBe("namespaceThree.complexTypeName");

    });

    it('should have integrity between csdl and definitionMap', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.size).toBe(entityTypes.size);
    });

    it('should not create entities from config', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.size).toBe(entityTypes.size);
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
        let definitionMap: DefinitionMap = new DefinitionMap();
        definitionMap = constructDataStructure(csdl, definitionMap);
        expect(definitionMap.EntityMap.size).toBe(6); // constant, update when changing the csdl mock
        expect(definitionMap.EntityMap.get('entityTypeOne')).toBeUndefined();
    });
});
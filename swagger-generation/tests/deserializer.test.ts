import { constructDataStructure } from '../src/deserializer';
import { DefinitionMap } from '../src/definitions/DefinitionMap';

const csdl = {
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
                    Name: 'entityName1',
                    },
                    Property: [
                    {
                        $: {
                        Name: 'propertyName',
                        Type: 'propertyType'
                        },
                    },
                    ],
                    NavigationProperty: []
                },
                {
                    $: {
                    Name: 'entityName2',
                    },
                    Property: [
                    {
                        $: {
                        Name: 'propertyName',
                        Type: 'propertyType'
                        },
                    },
                    ],
                    NavigationProperty: []
                },
                ],
            },
            {
                $: {
                    Namespace: 'namespace2',
                },
                EntityType: [
                    {
                        $: {
                            Name: 'entityName1',
                        },
                        Property: [
                            {
                                $: {
                                    Name: 'propertyNameDiff',
                                    Type: 'propertyType'
                                },
                            },
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
  it('should construct data structure', () => {
    const definitionMap = new DefinitionMap();
    const scope: Set<string> = new Set(['namespace.entityName1','namespace.entityName2','namespace2.entityName1']);
    expect(() => constructDataStructure(csdl, definitionMap, scope)).not.toThrow();
  });
});

describe('constructDataStructure', () => {
    it('should identify namespaces of scope', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['namespace.entityName2','namespace2.entityName1']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.get('namespace.entityName2')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName1')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace2.entityName1')).toBeDefined();
    });
});

describe('constructDataStructure', () => {
    it('should differenciate entities with same name in different namespaces', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['namespace.entityName1','namespace2.entityName1']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.get('namespace.entityName1')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace2.entityName1')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName1')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName1')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace2.entityName1')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace2.entityName1')?.Property.find((property) => property.Name === 'propertyName')).toBeUndefined();
    });
});

describe('constructDataStructure', () => {
    it('should identify properties of entities', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['namespace.entityName1','namespace.entityName2']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.get('namespace.entityName1')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName2')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName1')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName2')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
    });
});

describe('constructDataStructure', () => {
    it('should have integrity between csdl and definitionMap', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['namespace.entityName1','namespace.entityName2','namespace2.entityName1']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.size).toBe(scope.size);
    });
});

describe('constructDataStructure', () => {
    it('should not create entities from scope', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['namespace.entityName1','namespace.entityName2','namespace.fakeEntityName']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.size).toBe(scope.size - 1);
        expect(definitionMap.EntityMap.get('namespace.fakeEntityName')).toBeUndefined();
        expect(definitionMap.EntityMap.get('namespace.entityName1')).toBeDefined();
        expect(definitionMap.EntityMap.get('namespace.entityName2')).toBeDefined();
    });
});

describe('constructDataStructure', () => {
    it('should not relate unnamespaced entities', () => {
        const definitionMap = new DefinitionMap();
        const scope: Set<string> = new Set(['entityName1','entityName2']);
        constructDataStructure(csdl, definitionMap, scope);
        expect(definitionMap.EntityMap.size).toBe(0);
    });
});
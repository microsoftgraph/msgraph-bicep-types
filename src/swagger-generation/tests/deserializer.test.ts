import { Config, EntityTypeConfig, NavigationPropertyMode } from '../src/config';
import { CollectionProperty } from '../src/definitions/CollectionProperty';
import { DefinitionMap } from '../src/definitions/DefinitionMap';
import { PrimitiveSwaggerTypeStruct } from '../src/definitions/PrimitiveSwaggerType';
import { CSDL } from '../src/definitions/RawTypes';
import { constructDataStructure } from '../src/deserializer';
import { constructAlternateKeyRecord } from './testUtilities';

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
                    Annotation: [
                      {
                        $: {
                          Term: 'Org.OData.Core.V1.Description',
                          String: 'Description of propertyName. Optional. Returned by default. Support $filter.',
                        },
                      },
                    ]
                  },
                  {
                    $: {
                      Name: 'propertyNameTwo',
                      Type: 'Edm.String'
                    },
                  },
                ],
                NavigationProperty: [],
                Annotation: [
                  {
                    $: {
                      Term: 'Org.OData.Core.V1.AlternateKeys',
                    },
                    Collection: [
                      {
                        Record: [
                          constructAlternateKeyRecord('propertyNameTwo', 'Org.OData.Core.V1'),
                          constructAlternateKeyRecord('uniqueName', 'Org.OData.Core.V1'),
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $: {
                  Name: 'entityNameTwo',
                  BaseType: 'graph.directoryObject'
                },
                Property: [
                  {
                    $: {
                      Name: 'propertyName',
                      Type: 'Edm.String'
                    },
                  },
                ],
                NavigationProperty: [],
                Annotation: [
                  {
                    $: {
                      Term: 'Org.OData.Core.V1.AlternateKeys',
                    },
                    Collection: [
                      {
                        Record: [
                          constructAlternateKeyRecord('propertyNameTwo', 'Org.OData.Core.V1'),
                        ],
                      },
                    ],
                  },
                ],
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
                NavigationProperty: [],
                Annotation: [
                  {
                    $: {
                      Term: 'OData.Community.Keys.V1.AlternateKeys',
                    },
                    Collection: [
                      {
                        Record: [
                          constructAlternateKeyRecord('propertyNameDiff', 'OData.Community.Keys.V1'),
                        ],
                      },
                    ],
                  },
                ],
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
                NavigationProperty: [
                  {
                    $: {
                      Name: 'navigationPropertyName',
                      Type: 'Collection(namespaceTwo.entityNameOne)'
                    },
                  },
                  {
                    $: {
                      Name: 'navigationPropertyName2',
                      Type: 'namespaceTwo.complexTypeName'
                    },
                  },
                  {
                    $: {
                      Name: 'navigationPropertyName3',
                      Type: 'namespaceThree.enumTypeName'
                    },
                  }
                ],
                Annotation: []
              },
            ],
            ComplexType: [
              {
                $: {
                  Name: 'complexTypeName',
                  BaseType: 'graph.writebackConfiguration'
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
                  {
                    $: {
                      Name: 'enumMemberName2',
                      Value: 'enumMemberValue2'
                    },
                  },
                  {
                    $: {
                      Name: 'unknownFutureValue',
                      Value: 'unknownFutureValue'
                    },
                  },
                  {
                    $: {
                      Name: 'UnsupportedFutureValue',
                      Value: 'UnsupportedFutureValue'
                    },
                  }
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

const getMockConfig = (entityTypes: Map<string, EntityTypeConfig>): Config => {
  return {
    EntityTypes: entityTypes,
    URL: 'https://example.com',
    APIVersion: 'beta'
  } as Config;
}

describe('constructDataStructure', () => {
  const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

  entityTypes.set('namespace.entityNameOne', {
    Name: 'namespace.entityNameOne',
    RootUri: '/entityNameOnes',
    NavigationProperty: [],
    ReadOnly: ['propertyName']
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
    NavigationProperty: [],
    ReadOnly: ['propertyName2']
  } as EntityTypeConfig);

  const config = getMockConfig(entityTypes);

  it('should construct data structure', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    expect(() => definitionMap = constructDataStructure(csdl, definitionMap, config)).not.toThrow();
  });

  it('should identify namespaces of scope', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.get('namespaceThree.entityNameTwo')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespaceThree.entityNameOne')).toBeUndefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
  });

  it('should differenciate entities with same name in different namespaces', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeUndefined();
    expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameDiff')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeUndefined();
  });

  it('should identify properties of entities', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')?.Property.find((property) => property.Name === 'propertyName')).toBeDefined();
  });

  it('should identify complex types', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.get('namespaceThree.complexTypeName')).toBeDefined();
  });

  it('should identify and correctly cassify enum types', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')).toBeDefined();
  });

  it('should identify and correctly wrap collection types', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceFour.entityNameOne');
    expect(entity).toBeDefined();
    entity!.Property.forEach((property) => {
      expect(property.Type).toBeInstanceOf(CollectionProperty);
      expect((property.Type as CollectionProperty).Type).toBeDefined();
    });
    expect((entity!.Property[0].Type as CollectionProperty).Type).toBeInstanceOf(PrimitiveSwaggerTypeStruct);
    expect((entity!.Property[1].Type as CollectionProperty).Type).toBe("namespaceThree.complexTypeName");

  });

  it('should have integrity between csdl and definitionMap', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.size).toBe(entityTypes.size);
  });

  it('should not create entities from config', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.size).toBe(entityTypes.size);
    expect(definitionMap.EntityMap.get('namespace.fakeEntityName')).toBeUndefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')).toBeDefined();
  });

  it('should filter enums with sentinel values', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EnumMap.size).toBe(1);
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')).toBeDefined();
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')!.Member.size).toBe(2);
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')!.Member.get('enumMemberName')).toBeDefined();
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')!.Member.get('enumMemberName2')).toBeDefined();
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')!.Member.get('unknownFutureValue')).toBeUndefined();
    expect(definitionMap.EnumMap.get('namespaceThree.enumTypeName')!.Member.get('UnsupportedFutureValue')).toBeUndefined();
  });

  it('should deserialize readonly properties', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')!.Property[0]).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')!.Property[0].Name).toBe("propertyName");
    expect(definitionMap.EntityMap.get('namespace.entityNameOne')!.Property[0].ReadOnly).toBeTruthy();
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')!.Property[0]).toBeDefined();
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')!.Property[0].ReadOnly).toBeFalsy();
    expect(definitionMap.EntityMap.get('namespaceFour.entityNameOne')!.Property[1]).toBeDefined();
    expect(definitionMap.EntityMap.get('namespaceFour.entityNameOne')!.Property[1].Name).toBe("propertyName2");
    expect(definitionMap.EntityMap.get('namespaceFour.entityNameOne')!.Property[1].ReadOnly).toBeTruthy();
  });

  it('should deserialize alternate keys', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);

    const propertyWithDescription = definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyName');
    const propertyWithNoDescription = definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.find((property) => property.Name === 'propertyNameTwo');

    expect(propertyWithDescription).toBeDefined();
    expect(propertyWithNoDescription).toBeDefined();
    expect(propertyWithDescription?.Description).toBe('Description of propertyName. Optional');
    expect(propertyWithNoDescription?.Description).toBe('')
  });

  it('should deserialize property descriptions', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);

    expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.AlternateKey).toEqual('uniqueName');
    expect(definitionMap.EntityMap.get('namespace.entityNameTwo')?.AlternateKey).toEqual('propertyNameTwo');
    expect(definitionMap.EntityMap.get('namespaceTwo.entityNameOne')?.AlternateKey).toEqual('propertyNameDiff');
    expect(definitionMap.EntityMap.get('namespaceThree.entityNameTwo')?.AlternateKey).toBeUndefined();
    expect(definitionMap.EntityMap.get('namespaceFour.entityNameOne')?.AlternateKey).toBeUndefined();
  });
});

describe('constructDataStructure with non-namespaced entities', () => {
  const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

  entityTypes.set('entityTypeOne', {
    Name: 'entityTypeOne',
    RootUri: 'entityTypeOnes',
    NavigationProperty: []
  } as EntityTypeConfig);

  entityTypes.set('entityTypeTwo', {
    Name: 'entityTypeTwo',
    RootUri: 'entityTypeTwos',
    NavigationProperty: []
  } as EntityTypeConfig);

  const config = getMockConfig(entityTypes);

  it('should not relate unnamespaced entities', () => {
    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    expect(definitionMap.EntityMap.size).toBe(6); // constant, update when changing the csdl mock
    expect(definitionMap.EntityMap.get('entityTypeOne')).toBeUndefined();
  });
});

describe('navigation properties modes', () => {
  it('should allow navigation properties', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationPropertyMode: NavigationPropertyMode.Allow,
      NavigationProperty: ['navigationPropertyName', 'navigationPropertyName2', 'navigationPropertyName3']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(3);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeDefined();
  });

  it('should only allow some navigation properties', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationPropertyMode: NavigationPropertyMode.Allow,
      NavigationProperty: ['navigationPropertyName', 'navigationPropertyName2']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(2);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeUndefined();
  });

  it('should ignore navigation properties', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationPropertyMode: NavigationPropertyMode.Ignore,
      NavigationProperty: ['navigationPropertyName', 'navigationPropertyName2', 'navigationPropertyName3']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(0);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeUndefined();
  });

  it('should ignore some navigation properties', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationPropertyMode: NavigationPropertyMode.Ignore,
      NavigationProperty: ['navigationPropertyName', 'navigationPropertyName2']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(1);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeDefined();
  });

  it('should ignore all navigation properties by default', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(0);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeUndefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeUndefined();
  });

  it('should allow some navigation properties by default', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationProperty: ['navigationPropertyName', 'navigationPropertyName2']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.NavigationProperty.length).toBe(2);
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName2')).toBeDefined();
    expect(entity!.NavigationProperty.find((navProp) => navProp.Name === 'navigationPropertyName3')).toBeUndefined();
  });
});

describe('available property', () => {
  it('should include all properties if empty available property', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameOne', {
      Name: 'namespace.entityNameOne',
      RootUri: '/entityName',
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespace.entityNameOne');
    expect(entity).toBeDefined();
    expect(entity!.Property.length).toBe(2);
    expect(entity!.Property.find((prop) => prop.Name === 'propertyName')).toBeDefined();
    expect(entity!.Property.find((prop) => prop.Name === 'propertyNameTwo')).toBeDefined();
  });

  it('should include available properties only', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameOne', {
      Name: 'namespace.entityNameOne',
      RootUri: '/entityName',
      AvailableProperty: ['propertyName']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespace.entityNameOne');
    expect(entity).toBeDefined();
    expect(entity!.Property.length).toBe(1);
    expect(entity!.Property.find((prop) => prop.Name === 'propertyName')).toBeDefined();
    expect(entity!.Property.find((prop) => prop.Name === 'propertyNameTwo')).toBeUndefined();
  });

  it('should include no properties if not matching available property', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameOne', {
      Name: 'namespace.entityNameOne',
      RootUri: '/entityName',
      AvailableProperty: ['myPropertyName']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);
    const entity = definitionMap.EntityMap.get('namespace.entityNameOne');
    expect(entity).toBeDefined();
    expect(entity!.Property.length).toBe(0);
  });
});

describe('base type', () => {
  it('should include properties from known base type', () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameTwo', {
      Name: 'namespace.entityNameTwo',
      RootUri: '/entityName',
    } as EntityTypeConfig);

    entityTypes.set('namespaceThree.entityNameTwo', {
      Name: 'namespaceThree.entityNameTwo',
      RootUri: '/entityNameTwos',
      NavigationPropertyMode: NavigationPropertyMode.Allow,
      NavigationProperty: ['navigationPropertyName2']
    } as EntityTypeConfig);

    const config = getMockConfig(entityTypes);

    let definitionMap: DefinitionMap = new DefinitionMap();
    definitionMap = constructDataStructure(csdl, definitionMap, config);

    const entity = definitionMap.EntityMap.get('namespace.entityNameTwo');
    expect(entity).toBeDefined();
    expect(entity!.Property.find((prop) => prop.Name === 'deletedDateTime')).toBeDefined();

    const entityTwo = definitionMap.EntityMap.get('namespaceThree.entityNameTwo');
    expect(entityTwo).toBeDefined();
    expect(entityTwo!.NavigationProperty
      .find((navProp) => navProp.Name === 'navigationPropertyName2')?.Name === 'isEnabled')
      .toBeDefined();
  });
});

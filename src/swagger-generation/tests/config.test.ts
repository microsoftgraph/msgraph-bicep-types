import { Config, EntityTypeConfig, NavigationPropertyMode } from '../src/config';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('Config', () => {
  it('should read config file and set EntityTypes and MetadataFilePath', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          RootUri: /entityTypeOnes
          Upsertable: true
          AvailableProperty:
            - propOne
            - propTwo
            - propThree
            - propFour
          NavigationPropertyMode: Allow
          NavigationProperty:
            - navOne
            - navTwo
          RequiredOnWrite:
            - propOne
            - propTwo
          ReadOnly:
            - propThree
            - propFour
        - Name: microsoft.graph.EntityTypeTwo
          RootUri: /entityTypeTwos
          NavigationProperty: []
        - Name: microsoft.graph.EntityTypeThree
          RootUri: /entityTypeThrees
          Upsertable: false
          Updatable: true
          ContainerEntitySet: containerEntitySet
          ContainerKeyProperty: containerKeyProperty
          FilterProperty: [filter1, filter2]
          CompositeKey: [key1, key2]
        - Name: microsoft.graph.ReadonlyEntityType
          RootUri: /readonlyTypes
          IsReadonlyResource: true

      MetadataFilePath: https://example.com
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config('beta', 'test-version');

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne',
      RootUri: '/entityTypeOnes',
      Upsertable: true,
      AvailableProperty: ['propOne', 'propTwo', 'propThree', 'propFour'],
      NavigationPropertyMode: NavigationPropertyMode.Allow,
      NavigationProperty: ['navOne', 'navTwo'],
      RequiredOnWrite: ['propOne', 'propTwo'],
      ReadOnly: ['propThree', 'propFour']
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
      Name: 'microsoft.graph.EntityTypeTwo',
      RootUri: '/entityTypeTwos',
      NavigationProperty: []
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeThree', {
      Name: 'microsoft.graph.EntityTypeThree',
      RootUri: '/entityTypeThrees',
      Upsertable: false,
      Updatable: true,
      ContainerEntitySet: 'containerEntitySet',
      ContainerKeyProperty: 'containerKeyProperty',
      FilterProperty: ['filter1', 'filter2'],
      CompositeKey: ['key1', 'key2']
    } as EntityTypeConfig);

    map.set('microsoft.graph.ReadonlyEntityType', {
      Name: 'microsoft.graph.ReadonlyEntityType',
      RootUri: '/readonlyTypes',
      IsReadonlyResource: true
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.MetadataFilePath).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');
    expect(config.ExtensionVersion).toEqual('test-version');

    expect(readFileSync).toBeCalledWith('./configs/beta/test-version.yml', 'utf8');
  });

  it('should read a config file with entities that have no details', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
        - Name: microsoft.graph.EntityTypeTwo

      MetadataFilePath: https://example.com
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config('beta', 'test-version');

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne'
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
      Name: 'microsoft.graph.EntityTypeTwo'
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.MetadataFilePath).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./configs/beta/test-version.yml', 'utf8');
  });

  it('should not read a config file with no entities', () => {
    const mockConfigFile = `
      MetadataFilePath: https://example.com
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    expect(() => new Config('beta', 'test-version')).toThrowError();

    expect(readFileSync).toBeCalledWith('./configs/beta/test-version.yml', 'utf8');
  });

  it('should read a config file with entities and Ignore mode', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          NavigationPropertyMode: Ignore
        - Name: microsoft.graph.EntityTypeTwo

      MetadataFilePath: https://example.com
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config('beta', 'test-version');

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne',
      NavigationPropertyMode: NavigationPropertyMode.Ignore
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
      Name: 'microsoft.graph.EntityTypeTwo'
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.MetadataFilePath).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./configs/beta/test-version.yml', 'utf8');
  });

  it('should not read a config file with entities and a wrong mode', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          NavigationPropertyMode: Wrong
        - Name: microsoft.graph.EntityTypeTwo

      MetadataFilePath: https://example.com
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    expect(() => new Config('beta', 'test-version')).toThrowError("Invalid NavigationPropertyMode Wrong for microsoft.graph.EntityTypeOne. Only Allow and Ignore are valid values.");

    expect(readFileSync).toBeCalledWith('./configs/beta/test-version.yml', 'utf8');
  });
});

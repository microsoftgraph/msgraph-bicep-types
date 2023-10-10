import { Config, EntityTypeConfig, NavigationPropertyMode } from '../src/config';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('Config', () => {
  it('should read config file and set EntityTypes and URL', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          RootUri: /entityTypeOnes
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

      URL: https://example.com
      apiVersion: beta
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config();

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne',
      RootUri: '/entityTypeOnes',
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

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./config.yml', 'utf8');
  });

  it('should read a config file with entities that have no details', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
        - Name: microsoft.graph.EntityTypeTwo

      URL: https://example.com
      apiVersion: beta
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config();

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne'
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
      Name: 'microsoft.graph.EntityTypeTwo'
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./config.yml', 'utf8');
  });

  it('should not read a config file with no entities', () => {
    const mockConfigFile = `
      URL: https://example.com
      apiVersion: beta
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    expect(() => new Config()).toThrowError();

    expect(readFileSync).toBeCalledWith('./config.yml', 'utf8');
  });

  it('should read a config file with entities and Ignore mode', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          NavigationPropertyMode: Ignore
        - Name: microsoft.graph.EntityTypeTwo

      URL: https://example.com
      apiVersion: beta
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = new Config();

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
      Name: 'microsoft.graph.EntityTypeOne',
      NavigationPropertyMode: NavigationPropertyMode.Ignore
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
      Name: 'microsoft.graph.EntityTypeTwo'
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./config.yml', 'utf8');
  });

  it('should not read a config file with entities and a wrong mode', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          NavigationPropertyMode: Wrong
        - Name: microsoft.graph.EntityTypeTwo

      URL: https://example.com
      apiVersion: beta
    `;

    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    expect(() => new Config()).toThrowError("Invalid NavigationPropertyMode Wrong for microsoft.graph.EntityTypeOne. Only Allow and Ignore are valid values.");

    expect(readFileSync).toBeCalledWith('./config.yml', 'utf8');
  });
});
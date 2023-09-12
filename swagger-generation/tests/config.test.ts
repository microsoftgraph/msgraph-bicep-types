import { Config, EntityTypeConfig } from '../src/config';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('Config', () => {
  it('should read config file and set EntityTypes and URL', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          RootUri: /entityTypeOnes
          NavigationProperty:
            - navOne
            - navTwo
          RequiredOnWrite:
            - propOne
            - propTwo
        - Name: microsoft.graph.EntityTypeTwo
          RootUri: /entityTypeTwos
          NavigationProperty: []

      URL: https://example.com
      apiVersion: beta
    `;
    
    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = Config.Instance;

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
        Name: 'microsoft.graph.EntityTypeOne',
        RootUri: '/entityTypeOnes',
        NavigationProperty: ['navOne', 'navTwo'],
        RequiredOnWrite: ['propOne', 'propTwo']
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
        Name: 'microsoft.graph.EntityTypeTwo',
        RootUri: '/entityTypeTwos',
        NavigationProperty: []
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
    expect(config.APIVersion).toEqual('beta');

    expect(readFileSync).toBeCalledWith('./config.yaml', 'utf8');
  });
});
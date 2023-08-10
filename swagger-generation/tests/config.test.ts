import { Config, EntityTypeConfig } from '../src/config';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('Config', () => {
  it('should read config file and set EntityTypes and URL', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: microsoft.graph.EntityTypeOne
          RootUri: entityTypeOnes
          NavigationProperty:
            - navOne
            - navTwo
        - Name: microsoft.graph.EntityTypeTwo
      URL: https://example.com
    `;
    
    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = Config.Instance;

    const map = new Map<string, EntityTypeConfig>();
    map.set('microsoft.graph.EntityTypeOne', {
        Name: 'microsoft.graph.EntityTypeOne',
        RootUri: 'entityTypeOnes',
        NavigationProperty: ['navOne', 'navTwo']
    } as EntityTypeConfig);

    map.set('microsoft.graph.EntityTypeTwo', {
        Name: 'microsoft.graph.EntityTypeTwo',
    } as EntityTypeConfig);

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
  });
});
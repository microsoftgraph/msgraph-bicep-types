import { Config } from '../src/config';
import { EntityType } from '../src/definitions/EntityType';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('Config', () => {
  it('should read config file and set EntityTypes and URL', () => {
    const mockConfigFile = `
      EntityTypes:
        - Name: EntityType1
        - Name: EntityType2
      URL: https://example.com
    `;
    
    (readFileSync as jest.Mock).mockReturnValue(mockConfigFile);

    const config = Config.Instance;

    const map = new Map<string, EntityType>();
    map.set('microsoft.graph.EntityType1', {
        Name: 'EntityType1',
        
    } as EntityType);

    map.set('microsoft.graph.EntityType2', {
        Name: 'EntityType2',
    } as EntityType);

    expect(config.EntityTypes).toEqual(map);
    expect(config.URL).toEqual('https://example.com');
  });
});
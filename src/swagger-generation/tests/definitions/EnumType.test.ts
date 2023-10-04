import { EnumType } from "../../src/definitions/EnumType";

describe('EnumType', () => {
  it('should create an instance with the correct properties', () => {
    const name = 'TestEnumType';
    const member = new Map<string, string>([
      ['Member1', 'Value1'],
      ['Member2', 'Value2'],
    ]);

    const enumType = new EnumType(name, member);

    expect(enumType.Name).toBe(name);
    expect(enumType.Member).toEqual(member);
  });

  it('should convert to a Swagger definition', () => {
    const name = 'TestEnumType';
    const member = new Map<string, string>([
      ['Member1', 'Value1'],
      ['Member2', 'Value2'],
    ]);
    const enumType = new EnumType(name, member);

    const definition = enumType.toSwaggerDefinition();

    expect(definition.type).toBe('string');
    expect(definition.enum).toEqual(['Member1', 'Member2']);
  });
});
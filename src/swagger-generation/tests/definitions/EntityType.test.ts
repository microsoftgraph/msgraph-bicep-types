import { CollectionProperty } from "../../src/definitions/CollectionProperty";
import { EntityType } from "../../src/definitions/EntityType";
import { NavigationProperty } from "../../src/definitions/NavigationProperty";
import { PrimitiveSwaggerType } from "../../src/definitions/PrimitiveSwaggerType";
import { Property } from "../../src/definitions/Property";

describe('EntityType', () => {
  it('should create an instance with the correct properties', () => {
    const name = 'TestEntityType';
    const alternateKey = 'alternateKey';
    const abstract = true;
    const baseType = 'BaseEntityType';
    const openType = false;
    const hasStream = true;
    const properties = [
      new Property('Property1', new CollectionProperty('Edm.String'), true, false),
      new Property('Property2', 'Edm.Int32', true, false),
    ];
    const navigationProperties = [
      new NavigationProperty('NavigationProperty1', 'namespace.one.EntityType1', true, false, false),
      new NavigationProperty('NavigationProperty2', 'namespace.one.EntityType2', true, false, false),
    ];

    const entityType = new EntityType(name, alternateKey, abstract, baseType, openType, hasStream, properties, navigationProperties);

    expect(entityType.Name).toBe(name);
    expect(entityType.AlternateKey).toBe(alternateKey);
    expect(entityType.Abstract).toBe(abstract);
    expect(entityType.BaseType).toBe(baseType);
    expect(entityType.OpenType).toBe(openType);
    expect(entityType.HasStream).toBe(hasStream);
    expect(entityType.Property).toEqual(properties);
    expect(entityType.NavigationProperty).toEqual(navigationProperties);
  });

  it('should convert primitive types to a Swagger definition', () => {
    const name = 'TestEntityType';

    const properties = [
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.Double, true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition();

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.items!.type).toBe('string');
    expect(definition.properties.Property2.type).toBe('number');
  });

  it('should convert to swagger collection references to complex types', () => {
    const name = 'TestEntityType';

    const properties = [
      new Property('Property1', new CollectionProperty('namespace.one.EntityType1'), true, false),
      new Property('Property2', new CollectionProperty('namespace.one.EntityType2'), true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition();

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.items!.$ref).toBe('#/definitions/namespace.one.EntityType1');
    expect(definition.properties.Property2.type).toBe('array');
    expect(definition.properties.Property2.items).toBeDefined();
    expect(definition.properties.Property2.items!.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should convert to swagger references to complex types', () => {
    const name = 'TestEntityType';

    const properties = [
      new Property('Property1', 'namespace.one.EntityType1', true, false),
      new Property('Property2', 'namespace.one.EntityType2', true, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition();

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1).toBeDefined();
    expect(definition.properties.Property1.$ref).toBe('#/definitions/namespace.one.EntityType1');
    expect(definition.properties.Property2).toBeDefined();
    expect(definition.properties.Property2.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should convert to swagger definition with required values', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.String, true, false),
      new Property('Property3', 'namespace.one.EntityType1', false, false),
      new Property('Property4', new CollectionProperty('namespace.one.EntityType2'), false, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition(['Property1', 'Property2', 'Property4']);

    expect(definition.type).toBe('object');
    expect(definition.required).toContain('Property1');
    expect(definition.required).toContain('Property2');
    expect(definition.required).toContain('Property4');
    expect(definition.required).not.toContain('Property3');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.items!.type).toBe('string');
    expect(definition.properties.Property2.type).toBe('string');
    expect(definition.properties.Property4.type).toBe('array');
    expect(definition.properties.Property4.items).toBeDefined();
    expect(definition.properties.Property4.items!.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should throw error if a required property is not found', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.String, true, false),
      new Property('Property3', 'namespace.one.EntityType1', false, false),
      new Property('Property4', new CollectionProperty('namespace.one.EntityType2'), false, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    expect(() => {
      entityType.toSwaggerDefinition(['Property1', 'Property2', 'Property5']);
    }).toThrowError('Required property Property5 not found in TestEntityType');
  });

  it('should throw an error if a required property is missing', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty('Edm.String'), true, false),
      new Property('Property2', 'Edm.Int32', true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    expect(() => {
      entityType.toSwaggerDefinition(['Property1', 'MissingProperty']);
    }).toThrowError('Required property MissingProperty not found in TestEntityType');
  });
});

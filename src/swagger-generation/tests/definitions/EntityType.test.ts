import { CollectionProperty } from "../../src/definitions/CollectionProperty";
import { AllOfDefinition, Definition, Schema } from "../../src/definitions/Swagger";
import { EntityType } from "../../src/definitions/EntityType";
import { NavigationProperty } from "../../src/definitions/NavigationProperty";
import { PrimitiveSwaggerType } from "../../src/definitions/PrimitiveSwaggerType";
import { Property } from "../../src/definitions/Property";
import { EntityTypeConfig } from "../../src/config";

describe('EntityType', () => {
  const property1Description = 'Property1 description';

  it('should create an instance with the correct properties', () => {
    const name = 'TestEntityType';
    const alternateKey = 'alternateKey';
    const abstract = true;
    const baseType = 'BaseEntityType';
    const openType = false;
    const hasStream = true;
    const properties = [
      new Property('Property1', new CollectionProperty('Edm.String'), property1Description, true, false),
      new Property('Property2', 'Edm.Int32', '', true, false),
    ];
    const navigationProperties = [
      new NavigationProperty('NavigationProperty1', 'namespace.one.EntityType1', '', true, false, false, 'directoryObject'),
      new NavigationProperty('NavigationProperty2', 'namespace.one.EntityType2', '', true, false, false, 'targets'),
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
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), property1Description, true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.Double, '', true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition() as Definition;

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.description).toBe(property1Description);
    expect(definition.properties.Property1.items!.type).toBe('string');
    expect(definition.properties.Property2.type).toBe('number');
  });

  it('should convert to swagger collection references to complex types', () => {
    const name = 'TestEntityType';

    const properties = [
      new Property('Property1', new CollectionProperty('namespace.one.EntityType1'), property1Description, true, false),
      new Property('Property2', new CollectionProperty('namespace.one.EntityType2'), '', true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition() as Definition;

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.items!.$ref).toBe('#/definitions/namespace.one.EntityType1');
    expect(definition.properties.Property1.description).toBe(property1Description);
    expect(definition.properties.Property2.type).toBe('array');
    expect(definition.properties.Property2.items).toBeDefined();
    expect(definition.properties.Property2.items!.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should convert to swagger references to complex types', () => {
    const name = 'TestEntityType';

    const properties = [
      new Property('Property1', 'namespace.one.EntityType1', property1Description, true, false),
      new Property('Property2', 'namespace.one.EntityType2', '', true, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition() as Definition;

    expect(definition.type).toBe('object');
    expect(definition.properties.Property1).toBeDefined();
    expect(definition.properties.Property1.$ref).toBe('#/definitions/namespace.one.EntityType1');
    expect(definition.properties.Property1.description).toBe(property1Description);
    expect(definition.properties.Property2).toBeDefined();
    expect(definition.properties.Property2.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should convert to swagger definition with required values', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), property1Description, true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.String, '', true, false),
      new Property('Property3', 'namespace.one.EntityType1', '', false, false),
      new Property('Property4', new CollectionProperty('namespace.one.EntityType2'), '', false, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);
    const entityTypeConfig: EntityTypeConfig = {
      Name: name,
      RequiredOnWrite: ['Property1', 'Property2', 'Property4']
    };
    const definition = entityType.toSwaggerDefinition(entityTypeConfig) as Definition;

    expect(definition.type).toBe('object');
    expect(definition.required).toContain('Property1');
    expect(definition.required).toContain('Property2');
    expect(definition.required).toContain('Property4');
    expect(definition.required).not.toContain('Property3');
    expect(definition.properties.Property1.type).toBe('array');
    expect(definition.properties.Property1.items).toBeDefined();
    expect(definition.properties.Property1.items!.type).toBe('string');
    expect(definition.properties.Property1.description).toBe(property1Description);
    expect(definition.properties.Property2.type).toBe('string');
    expect(definition.properties.Property4.type).toBe('array');
    expect(definition.properties.Property4.items).toBeDefined();
    expect(definition.properties.Property4.items!.$ref).toBe('#/definitions/namespace.one.EntityType2');
  });

  it('should convert to swagger definition with base type', () => {
    const properties = [
      new Property('Property1', PrimitiveSwaggerType.Instance.String, property1Description, true, false)
    ];
    const entityType = new EntityType('TestEntityType', undefined, undefined, 'BaseEntityType', undefined, undefined, properties, []);

    const definition = entityType.toSwaggerDefinition() as AllOfDefinition;
    const allOf = definition.allOf;

    expect(allOf).toBeDefined();
    expect(allOf.length).toBe(2);
    expect((allOf[0] as Schema).$ref).toBe('#/definitions/BaseEntityType');
    expect((allOf[1] as Definition).properties.Property1).toBeDefined();
    expect((allOf[1] as Definition).properties.Property1.type).toBe('string');
    expect((allOf[1] as Definition).properties.Property1.description).toBe(property1Description);
  });

  it('should throw error if a required property is not found', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty(PrimitiveSwaggerType.Instance.String), property1Description, true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.String, '', true, false),
      new Property('Property3', 'namespace.one.EntityType1', '', false, false),
      new Property('Property4', new CollectionProperty('namespace.one.EntityType2'), '', false, false),
    ];

    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);
    const entityTypeConfig: EntityTypeConfig = {
      Name: name,
      RequiredOnWrite: ['Property1', 'Property2', 'Property5']
    };

    expect(() => {
      entityType.toSwaggerDefinition(entityTypeConfig);
    }).toThrowError('Required property Property5 not found in TestEntityType');
  });

  it('should throw an error if a required property is missing', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', new CollectionProperty('Edm.String'), property1Description, true, false),
      new Property('Property2', 'Edm.Int32', '', true, false),
    ];
    const entityType = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);
    const entityTypeConfig: EntityTypeConfig = {
      Name: name,
      RequiredOnWrite: ['Property1', 'MissingProperty']
    };

    expect(() => {
      entityType.toSwaggerDefinition(entityTypeConfig);
    }).toThrowError('Required property MissingProperty not found in TestEntityType');
  });

  it('should correctly convert to swagger definition for resource and key', () => {
    const name = 'TestEntityType';
    const properties = [
      new Property('Property1', PrimitiveSwaggerType.Instance.String, property1Description, true, false),
      new Property('Property2', PrimitiveSwaggerType.Instance.String, '', true, false),
    ];
    const entityTypeConfigRootUri: EntityTypeConfig = {
      Name: name,
      RootUri: '/entities',
      RequiredOnWrite: ['Property1', 'Property2']
    };
    const entityTypeConfigNoRootUri: EntityTypeConfig = {
      Name: name,
      RequiredOnWrite: ['Property1', 'Property2']
    };

    const entityTypeUndefinedAlternateKey = new EntityType(name, undefined, undefined, undefined, undefined, undefined, properties, []);
    const definitionUndefinedAlternateKey = entityTypeUndefinedAlternateKey.toSwaggerDefinition(entityTypeConfigRootUri) as Definition;

    expect(definitionUndefinedAlternateKey.properties.Property1["x-constant-key"]).toBeUndefined();
    expect(definitionUndefinedAlternateKey.properties.Property2["x-constant-key"]).toBeUndefined();

    const entityTypeAlternateKey = new EntityType(name, 'Property1', undefined, undefined, undefined, undefined, properties, []);
    const definitionAlternateKey = entityTypeAlternateKey.toSwaggerDefinition(entityTypeConfigRootUri) as Definition;

    expect(definitionAlternateKey["x-ms-graph-resource"]).toBe(true);
    expect(definitionAlternateKey.properties.Property1["x-ms-graph-key"]).toBe(true);
    expect(definitionAlternateKey.properties.Property1["x-constant-key"]).toBe(true);
    expect(definitionAlternateKey.properties.Property1.description).toBe(property1Description);
    expect(definitionAlternateKey.properties.Property2["x-ms-graph-key"]).toBeUndefined();
    expect(definitionAlternateKey.properties.Property2["x-constant-key"]).toBeUndefined();

    const entityTypeSP = new EntityType('serviceprincipal', 'Property1', undefined, undefined, undefined, undefined, properties, []);
    const definitionSP = entityTypeSP.toSwaggerDefinition(entityTypeConfigNoRootUri) as Definition;

    expect(definitionSP["x-ms-graph-resource"]).not.toBe(true);
    expect(definitionSP.properties.Property1["x-constant-key"]).toBeUndefined();
    expect(definitionSP.properties.Property2["x-constant-key"]).toBeUndefined();
  });
});

import { CollectionProperty } from "../../src/definitions/CollectionProperty";
import { PrimitiveSwaggerType, PrimitiveSwaggerTypeStruct } from "../../src/definitions/PrimitiveSwaggerType";
import { Property } from "../../src/definitions/Property";


describe('Property', () => {
  it('should construct a Property with a primitive Swagger type', () => {
    const propertyName = 'TestProperty';
    const propertyType = PrimitiveSwaggerType.Instance.Byte;

    const property = new Property(propertyName, propertyType, true, false);

    expect(property.Name).toBe(propertyName);
    expect(property.Type).toBeInstanceOf(PrimitiveSwaggerTypeStruct);
    expect(property.Type).toBe(propertyType);
  });

  it('should construct a Property with a primitive collection Swagger type', () => {
    const propertyName = 'TestProperty';
    const propertyType = new CollectionProperty(PrimitiveSwaggerType.Instance.Date);

    const property = new Property(propertyName, propertyType, true, false);

    expect(property.Name).toBe(propertyName);
    expect(property.Type).toBeInstanceOf(CollectionProperty);
    expect((property.Type as CollectionProperty).Type).toBeInstanceOf(PrimitiveSwaggerTypeStruct);
    expect((property.Type as CollectionProperty).Type).toBe(PrimitiveSwaggerType.Instance.Date);
  });

  it('should construct a Property with a reference Swagger type', () => {
    const propertyName = 'TestProperty';
    const propertyType = 'namespace.one.EntityType1';

    const property = new Property(propertyName, propertyType, true, false);

    expect(property.Name).toBe(propertyName);
    expect(property.Type).toBe(propertyType);
  });

  it('should construct a Property with a reference collection Swagger type', () => {
    const propertyName = 'TestProperty';
    const innerPropertyType = 'namespace.one.EntityType2';
    const propertyType = new CollectionProperty(innerPropertyType);

    const property = new Property(propertyName, propertyType, true, false);

    expect(property.Name).toBe(propertyName);
    expect(property.Type).toBeInstanceOf(CollectionProperty);
    expect((property.Type as CollectionProperty).Type).toBe(innerPropertyType);
  });
});

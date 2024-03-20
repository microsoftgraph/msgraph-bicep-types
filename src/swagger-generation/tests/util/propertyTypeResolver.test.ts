import { CollectionProperty } from "../../src/definitions/CollectionProperty";
import { PrimitiveSwaggerType } from "../../src/definitions/PrimitiveSwaggerType";
import { Property } from "../../src/definitions/Property";
import { resolvePropertyTypeToReference } from "../../src/util/propertyTypeResolver";

describe('resolvePropertyTypeToReference', () => {
    const propertyDescription = 'Property description';

    it('should return undefined for primitive types', () => {
        const property = new Property('TestProperty', PrimitiveSwaggerType.Instance.Byte, propertyDescription, true, false);

        const result = resolvePropertyTypeToReference(property);

        expect(result).toBeUndefined();
    });

    it('should return undefined for primitive collection types', () => {
        const collectionProperty = new CollectionProperty(PrimitiveSwaggerType.Instance.Date);

        const property = new Property('TestProperty', collectionProperty, propertyDescription, true, false);

        const result = resolvePropertyTypeToReference(property);

        expect(result).toBeUndefined();
    });

    it('should return the type for reference types', () => {
        const entityName = 'namespace.one.EntityType1';
        const property = new Property('TestProperty', entityName, propertyDescription, true, false);

        const result = resolvePropertyTypeToReference(property);

        expect(result).toBe(entityName);
    });

    it('should return the type for reference collection types', () => {
        const entityName = 'namespace.one.EntityType1';

        const collectionProperty = new CollectionProperty(entityName);

        const property = new Property('TestProperty', collectionProperty, propertyDescription, true, false);

        const result = resolvePropertyTypeToReference(property);

        expect(result).toBe(entityName);
    });
});

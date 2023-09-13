import { Config, EntityTypeConfig } from "../src/config";
import { CollectionProperty } from "../src/definitions/CollectionProperty";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { EntityType } from "../src/definitions/EntityType";
import { PrimitiveSwaggerType } from "../src/definitions/PrimitiveSwaggerType";
import { Property } from "../src/definitions/Property";
import { validateReferences } from "../src/validator";

describe("alias need to be resolved", () => {

    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameOne', {
        Name: 'namespace.entityNameOne',
        RootUri: '/entityNameOnes',
        NavigationProperty: []
    } as EntityTypeConfig);

    const config = {
        EntityTypes: entityTypes,
        URL: 'https://example.com',
        APIVersion: 'beta'
    } as Config;

    jest.mock('../src/util/propertyTypeResolver', () => {
        const mockPropertyType = jest.requireActual('../src/util/propertyTypeResolver');
        return {
            resolvePropertyTypeToReference: jest.fn(mockPropertyType.resolvePropertyTypeToReference)
        }
    });

    jest.mock('../src/validator', () => {
        const mockValidator = jest.requireActual('../src/validator');
        return {
            propertyHandler: jest.fn(mockValidator.propertyHandler),
            replaceAlias: jest.fn(mockValidator.replaceAlias),
        }
    });

    beforeEach(() => {
        jest.resetModules();
    });

    it('should resolve alias', () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
        
        const nsOneEntityOneProps: Property[] = [
            new Property('propertyOne', 'n1.entityNameTwo', true, false),
            new Property('propertyTwo', PrimitiveSwaggerType.Instance.Binary, true, false)
        ];
        const nsOneEntityOne: EntityType = new EntityType('entityNameOne', false, undefined, false, false, nsOneEntityOneProps, [])

        const nsOneEntityTwoProps: Property[] = [
            new Property('propertyTwo', new CollectionProperty('n2.complexTypeName'), true, false)
        ];
        const nsOneEntityTwo: EntityType = new EntityType('entityNameTwo', false, undefined, false, false, nsOneEntityTwoProps, [])

        const nsTwoComplexTypeProps: Property[] = [
            new Property('propertyThree', 'n2.entityNameOne', true, false),
            new Property('propertyFour', new CollectionProperty(PrimitiveSwaggerType.Instance.Long), true, false)
        ];
        const nsTwoComplexType: EntityType = new EntityType('complexTypeName', false, undefined, false, false, nsTwoComplexTypeProps, [])

        const nsTwoEntityOne: EntityType = new EntityType('entityNameOne', false, undefined, false, false, [], [])

        definitionMap.EntityMap.set('namespace.entityNameOne', nsOneEntityOne);
        definitionMap.EntityMap.set('namespace.entityNameTwo', nsOneEntityTwo);
        definitionMap.EntityMap.set('namespaceTwo.complexTypeName', nsTwoComplexType);
        definitionMap.EntityMap.set('namespaceTwo.entityNameOne', nsTwoEntityOne);

        definitionMap.AliasMap.set('n1', 'namespace');
        definitionMap.AliasMap.set('n2', 'namespaceTwo');

        definitionMap = validateReferences(definitionMap, config);

        expect(definitionMap.EntityMap.get('namespace.entityNameOne')!.Property[0].Type).toBe('namespace.entityNameTwo');
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')!.Property[1].Type).toBe(PrimitiveSwaggerType.Instance.Binary);
        expect((definitionMap.EntityMap.get('namespace.entityNameTwo')!.Property[0].Type as CollectionProperty).Type).toBe('namespaceTwo.complexTypeName');
        expect(definitionMap.EntityMap.get('namespaceTwo.complexTypeName')!.Property[0].Type).toBe('namespaceTwo.entityNameOne');
        expect((definitionMap.EntityMap.get('namespaceTwo.complexTypeName')!.Property[1].Type as CollectionProperty).Type).toBe(PrimitiveSwaggerType.Instance.Long);
        
    });   
});

describe("configurations need to be validated", () => {
    it('should throw if wrong navigation property', () => {
        const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

        entityTypes.set('namespace.entityNameOne', {
            Name: 'namespace.entityNameOne',
            RootUri: '/entityNameOnes',
            NavigationProperty: ['navOne']
        } as EntityTypeConfig);

        const config = {
            EntityTypes: entityTypes,
            URL: 'https://example.com',
            APIVersion: 'beta'
        } as Config;

        const definitionMap: DefinitionMap = new DefinitionMap();

        const entityProperties: Property[] = [
            new Property('propertyOne', PrimitiveSwaggerType.Instance.String, true, false),
            new Property('propertyTwo', PrimitiveSwaggerType.Instance.Binary, true, false)
        ];
        const entity: EntityType = new EntityType('entityNameOne', false, undefined, false, false, entityProperties, [])

        definitionMap.EntityMap.set('namespace.entityNameOne', entity);

        expect(() => validateReferences(definitionMap, config)).toThrowError(`Navigation property navOne from config.yml is not present in namespace.entityNameOne`);
    });

    it('should throw if wrong read only property', () => {
        const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

        entityTypes.set('namespace.entityNameOne', {
            Name: 'namespace.entityNameOne',
            RootUri: '/entityNameOnes',
            ReadOnly: ['propertyOne']
        } as EntityTypeConfig);

        const config = {
            EntityTypes: entityTypes,
            URL: 'https://example.com',
            APIVersion: 'beta'
        } as Config;

        const definitionMap: DefinitionMap = new DefinitionMap();

        const entityProperties: Property[] = [
            new Property('propertyTwo', PrimitiveSwaggerType.Instance.Binary, true, false)
        ];
        const entity: EntityType = new EntityType('entityNameOne', false, undefined, false, false, entityProperties, [])

        definitionMap.EntityMap.set('namespace.entityNameOne', entity);

        expect(() => validateReferences(definitionMap, config)).toThrowError(`Read Only property propertyOne from config.yml is not present in namespace.entityNameOne`);
    });

});
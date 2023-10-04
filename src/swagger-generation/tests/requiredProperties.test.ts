import { CSDL } from "../src/definitions/RawTypes";
import { Config, EntityTypeConfig } from "../src/config";
import { Definition, Swagger } from "../src/definitions/Swagger";
import { EntityType } from "../src/definitions/EntityType";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { constructDataStructure } from "../src/deserializer";
import { writeSwagger } from "../src/swaggerWriter";

const csdl: CSDL = {
    'edmx:Edmx': {
        'edmx:DataServices': [
            {
                Schema: [
                    {
                        $: {
                            Namespace: 'namespace',

                        },
                        EntityType: [
                            {
                                $: {
                                    Name: 'entityNameOne',
                                },
                                Property: [
                                    {
                                        $: {
                                            Name: 'propertyName',
                                            Type: 'Edm.String'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameTwo',
                                            Type: 'namespace.entityNameTwo'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameThree',
                                            Type: 'namespace.entityNameTwo'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameFour',
                                            Type: 'Edm.Test'
                                        },
                                    }
                                ],
                                NavigationProperty: []
                            },
                            {
                                $: {
                                    Name: 'entityNameTwo',
                                },
                                Property: [
                                    {
                                        $: {
                                            Name: 'propertyName',
                                            Type: 'Edm.String'
                                        },
                                    },
                                ],
                                NavigationProperty: []
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

describe("when required properties are not real", () => {
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();
    
    entityTypes.set('namespace.entityNameOne', {
        Name: 'namespace.entityNameOne',
        RootUri: '/entityNameOnes',
        NavigationProperty: [],
        RequiredOnWrite: [
            "fakeProp",
        ],
    } as EntityTypeConfig);

    const config = {
        EntityTypes: entityTypes,
        URL: 'https://example.com',
        APIVersion: 'beta'
    } as Config;

    it("should throw an error", () => {
        let definitionMap: DefinitionMap = new DefinitionMap();

        definitionMap = constructDataStructure(csdl, definitionMap, config)

        expect(() => writeSwagger(definitionMap, config)).toThrowError("Reference Error: Entity entityNameOne references non-existent Edm.Test and skipped validator check. Depth: 0")
    })
})

describe("when required properties are real", () => {
    const entityTypesTwo: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypesTwo.set('namespace.entityNameOne', {
        Name: 'namespace.entityNameOne',
        RootUri: '/entityNameOnes',
        NavigationProperty: [],
        RequiredOnWrite: [
            "propertyName",
        ],
    } as EntityTypeConfig);

    const config = {
        EntityTypes: entityTypesTwo,
        URL: 'https://example.com',
        APIVersion: 'beta'
    } as Config;

    it("should not throw an error", () => {
        let definitionMap: DefinitionMap = new DefinitionMap();

        definitionMap.EntityMap.set('Edm.Test', new EntityType('Test', false, undefined, undefined, undefined, [], []))

        definitionMap = constructDataStructure(csdl, definitionMap, config)

        expect(() => writeSwagger(definitionMap, config)).not.toThrowError()

        const swagger: Swagger = writeSwagger(definitionMap, config)

        const definition: Definition = swagger.definitions['namespace.entityNameOne'] as Definition

        expect(definition.required).toContain('propertyName')

    })
})
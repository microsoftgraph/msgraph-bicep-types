import { EntityTypeConfig } from "../src/config";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { PrimitiveSwaggerTypeStruct } from "../src/definitions/PrimitiveSwaggerType";
import { CSDL } from "../src/definitions/RawTypes";
import { constructDataStructure } from "../src/deserializer";

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
                                    {
                                        $: {
                                            Name: 'propertyNameTwo',
                                            Type: 'Edm.TimeOfDay'
                                        },
                                    },
                                    {
                                        $: {
                                            Name: 'propertyNameThree',
                                            Type: 'Edm.Test'
                                        },
                                    }
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

describe("when csdl contains not mapped types", () =>{
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    entityTypes.set('namespace.entityNameOne', {
        Name: 'namespace.entityNameOne',
        RootUri: 'entityNameOnes',
        NavigationProperty: []
    } as EntityTypeConfig);

    entityTypes.set('namespace.entityNameTwo', {
        Name: 'namespace.entityNameTwo',
        RootUri: 'entityNameTwos',
        NavigationProperty: []
    });

    const config = {
        EntityTypes: entityTypes,
        URL: 'https://example.com',
        APIVersion: 'beta'
    }

    it("should return the correct properties", () => {
        let definitionMap: DefinitionMap = new DefinitionMap();
    
        expect(() => constructDataStructure(csdl, definitionMap, config)).not.toThrow();

        definitionMap = constructDataStructure(csdl, definitionMap, config);
    
        expect(definitionMap.EntityMap.get('namespace.entityNameOne')?.Property.length).toBe(4)

        let primitiveCounter = 0;
        definitionMap.EntityMap.forEach((entity) => {
            entity.Property.forEach((property) => {
                if(property.Type.constructor.name === PrimitiveSwaggerTypeStruct.name) primitiveCounter++;
            }
        )})

        expect(primitiveCounter).toBe(3) // 2 strings and 1 time of day
    
    });
});


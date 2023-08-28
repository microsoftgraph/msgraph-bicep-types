// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";
import { NavigationProperty } from "./NavigationProperty";
import { Definition, Property as SwaggerProperty } from "./Swagger";
import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType";
import { CollectionProperty } from "./CollectionProperty";


export class EntityType extends Object {
    Name: string;
    Abstract?: boolean;
    BaseType?: string;
    OpenType?: boolean;
    HasStream?: boolean;
    Property: Property[];
    NavigationProperty: NavigationProperty[];

    constructor(name: string, abstract: boolean | undefined, baseType: string | undefined, openType: boolean | undefined, hasStream: boolean | undefined, property: Property[], navigationProperty: NavigationProperty[]) {
        super();
        this.Name = name;
        this.Abstract = abstract;
        this.BaseType = baseType;
        this.OpenType = openType;
        this.HasStream = hasStream;
        this.Property = property;
        this.NavigationProperty = navigationProperty;
    }

    toSwaggerDefinition(required?: string[]): Definition {
        const definition: Definition = {
            type: "object",
            properties: {},
        };

        this.Property.forEach((property: Property) => {
            const propertyType: SwaggerProperty = {
                type: property.Type,  // Undefined property type
            }

            if(property.Type instanceof PrimitiveSwaggerTypeStruct){  // Property is primitive type
                property.Type = property.Type as PrimitiveSwaggerTypeStruct
                propertyType.type = property.Type.type // rewrite struct with string type
                if(property.Type.format){
                    propertyType.format = property.Type.format // property type has format
                }
            } else if (property.Type instanceof CollectionProperty) { // Property is collection
                
                property.Type = property.Type as CollectionProperty
                propertyType.type = "array"
                propertyType.items = {
                    type: property.Type.Type,  // Undefined collection type
                }
                if(property.Type.Type instanceof PrimitiveSwaggerTypeStruct){  // Collection is primitive type
                    property.Type.Type = property.Type.Type as PrimitiveSwaggerTypeStruct
                    propertyType.items.type = property.Type.Type.type // rewrite struct with string type
                    if(property.Type.Type.format){
                        propertyType.items.format = property.Type.Type.format // collection type has format
                    }
                }
            }

            definition.properties[property.Name] = propertyType
        });

        if(required){
            required.forEach((property: string) => {
                if (!definition.properties[property]) {
                    throw new Error(`Required property ${property} not found in ${this.Name}`);
                }
            });
            
            definition.required = required;
        }

        return definition;
    }

}
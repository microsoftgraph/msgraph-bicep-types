// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";
import { NavigationProperty } from "./NavigationProperty";
import { Definition } from "./Swagger";

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
            definition.properties[property.Name] = {
                type: property.Type,
            };
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
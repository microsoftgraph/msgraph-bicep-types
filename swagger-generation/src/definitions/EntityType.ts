// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";
import { NavigationProperty } from "./NavigationProperty";
import { Property as SwaggerProperty, Definition } from "./Swagger";

export class EntityType extends Object {
    Name: string;
    Abstract?: boolean;
    BaseType?: string;
    OpenType?: boolean;
    HasStream?: boolean;
    Property: Property[];
    NavigationProperty: NavigationProperty[];

    constructor(name: string, abstract: boolean, baseType: string, openType: boolean, hasStream: boolean, property: Property[], navigationProperty: NavigationProperty[]) {
        super();
        this.Name = name;
        this.Abstract = abstract;
        this.BaseType = baseType;
        this.OpenType = openType;
        this.HasStream = hasStream;
        this.Property = property;
        this.NavigationProperty = navigationProperty;
    }

    toSwaggerDefinition(): Definition {
        let definition: Definition = {
            type: "object",
            properties: {}
        };

        definition.properties["id"] = {
            type: "string",
            format: "uuid"
        };

        // this.Property.forEach((property: Property) => {
        //     switch (property.Type) {
        //         case "Edm.String":
        //             definition.properties[property.Name] = {
                        
            

        //     definition.properties[property.Name] = property.toSwaggerProperty();
        // });

        // this.NavigationProperty.forEach((navigationProperty) => {
        //     definition.properties[navigationProperty.Name] = navigationProperty.toSwaggerProperty();
        // });

        return definition;
    }

}
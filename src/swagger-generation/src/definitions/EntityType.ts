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

      const swaggerProperty: SwaggerProperty = {}

      let propertyType: CollectionProperty | PrimitiveSwaggerTypeStruct | string = property.Type;

      if (propertyType instanceof CollectionProperty) { // Collection unwrap
        propertyType = propertyType.Type as PrimitiveSwaggerTypeStruct | string;
        if (propertyType instanceof PrimitiveSwaggerTypeStruct) {  // Property is primitive type
          swaggerProperty.type = "array"
          swaggerProperty.items = {
            type: propertyType.type,  // Set swagger primitive type
          }
          if (propertyType.format) {
            swaggerProperty.items.format = propertyType.format // Set swagger primitive format
          }
        } else { // Property is complex type
          swaggerProperty.type = "array"
          swaggerProperty.items = {
            $ref: `#/definitions/${propertyType}` // Set swagger reference
          }
        }
      } else { // Not collection
        if (property.Type instanceof PrimitiveSwaggerTypeStruct) {  // Property is primitive type
          swaggerProperty.type = property.Type.type // Set swagger primitive type
          if (property.Type.format) {
            swaggerProperty.format = property.Type.format // Set swagger primitive format
          }
        } else {
          swaggerProperty.$ref = `#/definitions/${property.Type}` // Set swagger reference
        }
      }

      if (property.ReadOnly)
        swaggerProperty.readOnly = property.ReadOnly

      definition.properties[property.Name] = swaggerProperty
    });

    this.NavigationProperty.forEach((navigationProperty: NavigationProperty) => {
      const swaggerProperty: SwaggerProperty = {}

      let propertyType: CollectionProperty | string = navigationProperty.Type as CollectionProperty | string;

      if (propertyType instanceof CollectionProperty) { // Collection unwrap
        propertyType = propertyType.Type as string;
        swaggerProperty.type = "array"
        swaggerProperty.items = {
          type: "string" // id of the entity
        }
      } else { // Not collection
        swaggerProperty.type = "string" // id of the entity
      }

      definition.properties[navigationProperty.Name] = swaggerProperty
    });

    if (required) {
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

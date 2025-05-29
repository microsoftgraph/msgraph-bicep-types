// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";
import { NavigationProperty } from "./NavigationProperty";
import { AllOfDefinition, Definition, Property as SwaggerProperty } from "./Swagger";
import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType";
import { CollectionProperty } from "./CollectionProperty";
import { EntityTypeConfig } from "../config";


export class EntityType extends Object {
  Name: string;
  AlternateKey?: string;
  Abstract?: boolean;
  BaseType?: string;
  OpenType?: boolean;
  HasStream?: boolean;
  Property: Property[];
  NavigationProperty: NavigationProperty[];
  StreamProperty: Property[]; // Array to track stream properties separately

  constructor(name: string, alternateKey: string | undefined, abstract: boolean | undefined, baseType: string | undefined, openType: boolean | undefined, hasStream: boolean | undefined, property: Property[], navigationProperty: NavigationProperty[], streamProperty: Property[] = []) {
    super();
    this.Name = name;
    this.AlternateKey = alternateKey;
    this.Abstract = abstract;
    this.BaseType = baseType;
    this.OpenType = openType;
    this.HasStream = hasStream;
    this.Property = property;
    this.NavigationProperty = navigationProperty;
    this.StreamProperty = streamProperty;
  }

  toSwaggerDefinition(entityTypeConfig?: EntityTypeConfig): AllOfDefinition | Definition {
    const definition: Definition = {
      type: "object",
      properties: {},
    };

    // Process regular properties
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

      swaggerProperty.description = property.Description;

      if (property.ReadOnly)
        swaggerProperty.readOnly = property.ReadOnly

      if (this.AlternateKey && property.Name === this.AlternateKey) {
        swaggerProperty["x-ms-graph-key"] = true;

        if (this.Name.toLowerCase() !== "serviceprincipal" &&
          this.Name.toLowerCase() !== "federatedidentitycredential") // Temporary when full resource name is supported
          swaggerProperty["x-constant-key"] = true
      }

      definition.properties[property.Name] = swaggerProperty
    });

    // Process stream properties
    this.StreamProperty.forEach((property: Property) => {
      const swaggerProperty: SwaggerProperty = {
        type: "string",
        format: "binary",
        description: property.Description,
        readOnly: property.ReadOnly // Set readOnly property
      };

      definition.properties[property.Name] = swaggerProperty;
    });

    // Process navigation properties
    this.NavigationProperty.forEach((navigationProperty: NavigationProperty) => {
      const swaggerProperty: SwaggerProperty = {}

      if (entityTypeConfig?.Relationships?.Properties.includes(navigationProperty.Name)) {
        swaggerProperty.$ref = "#/definitions/microsoft.graph.relationship";
      }
      else {
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
      }

      swaggerProperty.description = navigationProperty.Description;
      definition.properties[navigationProperty.Name] = swaggerProperty
    });

    if (entityTypeConfig?.RequiredOnWrite) {
      entityTypeConfig.RequiredOnWrite.forEach((property: string) => {
        if (!definition.properties[property]) {
          throw new Error(`Required property ${property} not found in ${this.Name}`);
        }
      });

      definition.required = entityTypeConfig.RequiredOnWrite;
    }

    if (entityTypeConfig?.RootUri != undefined) {
      definition["x-ms-graph-resource"] = true;
    }

    if (this.BaseType) {
      return {
        allOf: [
          { "$ref": `#/definitions/${this.BaseType}` },
          definition,
        ]
      } as AllOfDefinition;
    }

    return definition;
  }

}

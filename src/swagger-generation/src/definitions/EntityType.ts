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

  constructor(name: string, alternateKey: string | undefined, abstract: boolean | undefined, baseType: string | undefined, openType: boolean | undefined, hasStream: boolean | undefined, property: Property[], navigationProperty: NavigationProperty[]) {
    super();
    this.Name = name;
    this.AlternateKey = alternateKey;
    this.Abstract = abstract;
    this.BaseType = baseType;
    this.OpenType = openType;
    this.HasStream = hasStream;
    this.Property = property;
    this.NavigationProperty = navigationProperty;
  }

  toSwaggerDefinition(entityTypeConfig?: EntityTypeConfig): AllOfDefinition | Definition {
    const definition: Definition = {
      type: "object",
      properties: {},
    };

    // Process regular properties
    this.Property.forEach((property: Property) => {
      const swaggerProperty: SwaggerProperty = {};

      if (property.Type instanceof PrimitiveSwaggerTypeStruct) {
        swaggerProperty.type = property.Type.type;
        swaggerProperty.format = property.Type.format;
      } else if (property.Type instanceof CollectionProperty) {
        swaggerProperty.type = "array";
        const collectionType = property.Type.Type;
        if (collectionType instanceof PrimitiveSwaggerTypeStruct) {
          swaggerProperty.items = {
            type: collectionType.type,
            format: collectionType.format
          };
        } else {
          swaggerProperty.items = {
            $ref: `#/definitions/${collectionType}`
          };
        }
      } else {
        swaggerProperty.$ref = `#/definitions/${property.Type}`;
      }

      swaggerProperty.description = property.Description;
      swaggerProperty.readOnly = property.ReadOnly;

      if (this.AlternateKey && property.Name === this.AlternateKey) {
        swaggerProperty["x-ms-graph-key"] = true;

        if (this.Name.toLowerCase() !== "serviceprincipal" &&
          this.Name.toLowerCase() !== "federatedidentitycredential") // Temporary when full resource name is supported
          swaggerProperty["x-constant-key"] = true
      }

      definition.properties[property.Name] = swaggerProperty
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

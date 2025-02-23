// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig } from "./config";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { EnumType } from "./definitions/EnumType";
import { Property } from "./definitions/Property";
import { Reference } from "./definitions/Reference";
import { Parameter, Path, Product, Scheme, Swagger, SwaggerVersion } from "./definitions/Swagger";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

export const writeSwagger = (definitionMap: DefinitionMap, config: Config): Swagger => {
  const MAX_DEPTH = 15;
  const swagger: Swagger = {
    swagger: SwaggerVersion.v2,
    info: {
      title: "Microsoft Graph",
      version: config.APIVersion,
    },
    schemes: [
      Scheme.https
    ],
    consumes: [
      Product.application_json
    ],
    produces: [
      Product.application_json
    ],
    definitions: {
      "microsoft.graph.relationshipSemantics": {
        type: "string",
        enum: ["append", "replace"]
      },
      "microsoft.graph.relationship": {
        type: "object",
        properties: {
          relationshipSemantics: {
            $ref: "#/definitions/microsoft.graph.relationshipSemantics",
            description: "Specifies the semantics used by the Microsoft Graph Bicep extension to process the relationships. The 'append' semantics means that the relationship items in the template are added to the existing list. The 'replace' semantics means that the relationship items in the template will replace all existing items in the Entra resource. The default value (if not set) is 'append'"
          },
          relationships: {
            type: "array",
            items: {
              "type": "string"
            },
            description: "The list of object ids to be included in the relationship."
          },
        },
        required: ["relationships"]
      }
    },
    paths: {}
  }

  // Initialize exploration of Types
  const entityReferences: Map<string, EntityType> = new Map<string, EntityType>()
  const enumReferences: Map<string, EnumType> = new Map<string, EnumType>()
  const entityReferencesQueue: Reference[] = []

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    console.log("Writing swagger for " + id)

    const entity: EntityType = definitionMap.EntityMap.get(id)! // Validator already checked this assertion

    addReferences(definitionMap, entity, entityReferences, enumReferences, entityReferencesQueue, 0)
    swagger.definitions[id] = entity.toSwaggerDefinition(entityTypeConfig)
  });

  while (entityReferencesQueue.length > 0) {
    const currentReference: Reference = entityReferencesQueue.shift() as Reference
    const currentDepth: number = currentReference.depth

    if (currentDepth > MAX_DEPTH) {
      console.error(`Max depth reached for ${currentReference.id}`)
      break;
    }

    const currentEntity: EntityType = entityReferences.get(currentReference.id) as EntityType
    addReferences(definitionMap, currentEntity, entityReferences, enumReferences, entityReferencesQueue, currentDepth)
  }

  // Write all references
  entityReferences.forEach((entity: EntityType, id: string) => {
    swagger.definitions[id] = entity.toSwaggerDefinition()
  });

  enumReferences.forEach((enumType: EnumType, id: string) => {
    swagger.definitions[id] = enumType.toSwaggerDefinition()
  });

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    if (!entityTypeConfig.RootUri) { // Entity is not exposed
      return;
    }
    const entityName: string = definitionMap.EntityMap.get(id)!.Name
    const entitySegments: string[] = entityTypeConfig.RootUri.split("/").slice(-2)
    const operationType: string = entityTypeConfig.IsReadonlyResource ? "get" : "put";
    const operationDescription: string = entityTypeConfig.IsReadonlyResource ? "Get" : "Create or update";
    const parentEntity: string = entitySegments[0];
    const entitySet: string = entitySegments[1];
    let relativeUri: string = entitySet;
    let parameters: Parameter[] = [
      {
        in: "path",
        description: `The id of the ${entityName}`,
        name: `${entityName}Id`,
        required: true,
        type: "string"
      },
    ];

    if (!entityTypeConfig.IsReadonlyResource) {
      parameters.push(
        {
          in: "body",
          name: entityName,
          description: `The ${entityName} to ${operationDescription.toLowerCase()}`,
          required: true,
          schema: {
            $ref: `#/definitions/${id}`
          }
        },
      );
    };

    if (parentEntity) {
      relativeUri = `${parentEntity}/{${parentEntity}Id}/${entitySet}`
      parameters.push({
        in: "path",
        description: `The id of the ${parentEntity}`,
        name: `${parentEntity}Id`,
        required: true,
        type: "string"
      })
    };

    const host: string = `/{rootScope}/providers/Microsoft.Graph/${relativeUri}/{${entityName}Id}`
    const path: Path = {
      [operationType]: {
        tags: [
          entitySet
        ],
        description: `${operationDescription} a ${entityName}`,
        operationId: `${entitySet}_${entityTypeConfig.IsReadonlyResource ? "get" : "upsert"}`,
        consumes: [
          Product.application_json
        ],
        produces: [
          Product.application_json
        ],
        parameters: parameters,
        responses: {
          "200": {
            description: `${entityName} ${entityTypeConfig.IsReadonlyResource ? "get" : "created or updated"} successfully`,
            schema: {
              $ref: `#/definitions/${id}`
            }
          }
        }
      }
    }

    swagger.paths[host] = path;
  });

  return swagger
};

const handleComplexProperties = (definitionMap: DefinitionMap, entity: EntityType, reference: Reference, entityReferences: Map<string, EntityType>, enumReferences: Map<string, EnumType>, referenceQueue: Reference[]): boolean => {
  const currentType: EntityType | undefined = definitionMap.EntityMap.get(reference.id)

  if (!currentType) { // There's no Complex Type with this id
    if (!definitionMap.EnumMap.has(reference.id)) { // There isn't an Enum with this id
      throw new Error(`Reference Error: Entity ${entity.Name} references non-existent ${reference.id} and skipped validator check. Depth: ${reference.depth}`);
    }
    enumReferences.set(reference.id, definitionMap.EnumMap.get(reference.id)!)
    return false;
  }

  // There's a ComplexType with this id
  entityReferences.set(reference.id, currentType)
  const newReference = new Reference(reference.id, reference.depth + 1)
  referenceQueue.push(newReference)

  return true;
}

const addReferences = (definitionMap: DefinitionMap, entity: EntityType, entityReferences: Map<string, EntityType>, enumReferences: Map<string, EnumType>, entityReferenceQueue: Reference[], currentDepth: number): void => {
  // Add references for base type
  let baseType: string | undefined = entity.BaseType;

  while (baseType && !entityReferences.has(baseType)) {
    const baseEntity: EntityType | undefined = definitionMap.EntityMap.get(baseType)
    if (!baseEntity) {
      throw new Error(`Reference Error: Entity ${entity.Name} base type ${baseType} not found in CSDL`);
    }

    entityReferences.set(baseType, baseEntity);
    baseType = baseEntity.BaseType;
  }

  // Add references for properties
  entity.Property.forEach((property: Property) => {
    const referenceId: string | undefined = resolvePropertyTypeToReference(property);
    if (!referenceId)
      return;

    const reference: Reference = new Reference(referenceId, currentDepth)

    handleComplexProperties(definitionMap, entity, reference, entityReferences, enumReferences, entityReferenceQueue)
  });
}
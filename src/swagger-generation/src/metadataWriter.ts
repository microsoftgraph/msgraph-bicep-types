// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig, RelationshipConfig } from "./config";
import { DefinitionMap } from './definitions/DefinitionMap';
import { EntityType } from "./definitions/EntityType";
import { Metadata, RelationshipMetadata } from './definitions/Metadata';

export const writeMetadata = (definitionMap: DefinitionMap, config: Config): Metadata => {
  let metadata: Metadata = {};

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    const rootUri = entityTypeConfig.RootUri;

    if (rootUri) {
      console.log("Writing metadata for " + id);

      const relativeUri: string = rootUri.slice(1) as string;
      const entity: EntityType = definitionMap.EntityMap.get(id)! // Validator already checked this assertion

      metadata[relativeUri] = {
        [config.APIVersion]: {
          isIdempotent: entityTypeConfig.Upsertable ?? false,
          isReadonly: entityTypeConfig.IsReadonlyResource,
          updatable: (entityTypeConfig.Upsertable ?? false) || (entityTypeConfig.Updatable ?? false),
          alternateKey: entity.AlternateKey,
          isContainment: entityTypeConfig.ContainerEntitySet != null,
          navigationProperties: entityTypeConfig.NavigationProperty,
          containerEntitySet: entityTypeConfig.ContainerEntitySet,
          keyProperty: entityTypeConfig.ContainerKeyProperty,
          temporaryFilterKeys: entityTypeConfig.FilterProperty,
          compositeKeyProperties: entityTypeConfig.CompositeKey,
          relationshipMetadata: getRelationshipMetadata(entityTypeConfig.Relationships, entity),
        },
      };
    }
  });

  return metadata;
}

function getRelationshipMetadata(relationshipConfig: RelationshipConfig | undefined, entity: EntityType): RelationshipMetadata | undefined {
  if (relationshipConfig) {
    return {
      needsBatch: relationshipConfig.NeedsBatch,
      bulkLimit: relationshipConfig.BulkLimit,
      properties: entity.NavigationProperty
        .filter(np => relationshipConfig.Properties.includes(np.Name) && np.Target)
        .map(np => {
          return {
            name: np.Name,
            type: np.Target!,
          };
        }),
    };
  }

  return undefined;
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig } from "./config";
import { DefinitionMap } from './definitions/DefinitionMap';
import { EntityType } from "./definitions/EntityType";
import { Metadata } from './definitions/Metadata';

export const writeMetadata = (definitionMap: DefinitionMap, config: Config): Metadata => {
  let metadata: Metadata = {};

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    const rootUri = entityTypeConfig.RootUri;

    if (rootUri) {
      console.log("Writing metadata for " + id);

      const relativeUri: string = rootUri.split("/").pop() as string;
      const entity: EntityType = definitionMap.EntityMap.get(id)! // Validator already checked this assertion

      metadata[relativeUri] = {
        [config.APIVersion]: {
          isIdempotent: entityTypeConfig.Upsertable ?? false,
          updatable: (entityTypeConfig.Upsertable ?? false) || (entityTypeConfig.Updatable ?? false),
          alternateKey: entity.AlternateKey,
          isContainment: entityTypeConfig.ContainerKeyProperty != null,
          navigationProperties: entityTypeConfig.NavigationProperty,
          containerEntitySet: entityTypeConfig.ContainerEntitySet,
          keyProperty: entityTypeConfig.ContainerKeyProperty,
          temporaryFilterKeys: entityTypeConfig.FilterProperty,
          compositeKeyProperties: entityTypeConfig.CompositeKey,
        },
      };
    }
  });

  return metadata;
}

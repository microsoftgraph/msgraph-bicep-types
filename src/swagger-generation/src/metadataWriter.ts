// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig, RelationshipConfig } from "./config";
import { DefinitionMap } from './definitions/DefinitionMap';
import { EntityType } from "./definitions/EntityType";
import { Metadata, RelationshipMetadata, OrchestrationType } from './definitions/Metadata';
import { determineOrchestrationType } from './util/orchestrationTypeResolver';
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat } from './definitions/PrimitiveSwaggerType';

export const writeMetadata = (definitionMap: DefinitionMap, config: Config): Metadata => {
  let metadata: Metadata = {};

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    const rootUri = entityTypeConfig.RootUri;

    if (rootUri) {
      console.log("Writing metadata for " + id);

      const relativeUri: string = rootUri.slice(1) as string;
      const entity: EntityType = definitionMap.EntityMap.get(id)! // Validator already checked this assertion

      // Generate orchestration properties if not explicitly configured
      const orchestrationProperties = entityTypeConfig.OrchestrationProperties || {
        Save: entity.Property
          .filter(p => !p.ReadOnly)
          .map(p => {
            const isStream = p.Type instanceof PrimitiveSwaggerTypeStruct && 
                           p.Type.type === "string" && 
                           p.Type.format === SwaggerMetaFormat.Binary;
            return {
              Name: p.Name,
              OrchestrationType: determineOrchestrationType(p),
              ...(isStream && { UrlPattern: undefined, HttpMethod: undefined })
            };
          }),
        Get: entity.Property
          .filter(p => p.ReadOnly)
          .map(p => {
            const isStream = p.Type instanceof PrimitiveSwaggerTypeStruct && 
                           p.Type.type === "string" && 
                           p.Type.format === SwaggerMetaFormat.Binary;
            return {
              Name: p.Name,
              OrchestrationType: determineOrchestrationType(p),
              ...(isStream && { UrlPattern: undefined, HttpMethod: undefined })
            };
          })
      };

      metadata[relativeUri] = {
        [config.APIVersion]: {
          entitySetPath: entityTypeConfig.EntitySetPath,
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
          resourceKey: entityTypeConfig.ResourceKey ? {
            name: entityTypeConfig.ResourceKey.Name
          } : undefined,
          orchestrationProperties: {
            save: orchestrationProperties.Save?.map(p => ({ 
              name: p.Name,
              orchestrationType: p.OrchestrationType as OrchestrationType,
              urlPattern: p.UrlPattern,
              httpMethod: p.HttpMethod
            })),
            get: orchestrationProperties.Get?.map(p => ({ 
              name: p.Name,
              orchestrationType: p.OrchestrationType as OrchestrationType,
              urlPattern: p.UrlPattern,
              httpMethod: p.HttpMethod
            }))
          }
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
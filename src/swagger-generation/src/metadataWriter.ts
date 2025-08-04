// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Config, EntityTypeConfig, RelationshipConfig } from "./config";
import { DefinitionMap } from './definitions/DefinitionMap';
import { EntityType } from "./definitions/EntityType";
import { Metadata, RelationshipMetadata, OrchestrationType } from './definitions/Metadata';
import { determineOrchestrationType } from './util/orchestrationTypeResolver';
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat } from './definitions/PrimitiveSwaggerType';

const getStreamUrlPattern = (propertyName: string, entityName: string): string => {
  // Special case for logo property
  if (propertyName.toLowerCase() === 'logo') {
    return '/logo';
  }
  // Default pattern for other stream properties
  return `/${propertyName}/content`;
};

const shouldOrchestrateProperty = (propertyName: string): boolean => {
  // Orchestrate both logo and stream properties
  return propertyName.toLowerCase() === 'logo' || propertyName.toLowerCase() === 'streamproperty';
};

export const writeMetadata = (definitionMap: DefinitionMap, config: Config): Metadata => {
  let metadata: Metadata = {};

  config.EntityTypes.forEach((entityTypeConfig: EntityTypeConfig, id: string) => {
    const rootUri = entityTypeConfig.RootUri;

    // Skip internal entities
    if (entityTypeConfig.IsInternal) {
      console.log("Skipping internal entity " + id);
      return;
    }

    if (rootUri) {
      console.log("Writing metadata for " + id);

      const relativeUri: string = rootUri.slice(1) as string;
      const entity: EntityType = definitionMap.EntityMap.get(id)! // Validator already checked this assertion

      // Only include logo property in orchestration properties
      const orchestrationProperties = {
        Save: entity.Property
          .filter(p => !p.ReadOnly && shouldOrchestrateProperty(p.Name))
          .map(p => ({
            Name: p.Name,
            OrchestrationType: OrchestrationType.BinaryStream,
            UrlPattern: getStreamUrlPattern(p.Name, id),
            HttpMethod: "PUT"
          })),
        Get: entity.Property
          .filter(p => p.ReadOnly && shouldOrchestrateProperty(p.Name))
          .map(p => ({
            Name: p.Name,
            OrchestrationType: OrchestrationType.BinaryStream,
            UrlPattern: getStreamUrlPattern(p.Name, id),
            HttpMethod: "GET"
          }))
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
            name: entityTypeConfig.ResourceKey.Name,
            omitInPayload: entityTypeConfig.ResourceKey.OmitInPayload
          } : undefined,
          isSingleton: entityTypeConfig.IsSingleton,
          pathSegmentName: entityTypeConfig.PathSegmentName,
          orchestrationProperties: {
            save: orchestrationProperties.Save?.map(p => ({ 
              name: p.Name,
              orchestrationType: p.OrchestrationType,
              urlPattern: p.UrlPattern,
              httpMethod: p.HttpMethod
            })),
            get: orchestrationProperties.Get?.map(p => ({ 
              name: p.Name,
              orchestrationType: p.OrchestrationType,
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
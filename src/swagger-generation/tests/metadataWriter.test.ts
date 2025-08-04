import { Config, EntityTypeConfig } from "../src/config";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { EntityType } from "../src/definitions/EntityType";
import { writeMetadata } from "../src/metadataWriter";
import { Property } from "../src/definitions/Property";
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat } from "../src/definitions/PrimitiveSwaggerType";
import { OrchestrationType } from "../src/definitions/Metadata";
import { SwaggerMetaType } from "../src/definitions/PrimitiveSwaggerType";

describe("writeMetadata", () => {
  it("should write runtime config only for entity types with a root URI", () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    definitionMap.EntityMap.set(
      "namespace.entityWithRootUri",
      new EntityType("entityWithRootUri", undefined, false, undefined, false, false, [], [])
    );

    definitionMap.EntityMap.set(
      "namespace.entityNoRootUri",
      new EntityType("entityNoRootUri", undefined, false, undefined, false, false, [], [])
    );

    entityTypes.set("namespace.entityWithRootUri", {
      Name: "namespace.entityWithRootUri",
      Upsertable: true,
      RootUri: "/entityWithRootUri",
      NavigationProperty: [],
    } as EntityTypeConfig);

    entityTypes.set("namespace.entityNoRootUri", {
      Name: "namespace.entityNoRootUri",
      Upsertable: true,
      NavigationProperty: [],
    } as EntityTypeConfig);

    const config = {
      EntityTypes: entityTypes,
      MetadataFilePath: "https://example.com",
      APIVersion: "beta",
    } as Config;

    const metadata = writeMetadata(definitionMap, config);

    expect(metadata["entityNoRootUri"]).toBeUndefined();
    expect(metadata["entityWithRootUri"]).toBeDefined();
    expect(metadata["entityWithRootUri"]["beta"]).toBeDefined();
  });

  it("should not write undefined config properties", () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    definitionMap.EntityMap.set(
      "namespace.entityUndefinedProps",
      new EntityType("entityUndefinedProps", "alternateKey", false, undefined, false, false, [], [])
    );

    definitionMap.EntityMap.set(
      "namespace.entityTwo",
      new EntityType("entityTwo", "entityTwoAlternateKey", false, undefined, false, false, [], [])
    );

    entityTypes.set("namespace.entityUndefinedProps", {
      Name: "namespace.entityUndefinedProps",
      Upsertable: true,
      RootUri: "/entityUndefinedProps",
    } as EntityTypeConfig);

    entityTypes.set("namespace.entityTwo", {
      Name: "namespace.entityTwo",
      Upsertable: true,
      RootUri: "/entityTwo",
      ContainerEntitySet: "containerEntitySet",
      ContainerKeyProperty: "containerKeyProperty",
      NavigationProperty: ["nav1", "nav2"],
      FilterProperty: ["filter1", "filter2"],
      CompositeKey: ["compositeKey1", "compositeKey2"],
    } as EntityTypeConfig);

    const config = {
      EntityTypes: entityTypes,
      MetadataFilePath: "https://example.com",
      APIVersion: "beta",
    } as Config;

    const metadata = writeMetadata(definitionMap, config);

    expect(metadata["entityUndefinedProps"]).toEqual({
      beta: {
        isIdempotent: true,
        updatable: true,
        isContainment: false,
        alternateKey: "alternateKey",
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });

    expect(metadata["entityTwo"]).toEqual({
      beta: {
        isIdempotent: true,
        updatable: true,
        alternateKey: "entityTwoAlternateKey",
        isContainment: true,
        navigationProperties: ["nav1", "nav2"],
        containerEntitySet: "containerEntitySet",
        keyProperty: "containerKeyProperty",
        temporaryFilterKeys: ["filter1", "filter2"],
        compositeKeyProperties: ["compositeKey1", "compositeKey2"],
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });
  });

  it("should correctly write attributes", () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    definitionMap.EntityMap.set(
      "namespace.entityUpsertable",
      new EntityType("entityUndefinedProps", "alternateKey", false, undefined, false, false, [], [])
    );

    definitionMap.EntityMap.set(
      "namespace.entityUpdatable",
      new EntityType("entityUndefinedProps", undefined, false, undefined, false, false, [], [])
    );

    definitionMap.EntityMap.set(
      "namespace.entityNotUpdatable",
      new EntityType("entityUndefinedProps", undefined, false, undefined, false, false, [], [])
    );

    definitionMap.EntityMap.set(
      "namespace.entityReadonly",
      new EntityType("entityUndefinedProps", "alternateKey", false, undefined, false, false, [], [])
    );

    entityTypes.set("namespace.entityUpsertable", {
      Name: "namespace.entityUpsertable",
      Upsertable: true,
      RootUri: "/entityUpsertable",
    } as EntityTypeConfig);

    entityTypes.set("namespace.entityUpdatable", {
      Name: "namespace.entityUpdatable",
      Upsertable: false,
      Updatable: true,
      RootUri: "/entityUpdatable",
    } as EntityTypeConfig);

    entityTypes.set("namespace.entityNotUpdatable", {
      Name: "namespace.entityNotUpdatable",
      Upsertable: false,
      RootUri: "/entityNotUpdatable",
    } as EntityTypeConfig);

    entityTypes.set("namespace.entityReadonly", {
      Name: "namespace.entityReadonly",
      IsReadonlyResource: true,
      RootUri: "/entityReadonly",
    } as EntityTypeConfig);

    const config = {
      EntityTypes: entityTypes,
      MetadataFilePath: "https://example.com",
      APIVersion: "beta",
    } as Config;

    const metadata = writeMetadata(definitionMap, config);

    expect(metadata["entityUpsertable"]).toEqual({
      beta: {
        isIdempotent: true,
        updatable: true,
        isContainment: false,
        alternateKey: "alternateKey",
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });

    expect(metadata["entityUpdatable"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: true,
        isContainment: false,
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });

    expect(metadata["entityNotUpdatable"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: false,
        isContainment: false,
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });

    expect(metadata["entityReadonly"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: false,
        isContainment: false,
        isReadonly: true,
        alternateKey: "alternateKey",
        orchestrationProperties: {
          get: [],
          save: []
        }
      }
    });
  });

  it("should handle stream properties in orchestration properties", () => {
    const definitionMap: DefinitionMap = new DefinitionMap();
    const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

    const streamProperty = new Property(
      "streamProperty",
      new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary),
      "Stream property description",
      false,
      false
    );

    definitionMap.EntityMap.set(
      "namespace.entityWithStream",
      new EntityType("entityWithStream", undefined, false, undefined, false, true, [streamProperty], [])
    );

    entityTypes.set("namespace.entityWithStream", {
      Name: "namespace.entityWithStream",
      RootUri: "/entityWithStream",
      OrchestrationProperties: {
        Save: [{
          Name: "streamProperty",
          OrchestrationType: OrchestrationType.BinaryStream,
          UrlPattern: "/content",
          HttpMethod: "PUT"
        }]
      }
    } as EntityTypeConfig);

    const config = {
      EntityTypes: entityTypes,
      MetadataFilePath: "https://example.com",
      APIVersion: "beta",
    } as Config;

    const metadata = writeMetadata(definitionMap, config);

    expect(metadata["entityWithStream"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: false,
        isContainment: false,
        orchestrationProperties: {
          get: [],
          save: [
            {
              httpMethod: "PUT",
              name: "streamProperty",
              orchestrationType: "binaryStream",
              urlPattern: "/streamProperty/content"
            }
          ]
        }
      }
    });
  });

  describe("singleton support", () => {
    it("should include singleton properties in metadata when IsSingleton is true", () => {
      const definitionMap: DefinitionMap = new DefinitionMap();
      const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

      definitionMap.EntityMap.set(
        "microsoft.graph.admin",
        new EntityType("admin", undefined, false, undefined, false, false, [], [])
      );

      entityTypes.set("microsoft.graph.admin", {
        Name: "microsoft.graph.admin",
        Upsertable: true,
        RootUri: "/admin",
        IsSingleton: true,
        PathSegmentName: "admin",
        EntitySetPath: "admin",
        NavigationProperty: [],
      } as EntityTypeConfig);

      const config = {
        EntityTypes: entityTypes,
        MetadataFilePath: "https://example.com",
        APIVersion: "beta",
      } as Config;

      const metadata = writeMetadata(definitionMap, config);

      expect(metadata["admin"]).toBeDefined();
      expect(metadata["admin"]["beta"].isSingleton).toBe(true);
      expect(metadata["admin"]["beta"].pathSegmentName).toBe("admin");
      expect(metadata["admin"]["beta"].entitySetPath).toBe("admin");
    });

    it("should not include singleton properties when IsSingleton is false", () => {
      const definitionMap: DefinitionMap = new DefinitionMap();
      const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

      definitionMap.EntityMap.set(
        "microsoft.graph.user",
        new EntityType("user", undefined, false, undefined, false, false, [], [])
      );

      entityTypes.set("microsoft.graph.user", {
        Name: "microsoft.graph.user",
        Upsertable: true,
        RootUri: "/users",
        IsSingleton: false,
        NavigationProperty: [],
      } as EntityTypeConfig);

      const config = {
        EntityTypes: entityTypes,
        MetadataFilePath: "https://example.com",
        APIVersion: "beta",
      } as Config;

      const metadata = writeMetadata(definitionMap, config);

      expect(metadata["users"]).toBeDefined();
      expect(metadata["users"]["beta"].isSingleton).toBe(false);
      expect(metadata["users"]["beta"].pathSegmentName).toBeUndefined();
    });

    it("should include resourceKey with omitInPayload when configured", () => {
      const definitionMap: DefinitionMap = new DefinitionMap();
      const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

      definitionMap.EntityMap.set(
        "microsoft.graph.domainRegistration",
        new EntityType("domainRegistration", undefined, false, undefined, false, false, [], [])
      );

      entityTypes.set("microsoft.graph.domainRegistration", {
        Name: "microsoft.graph.domainRegistration",
        Upsertable: true,
        RootUri: "/applications/domainRegistration",
        IsSingleton: true,
        PathSegmentName: "domainRegistration",
        EntitySetPath: "applications/domainRegistration",
        ResourceKey: {
          Name: "name",
          OmitInPayload: true
        },
        NavigationProperty: [],
      } as EntityTypeConfig);

      const config = {
        EntityTypes: entityTypes,
        MetadataFilePath: "https://example.com",
        APIVersion: "beta",
      } as Config;

      const metadata = writeMetadata(definitionMap, config);

      expect(metadata["applications/domainRegistration"]).toBeDefined();
      expect(metadata["applications/domainRegistration"]["beta"].isSingleton).toBe(true);
      expect(metadata["applications/domainRegistration"]["beta"].pathSegmentName).toBe("domainRegistration");
      expect(metadata["applications/domainRegistration"]["beta"].resourceKey).toEqual({
        name: "name",
        omitInPayload: true
      });
    });

    it("should skip internal entities when IsInternal is true", () => {
      const definitionMap: DefinitionMap = new DefinitionMap();
      const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

      definitionMap.EntityMap.set(
        "microsoft.graph.internalEntity",
        new EntityType("internalEntity", undefined, false, undefined, false, false, [], [])
      );

      entityTypes.set("microsoft.graph.internalEntity", {
        Name: "microsoft.graph.internalEntity",
        Upsertable: true,
        RootUri: "/internalEntities",
        IsInternal: true,
        NavigationProperty: [],
      } as EntityTypeConfig);

      const config = {
        EntityTypes: entityTypes,
        MetadataFilePath: "https://example.com",
        APIVersion: "beta",
      } as Config;

      const metadata = writeMetadata(definitionMap, config);

      expect(metadata["internalEntities"]).toBeUndefined();
    });

    it("should include internal entity in metadata when IsInternal is false", () => {
      const definitionMap: DefinitionMap = new DefinitionMap();
      const entityTypes: Map<string, EntityTypeConfig> = new Map<string, EntityTypeConfig>();

      definitionMap.EntityMap.set(
        "microsoft.graph.publicEntity",
        new EntityType("publicEntity", undefined, false, undefined, false, false, [], [])
      );

      entityTypes.set("microsoft.graph.publicEntity", {
        Name: "microsoft.graph.publicEntity",
        Upsertable: true,
        RootUri: "/publicEntities",
        IsInternal: false,
        NavigationProperty: [],
      } as EntityTypeConfig);

      const config = {
        EntityTypes: entityTypes,
        MetadataFilePath: "https://example.com",
        APIVersion: "beta",
      } as Config;

      const metadata = writeMetadata(definitionMap, config);

      expect(metadata["publicEntities"]).toBeDefined();
      expect(metadata["publicEntities"]["beta"]).toBeDefined();
    });
  });
});

import { Config, EntityTypeConfig } from "../src/config";
import { DefinitionMap } from "../src/definitions/DefinitionMap";
import { EntityType } from "../src/definitions/EntityType";
import { writeMetadata } from "../src/metadataWriter";

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
      }
    });
  });

  it("should correctly write upsertable and updatable", () => {
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
      }
    });

    expect(metadata["entityUpdatable"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: true,
        isContainment: false,
      }
    });

    expect(metadata["entityNotUpdatable"]).toEqual({
      beta: {
        isIdempotent: false,
        updatable: false,
        isContainment: false,
      }
    });
  });
});

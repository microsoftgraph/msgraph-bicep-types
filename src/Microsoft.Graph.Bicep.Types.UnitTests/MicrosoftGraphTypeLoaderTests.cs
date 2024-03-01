// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;
using System.Linq;
using System.Collections.Generic;
using Azure.Bicep.Types.Concrete;

namespace Microsoft.Graph.Bicep.Types.UnitTests
{
    [TestClass]
    public class MicrosoftGraphTypeLoaderTests
    {
        private IReadOnlySet<string> availableTypes = new HashSet<string>
        {
            "Microsoft.Graph/applications@beta",
            "Microsoft.Graph/servicePrincipals@beta",
            "Microsoft.Graph/groups@beta",
            "Microsoft.Graph/appRoleAssignedTo@beta",
            "Microsoft.Graph/oauth2PermissionGrants@beta",
            "Microsoft.Graph/applications/federatedIdentityCredentials@beta",
        };

        private IReadOnlyDictionary<string, string> typesWithRequiredKey = new Dictionary<string, string>
        {
            ["Microsoft.Graph/applications@beta"] = "uniqueName",
            ["Microsoft.Graph/groups@beta"] = "uniqueName",
            ["Microsoft.Graph/servicePrincipals@beta"] = "appId",
            ["Microsoft.Graph/applications/federatedIdentityCredentials@beta"] = "name",
        };

        private IReadOnlyDictionary<string, string> typesWithConstantKey = new Dictionary<string, string>
        {
            ["Microsoft.Graph/applications@beta"] = "uniqueName",
            ["Microsoft.Graph/groups@beta"] = "uniqueName",
        };

        private IReadOnlySet<string> directoryObjects = new HashSet<string>
        {
            "Microsoft.Graph/applications@beta",
            "Microsoft.Graph/servicePrincipals@beta",
            "Microsoft.Graph/groups@beta",
        };

        [TestMethod]
        public void MSGraphTypeLoader_can_load_all_types_without_throwing()
        {
            var typeLoader = new MicrosoftGraphTypeLoader();
            var index = typeLoader.LoadTypeIndex();

            index.Resources.Keys.Should().NotBeEmpty();

            foreach (var kvp in index.Resources)
            {
                var resourceType = typeLoader.LoadResourceType(kvp.Value);
            }

            foreach (var (resourceType, functionsByApiVersion) in index.ResourceFunctions)
            {
                foreach (var (apiVersion, functions) in functionsByApiVersion)
                {
                    foreach (var functionLocation in functions)
                    {
                        var resourceFunctionType = typeLoader.LoadResourceFunctionType(functionLocation);
                    }
                }
            }
        }

        [TestMethod]
        public void MSGraphTypeLoader_can_load_resources_and_properties()
        {
            var typeLoader = new MicrosoftGraphTypeLoader();
            var index = typeLoader.LoadTypeIndex();

            foreach (var kvp in index.Resources)
            {
                availableTypes.Should().Contain(kvp.Key);

                var resourceType = typeLoader.LoadResourceType(kvp.Value);
                resourceType.Body.Should().NotBeNull();

                var objectType = resourceType.Body.Type as ObjectType;
                objectType.Should().NotBeNull();

                // check count of properties in body type
                var properties = objectType!.Properties;
                properties.Should().NotBeNull();
                properties.Should().HaveCountGreaterThan(4); // Should at least have id, <identifier>, type, and apiVersion

                // Check identifiers has correct flags
                if (typesWithRequiredKey.ContainsKey(kvp.Key))
                {
                    var identifier = typesWithRequiredKey[kvp.Key];
                    var expectedFlags = typesWithConstantKey.ContainsKey(kvp.Key)
                        ? ObjectTypePropertyFlags.Required | ObjectTypePropertyFlags.DeployTimeConstant
                        : ObjectTypePropertyFlags.Required;

                    properties[identifier].Flags.Should().HaveFlag(expectedFlags);
                }

                // Check directory objects have "id" and "deletedDateTime" properties
                if (directoryObjects.Contains(kvp.Key))
                {
                    properties["id"].Flags.Should().HaveFlag(ObjectTypePropertyFlags.ReadOnly);
                    properties["deletedDateTime"].Flags.Should().HaveFlag(ObjectTypePropertyFlags.ReadOnly);
                }
            }
        }

        [TestMethod]
        public void MSGraphTypeLoader_type_keys_are_insensitively_unique()
        {
            var typeLoader = new MicrosoftGraphTypeLoader();
            var index = typeLoader.LoadTypeIndex();

            index.Resources.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            index.ResourceFunctions.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            foreach (var functionsByApiVersion in index.ResourceFunctions.Values)
            {
                functionsByApiVersion.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            }
        }
    }
}

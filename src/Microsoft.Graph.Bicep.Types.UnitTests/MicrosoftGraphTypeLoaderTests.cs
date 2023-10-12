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
        };

        private IReadOnlySet<string> typesWithRequiredName = new HashSet<string>
        {
            "Microsoft.Graph/applications@beta",
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

            foreach (var (resourceType, functionsByApiVersion) in index.Functions)
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
                properties.Should().HaveCountGreaterThan(4); // Should at least have id, name, type, and apiVersion

                var nameFlags = typesWithRequiredName.Contains(kvp.Key) ? ObjectTypePropertyFlags.Required | ObjectTypePropertyFlags.DeployTimeConstant : ObjectTypePropertyFlags.None;
                properties["name"].Flags.Should().HaveFlag(nameFlags);
            }
        }

        [TestMethod]
        public void MSGraphTypeLoader_type_keys_are_insensitively_unique()
        {
            var typeLoader = new MicrosoftGraphTypeLoader();
            var index = typeLoader.LoadTypeIndex();

            index.Resources.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            index.Functions.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            foreach (var functionsByApiVersion in index.Functions.Values)
            {
                functionsByApiVersion.Keys.Select(x => x.ToLowerInvariant()).Should().OnlyHaveUniqueItems();
            }
        }
    }
}

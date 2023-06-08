// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using Azure.Bicep.Types;
using Azure.Bicep.Types.Concrete;

namespace Microsoft.Graph.Bicep.Types
{
    public class MicrosoftGraphTypeLoader : TypeLoader
    {
        protected override Stream GetContentStreamAtPath(string path)
        {
            var fileStream = typeof(MicrosoftGraphTypeLoader).Assembly.GetManifestResourceStream($"{path}.deflated");
            if (fileStream is null)
            {
                throw new ArgumentException($"Unable to locate manifest resource at path {path}", nameof(path));
            }

            return new DeflateStream(fileStream, CompressionMode.Decompress);
        }
    }
}

   
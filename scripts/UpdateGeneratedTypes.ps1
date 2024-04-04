# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

<#
.Synopsis
    Update the generated Bicep types and Swagger spec.
.Description
    Update the generated Bicep types and Swagger spec by updating the latest msgraph metadata
    and running the generation scripts.
#>

$SwaggerGenerationPrefix = "./src/swagger-generation"
$GeneratorPrefix = "./src/generator"
$AutorestPrefix = "./src/autorest.bicep"

# Build bicep-types
# Write-Host "Building bicep-types"
# Push-Location bicep-types/src/bicep-types
# npm ci
# npm run build
# Pop-Location
# Write-Host "bicep-types successfully built"

# # Update msgraph-metadata submodule
# Write-Host "Updating msgraph-metadata submodule"
# git submodule update --recursive --remote msgraph-metadata
# Write-Host "msgraph-metadata submodule successfully updated"

# Build autorest
Write-Host "Building Autorest"
npm ci --prefix $AutorestPrefix
npm run --prefix $AutorestPrefix build
Write-Host "Autorest successfully built"

# Generate Swagger spec
Write-Host "Generating Swagger spec"
npm ci --prefix $SwaggerGenerationPrefix
npm run --prefix $SwaggerGenerationPrefix start -- --output=C:\Git\msgraph-bicep-types\swagger\specification\microsoftgraph\resource-manager\microsoftgraph\preview
Write-Host "Swagger spec successfully generated"

# Generate Bicep types
Write-Host "Generating Bicep types"
npm ci --prefix $GeneratorPrefix
npm run --prefix $GeneratorPrefix generate -- --specs-dir ..\..\swagger\ --single-path microsoftgraph
write-Host "Bicep types successfully generated"
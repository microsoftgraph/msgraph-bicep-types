This document describes the steps to setup development tools and run Bicep types generation locally.

## Directory Structure

`generated`: Generated artifacts, including types and index. See [/generated/index.md](../generated/index.md) for a searchable list of all the available types. You can view individual type definitions by clicking on api versions.

`src`: Source code for autorest, type generation script, and the type loader

`swagger/specification`: Swagger API Specification for Microsoft Graph resources

`msgraph-metadata`: A submodule that links to the microsoftgraph/msgraph-metadata repo, which contains all the latest sanitized versions of the metadata (including descriptions, annotations and errors)

## Running Generation Locally

### Initial Setup

1. Clone this repo
1. Create a new branch 
1. Check out submodules:

    ```sh
    git submodule update --init --recursive
    ```

1. Build the `bicep-types` dependency:

    ```sh
    pushd bicep-types/src/bicep-types
    npm ci
    npm run build
    popd
    ```

1. Build the autorest extension code:

    ```sh
    cd src/autorest.bicep
    npm ci
    npm run build
    ```

1. Change to the generator directory, and install dependencies:

    ```sh
    cd ../generator
    npm ci
    ```

### Update the YML config files, if necessary

If you are adding new types or changing property annotations like `readOnly` or `required`, you'll need to update the yml config that controls what is generated.

```sh
cd  ../swagger-generation/configs
```

Create new yml files (following the existing naming convention and a new semantic version) under the `beta` and `v1.0` folders.
Edit the new yml files, with new types, properties and/or property annotation changes.

### Configure which versions need generation

1. Update extensionConfig

    From the root folder `/msgraph-bicep-types`

    ```sh
    notepad  src/extensionConfigs/extensionConfig.json
    ```

    Update the version numbers and save the file.

1. Add the new swagger version file names (to be generated in the next step).
From the root folder `/msgraph-bicep-types`

    ```sh
    notepad  swagger/specification/microsoftgraph/preview/readme.md
    ```

    Edit the YML `input-file` sections to append the latest versions for beta and v1.0. Something like:

    ```yml
    input-file:
        - microsoftgraph/preview/beta/0.1.8-preview.json
        - microsoftgraph/preview/beta/0.1.9-preview.json   <-- appending new version

    input-file:
        - microsoftgraph/preview/v1.0/0.1.8-preview.json
        - microsoftgraph/preview/v1.0/0.1.9-preview.json   <-- appending new version
    ```

### Run the generation for Microsoft Graph resources

1. Generate the swagger files based on metadata and the yml config files

    ```sh
    pushd src/swagger-generation
    npm install
    npm run start "--" --output=../../swagger/specification/microsoftgraph/resource-manager/microsoftgraph/preview
    popd
    ```

1. Generate the rest of the Microsoft Graph bicep resources

    ```sh
    cd src/generator
    npm run generate "--" --specs-dir ..\..\swagger\ --single-path microsoftgraph
    ```



> **NOTE:** To see other available generation parameters, including debugging options:
>
> ```sh
> npm run generate -- --help
> ```

### New generated types

After running the scripts, the new types will be available in [/generated](./generated) folder.

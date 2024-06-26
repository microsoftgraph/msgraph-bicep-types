This document describes the steps to setup development tools and run Bicep types generation locally.

## Directory Structure

`generated`: Generated artifacts, including types and index. See [/generated/index.md](./generated/index.md) for a searchable list of all the available types. You can view individual type definitions by clicking on api versions.

`src`: Source code for autorest, type generation script, and the type loader

`swagger/specification`: Swagger API Specification for Microsoft Graph resources

## Running Generation Locally
### Initial Setup
1. Clone this repo
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

### Running
- To run generation for Microsoft Graph resources:
    ```sh
    npm run generate -- --specs-dir ..\..\swagger\ --single-path microsoftgraph
    ```
    The types should be available in [/generated](./generated)

- To see other available generation parameters, including debugging options:
    ```sh
    npm run generate -- --help
    ```

## Adding New Types
1. Update the entities and properties in [config-beta.yml](src\swagger-generation\config-beta.yml) and [config-v1.0.yml](src\swagger-generation\config-beta.yml)

1. Follow steps in [Running Generation Locally](#running-generation-locally), and new types will be available in [/generated](./generated)

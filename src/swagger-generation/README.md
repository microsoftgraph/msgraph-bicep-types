# Swagger Types Auto Generation Tool

## Description

This tool is used to generate a swagger file that contains types extracted from the Microsoft Graph public metadata CSDL. This tool is written in TypeScript.

## Usage

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 18 or higher.
- [npm](https://www.npmjs.com/) version 9 or higher.

### Installation

1. Clone the repository.
2. Switch to the `swagger-generation` directory.
3. Run `npm install`.

### Running the tool

1. Switch to the `swagger-generation` directory.
2. Open `config.yml` and change the settings as needed.
2. Run `npm run start`.

### Configuration

The configuration file is `config.yml`. The following settings are available:

- `url` (required): The URL of the Microsoft Graph metadata CSDL.
- `apiVersion` (required): The API version of the Microsoft Graph swagger file. This value is entirely up to you. It's for documentation purposes only.
- `EntityTypes` (required): A list of entity types to be included in the swagger file. The value of each item is the namespaced name of the entity type. All complex type explorations will be done using these entity types as root.
  - `RootUri` (optional): The root URI of the entity type. This value is used to generate the `basePath` of the swagger file. If missing, entities won't be exposed.
  - `AvailableProperty` (optional): A list of properties which will become available in the generated types. If missing, all properties will be available.
  - `NavigationPropertiesMode` (optional): Accepts two modes: Allow and Ignore. If set to Allow, navigation properties listed will be the ones generated; if the list is empty or doesn't exist, no Navigation Properties will be generated. If set to Ignore, navigation properties listed will be the only ones not generated; if the list is empty or doesn't exist, all navigation properties will be generated. The default behavior of this option is Allow.
  - `NavigationProperties` (optional): A list of navigation properties which will follow the behavior specified above. All values must be valid navigation properties of the entity type.
  - `RequiredOnWrite` (optional): A list of properties that are required when writing the entity type. All values must be valid properties of the entity type.
  - `ReadOnly` (optional): A list of properties that are read-only. All values must be valid properties of the entity type.

### Output

The output of the tool is a swagger file named `microsoftgraph-beta.json` in the `output` directory. The file is formatted and indented for readability.

## Development

For the following instructions its assumed that you already configured your environment as described in the [Installation](#installation) section.

### Debugging and testing

1. Switch to the `swagger-generation` directory.
2. Run `npm test`

To run a single test suite:
`npm test -- --testNamePattern="<test-suite-description>"`

### Analyzing test coverage

1. Switch to the `swagger-generation` directory.
2. Run `npm test -- --coverage`

### Linting

1. Switch to the `swagger-generation` directory.
2. Run `npm run lint`

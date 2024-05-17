# Contributing to the Microsoft Graph Bicep Extension
Thanks for considering making a contribution! We are happy to accept community contributions to the Microsoft Graph Bicep extension. There are a few different recommended paths to make contributions.

## File Issues
The best way to get started with a contribution is to start a dialog with us. Sometimes features will be under development or out of scope for this project and it's best to check before starting work on contribution, especially for large work items.

### New Microsoft Graph Bicep Type Requests

* Please first search existing "new type" requests [here](https://github.com/microsoftgraph/msgraph-bicep-types/labels/new%20type) before opening an issue, to see if the new type has already been requested. If it has already been requested, please indicate your interest by adding a "thumbs-up" to the item. This will be used to help prioritize the request. Also feel free to leave any further clarifying comments.
* Ensure you have included the scenarios that the new Microsoft Graph Bicep type is used for.
* Use the "New Microsoft Graph Bicep type request" issue template [here](https://github.com/microsoftgraph/msgraph-bicep-types/issues/new/choose) to submit your request.

### Feature Suggestions

* Please first search [Open Issues](https://github.com/microsoftgraph/msgraph-bicep-types/issues) before opening an issue to check whether your feature has already been suggested. If it has, feel free to add your own comments to the existing issue.
* Ensure you have included a "What?" - what your feature entails, being as specific as possible, and giving mocked-up syntax examples where possible.
* Ensure you have included a "Why?" - what the benefit of including this feature will be.
* Use the "Feature Request" issue template [here](https://github.com/microsoftgraph/msgraph-bicep-types/issues/new/choose) to submit your request.

### Bug Reports

* Please first search [Open Issues](https://github.com/microsoftgraph/msgraph-bicep-types/issues) before opening an issue, to see if it has already been reported.
* Try to be as specific as possible, including the version of the Bicep CLI used to reproduce the issue, and any example files or snippets of Bicep code needed to reproduce it.
* Include deployment correlation id, Microsoft Graph client request id, and deployment timestamp if it's related to deployment failures.
* Use the "Bug Report" issue template [here](https://github.com/microsoftgraph/msgraph-bicep-types/issues/new/choose) to submit your request.

## Add Quickstart Examples

All quickstart template examples containing Microsoft Graph Bicep types are under [./quickstart-templates](./quickstart-templates). If you would like to contribute to the collection of quickstart examples:

* Fork this repo and checkout locally.
* Create a new folder for your templates under [./quickstart-templates](./quickstart-templates). The folder name should summarize the scenario.
* Add a `README.md` file to describe the scenario and provide instructions to deploy the template.
* Submit a PR against the `main` branch of this repo for review
# Grant a client app access to a resource app

> **Note1**: Minimum Bicep version required to deploy this quickstart template is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).

> **Note2**: This template depends on a successful deployment of [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/)

This template allows you to grant client app access to resource application by assigning the app role in the resource app to the client app.

* The id for the app role can be passed in as a parameter. It needs to be the same as the app role id deployed in the [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/) example.

You can deploy the template with the following Azure CLI command (replace `<resource-group>`, `<app-role-id>` with the necessary values for your deployment):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters appRoleId='<app-role-id>'
```

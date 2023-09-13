# Create client and resource apps

This template allows you to create a client application and a resource application, along with their service principals.

* The client application is created with an optional key credential. The key can be passed in as a parameter. [Get The Certificate Key](https://learn.microsoft.com/en-us/graph/applications-how-to-add-certificate?tabs=http#get-the-certificate-key) mentions the steps to get the certificate key
* The resource application is created with an optional app role. The id for the app role can be passed in as a parameter.

You can deploy the template with the following Azure CLI command (replace `<resource-group>`, `<app-role-id>` and `<cert-key>` with the necessary values for your deployment):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters appRoleId='<app-role-id>' certKey='<cert-key>'
```
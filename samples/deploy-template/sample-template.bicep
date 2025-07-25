extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Simple template that creates an Entra application and an Entra group.
   This is used as an sample template to test template deployment of Microsoft Graph resources
   via a dotnet console application.
*/

param date string = '2025-07-28'
param appDisplayName string = 'sampleApp'
param groupDisplayName string = 'sampleGroup'
param app string= 'sampleApp'
param group string = 'sampleGroup'

// create basic Entra application
resource myApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: appDisplayName == null ? '${app}-${date}' :'${appDisplayName}-${date}'
  uniqueName: uniqueString(app, date)
}

// create basic Entra group
resource myGroup 'Microsoft.Graph/groups@v1.0' = {
  displayName: groupDisplayName == null ? '${group}-${date}' :'${groupDisplayName}-${date}'
  uniqueName: uniqueString(group, date)
  mailNickname: uniqueString(group, date)
  mailEnabled: false
  securityEnabled: true
}

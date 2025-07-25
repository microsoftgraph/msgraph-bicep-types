extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Simple template that demonstrates creating an Entra application
   with a logo.

   It reads back the logo CDN location from application.info.logoUrl.
   NOTE: there's a delay until the logo CDN location is set on the app
   so you may see the "Not yet set" response.
*/

param date string
param displayName string?

var app = 'myApp'

var logoImage = loadFileAsBase64('./logoImageFile.png')

resource clientApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: displayName == null ? '${app}-${date}' :'${displayName}-${app}-${date}'
  uniqueName: uniqueString(app, date)
  logo: logoImage
}

output appName string = clientApp.displayName
output logoUrl string = clientApp.info.logoUrl == null ? 'Not yet set' : clientApp.info.logoUrl

using './main.bicep'

param shortEnvironmentName = 'prod'
param keyVaultNamePrefix = 'keyVault'
param tags = {
  tag: shortEnvironmentName
}
param keysPermissions = [
  'list'
]
param secretsPermissions = [
  'list'
  'get'
]
param identityName = 'managedIdentityForKV-${uniqueString(keyVaultNamePrefix)}'
param certificatesPermissions = [
  'get'
  'list'
  'update'
  'create'
]
param certificateName = 'cert20240322-${uniqueString(keyVaultNamePrefix)}'
param clientAppName = 'ClientAppKVCert'
param subjectName = 'CN=contoso.com'

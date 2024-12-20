using './main.bicep'

param myWorkloadManagedIdentity = '[MANAGED-IDENTITY-NAME]'
param applicationDisplayName = '[APPLICATION-DISPLAY-NAME]'
param applicationName = '[APPLICATION-UNIQUE-NAME]'
param cloudEnvironment = 'publicCloud'
param graphRoles = ['Group.Read.All']


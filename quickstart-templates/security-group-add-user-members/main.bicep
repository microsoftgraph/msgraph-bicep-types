extension microsoftGraphV1

// TEMPLATE OVERVIEW:
// Creates a security group and adds the referenced users as members.
// The user list are in a txt file, with each user's UPN on a separate line.
// Replace example userlist.txt file values with user UPNs from your tenant.
// The group members are added using replace semantics overwriting any
// existing group members.

@description('Today\'s date used to configure a unique daily app name')
param date string

// File name/path must be a compile time constant, so this cannot be a param
var userListFilename = 'userlist.txt'

// Load a text file with a list of users separated by newlines
var upnListFromFile = loadTextContent(userListFilename)
var upnList = split(upnListFromFile,'\r\n')
var upnListLength = length(upnList)

var groupName = 'sg-${date}-${uniqueString(deployer().objectId, 'group')}'

// create a users object list, looking up by the list of UPNs
// Referencing a user resource that doesn't exist results in a "NotFound" error and deployment failure.
// Check the name and scope of the resource you're trying to reference. 
// See https://learn.microsoft.com/azure/azure-resource-manager/bicep/existing-resource
resource userList 'Microsoft.Graph/users@v1.0' existing = [for upn in upnList: {
  userPrincipalName: upn
}]

// create security group and add user list as members
resource group 'Microsoft.Graph/groups@v1.0' = {
  displayName: groupName
  mailEnabled: false
  mailNickname: uniqueString(groupName)
  securityEnabled: true
  uniqueName: groupName
  members: {
    relationshipSemantics: 'replace'
    relationships: [for i in range(0, upnListLength): userList[i].id]
  }
}

// outputs
output addedUserList array = upnList
output groupName string = group.displayName
output groupId string = group.id
output groupMembers array = group.members.relationships

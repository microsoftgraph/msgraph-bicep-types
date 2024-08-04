# Create Workload Identity Federation That Can Create Other Workload Identity Federations

## The Idea

Restrict and limit the need to use high privileges to create resources.

## Objective

A high-privilege user creates an initial workload identity federation token between Azure and a certain GitHub repository. The workload in this repository is then allowed to access Microsoft Entra to create further workload identity federation tokens and assign them to other repositories.

## Benefits

- **Enhanced Security:** Restricting high-privilege usage reduces the attack surface and potential for unauthorized access.
- **Scalability:** Facilitates the growth of projects by enabling the creation of new identity federations as needed.
- **Efficient Management:** Streamlines the process of managing resource access across multiple projects and teams.


```sh
az deployment tenant create --template-file main.bicep
```

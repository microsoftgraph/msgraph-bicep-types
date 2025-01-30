# MicrosoftGraph

> see https://aka.ms/autorest

## Getting Started

To build the SDK for MicrosoftGraph, simply [Install AutoRest](https://aka.ms/autorest/install) and in this folder, run:

> `autorest`

To see additional help and options, run:

> `autorest --help`

---

## Configuration

### Basic Information

These are the global settings for the MicrosoftGraph API.

``` yaml
title: MicrosoftGraph
description: MicrosoftGraph
openapi-type: arm
```

### Tag: microsoftgraph-preview

These settings apply only when `--tag=microsoftgraph-preview` is specified on the command line.

```yaml $(tag) == 'microsoftgraph-beta'
input-file: 
  - microsoftgraph/preview/beta/0.1.7-preview.json
  - microsoftgraph/preview/beta/0.1.8-preview.json
  - microsoftgraph/preview/beta/0.1.9-preview.json
  - microsoftgraph/preview/beta/0.1.10-preview.json
```

```yaml $(tag) == 'microsoftgraph-v1.0'
input-file: 
  - microsoftgraph/preview/v1.0/0.1.7-preview.json
  - microsoftgraph/preview/v1.0/0.1.8-preview.json
  - microsoftgraph/preview/v1.0/0.1.9-preview.json
  - microsoftgraph/preview/v1.0/0.1.10-preview.json
```

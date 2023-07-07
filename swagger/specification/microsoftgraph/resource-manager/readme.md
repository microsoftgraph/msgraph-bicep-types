# MicrosoftGraph

> see https://aka.ms/autorest

This is the AutoRest configuration file for Radius.

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

### Tag: microsoftgraph-2022-06-15-preview

These settings apply only when `--tag=microsoftgraph-2023-06-15-preview` is specified on the command line.

```yaml $(tag) == 'microsoftgraph-2023-06-15-preview'
input-file: 
  - microsoftgraph/preview/2023-06-15-preview/microsoftgraph-v1.0.json
  - microsoftgraph/preview/2023-06-15-preview/microsoftgraph-beta.json
```
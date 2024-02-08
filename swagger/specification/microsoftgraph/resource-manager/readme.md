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

### Tag: microsoftgraph-preview

These settings apply only when `--tag=microsoftgraph-preview` is specified on the command line.

```yaml $(tag) == 'microsoftgraph-beta'
input-file: 
  - microsoftgraph/preview/beta/microsoftgraph-beta.json
```

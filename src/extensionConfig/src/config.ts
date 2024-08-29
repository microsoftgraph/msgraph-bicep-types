// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export enum ApiVersion {
  Beta = "beta",
  V1_0 = "v1.0",
}

export interface apiExtensionConfig {
  name: string;
  version: string;
}

export interface apiExtenisonConfigMap {
  [key: string]: apiExtensionConfig;
}

export const extensionConfig: apiExtenisonConfigMap = require('./extensionConfig.json');
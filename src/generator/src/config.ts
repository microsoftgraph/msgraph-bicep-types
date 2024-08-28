// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export interface apiExtensionConfig {
  name: string;
  version: string;
}

export interface apiExtenisonConfigMap {
  [key: string]: apiExtensionConfig;
}

export const extensionConfig: apiExtenisonConfigMap = require('./extensionConfig.json');
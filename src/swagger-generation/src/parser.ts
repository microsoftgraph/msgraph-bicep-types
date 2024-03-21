// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import { parseStringPromise } from 'xml2js'
import { CSDL } from './definitions/RawTypes'

export const parseXML = async (metadataFilePath: string): Promise<CSDL> => {
  const xmlText = fs.readFileSync(
    `../../msgraph-metadata/${metadataFilePath}`,
    'utf8'
  );

  // To object
  const obj: Promise<CSDL> = parseStringPromise(xmlText);

  return obj;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import { parseStringPromise } from 'xml2js'
import { CSDL } from './definitions/RawTypes'

export const parseXML = async (apiVersion: string): Promise<CSDL> => {
  console.log(`Fetching MSGraph metadata CSDL for ${apiVersion}`);

  const xmlText = fs.readFileSync(
    `../../msgraph-metadata/clean_${apiVersion}_metadata/cleanMetadataWithDescriptionsAndAnnotations${apiVersion}.xml`,
    'utf8'
  );

  // To object
  const obj: Promise<CSDL> = parseStringPromise(xmlText);

  return obj;
}

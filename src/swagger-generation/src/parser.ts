// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import { parseStringPromise } from 'xml2js'
import { CSDL } from './definitions/RawTypes'

export const parseXML = async (source: string): Promise<CSDL> => {
  console.log(`Fetching MSGraph metadata CSDL from ${source}`);

  let xmlText: string;

  try {
    const text: Response = await fetch(source);
    xmlText = await text.text();
  } catch (error) {
    console.log(`Error fetching from ${source}: ${error}`);
    console.log(`Reading from local file instead`);
    xmlText = fs.readFileSync(`./msgraph-metadata/beta-Prod.csdl`, 'utf8');
  }

  // To object
  const obj: Promise<CSDL> = parseStringPromise(xmlText);

  return obj;
}

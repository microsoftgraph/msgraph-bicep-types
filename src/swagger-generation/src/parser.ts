// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseStringPromise } from 'xml2js'
import { CSDL } from './definitions/RawTypes'

export const parseXML = async (source: string): Promise<CSDL> => {
  const text: Response = await fetch(source)
  const xml: string = await text.text()
  // To object
  const obj: Promise<CSDL> = parseStringPromise(xml)

  return obj
}

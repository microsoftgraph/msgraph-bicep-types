// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Library imports
import {parseStringPromise} from 'xml2js'

export const parseXML = async (source: string): Promise<any> => {
    const text: Response = await fetch(source)
    const xml: string = await text.text()
    // To object
    const obj: any = parseStringPromise(xml)
    
    return obj
}
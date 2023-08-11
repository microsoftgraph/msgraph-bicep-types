// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Member } from "./Member";

export interface EnumType { 
    Name: string,
    UnderlyingType: string,
    IsFlags?: boolean,
    Member: Member[]
}
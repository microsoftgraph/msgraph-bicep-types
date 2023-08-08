// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Member } from "./Member";

export interface EnumType extends Object { 
    Name: string,
    UnderlyingType: string,
    IsFlags?: boolean,
    Member: Member[]
}
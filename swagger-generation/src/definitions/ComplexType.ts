// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComplexTypeProperty } from "./ComplexTypeProperty";
import { NavigationProperty } from "./NavigationProperty";

export interface ComplexType { 
    Name: string,
    BaseType?: boolean,
    Abstract?: boolean,
    OpenType?: boolean,
    Property: ComplexTypeProperty[]
    NavigationProperty: NavigationProperty[]
}
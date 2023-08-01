// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";

export class NavigationProperty extends Property{
    ContainsTarget?: boolean;
    
    constructor(name: string, type: string, nullable: boolean, containsTarget: boolean){
        super(name, type, nullable);
        this.ContainsTarget = containsTarget;
    }
}

exports.NavigationProperty = NavigationProperty;
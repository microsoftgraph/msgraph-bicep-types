// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";

export class NavigationProperty extends Property{
    ContainsTarget?: boolean;
    
    constructor(name: string, type: string, nullable: boolean | undefined, readonly: boolean | undefined, containsTarget: boolean | undefined){
        super(name, type, nullable, readonly);
        this.ContainsTarget = containsTarget;
    }
}
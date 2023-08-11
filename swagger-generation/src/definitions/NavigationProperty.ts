// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";

export class NavigationProperty extends Property{
    ContainsTarget?: boolean;
    
    constructor(name: string, type: string, required: boolean | undefined, nullable: boolean | undefined, readonly: boolean | undefined, containsTarget: boolean | undefined){
        super(name, type, required, nullable, readonly);
        this.ContainsTarget = containsTarget;
    }
}
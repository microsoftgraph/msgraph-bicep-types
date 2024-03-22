// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Property } from "./Property";
import { CollectionProperty } from "./CollectionProperty";

export class NavigationProperty extends Property{
    ContainsTarget?: boolean;
    
    constructor(name: string, type: string | CollectionProperty, description: string, nullable: boolean | undefined, readonly: boolean | undefined, containsTarget: boolean | undefined){
        super(name, type, description, nullable, readonly);
        this.ContainsTarget = containsTarget;
    }
}
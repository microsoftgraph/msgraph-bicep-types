// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrimitiveSwaggerType } from "./PrimitiveSwaggerType";

export class Property extends Object{
    Name: string;
    Type: PrimitiveSwaggerType | string;
    Required?: boolean;
    Nullable?: boolean;
    ReadOnly?: boolean;
    
    constructor(name: string, type: PrimitiveSwaggerType | string, required: boolean | undefined, nullable: boolean | undefined, readonly: boolean | undefined){
        super();
        this.Name = name;
        if(type as PrimitiveSwaggerType){
            this.Type = type as PrimitiveSwaggerType
        } else {
            this.Type = type.toString();
        }
        
        this.Required = required;
        this.Nullable = nullable;
        this.ReadOnly = readonly;
    }
}
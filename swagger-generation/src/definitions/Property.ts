// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType";

export class Property extends Object{
    Name: string;
    Type: PrimitiveSwaggerTypeStruct | string;
    Required?: boolean;
    Nullable?: boolean;
    ReadOnly?: boolean;
    
    constructor(name: string, type: PrimitiveSwaggerTypeStruct | string, required: boolean | undefined, nullable: boolean | undefined, readonly: boolean | undefined){
        super();
        this.Name = name;
        if(type as PrimitiveSwaggerTypeStruct){
            this.Type = type as PrimitiveSwaggerTypeStruct;
        } else {
            this.Type = type.toString();
        }
        
        this.Required = required;
        this.Nullable = nullable;
        this.ReadOnly = readonly;
    }
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CollectionProperty } from "./CollectionProperty";
import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType";

export class Property extends Object{
    Name: string;
    Type: PrimitiveSwaggerTypeStruct | CollectionProperty | string;
    Required?: boolean;
    Nullable?: boolean;
    ReadOnly?: boolean;
    
    constructor(name: string, type: PrimitiveSwaggerTypeStruct | CollectionProperty| string, required: boolean | undefined, nullable: boolean | undefined, readonly: boolean | undefined){
        super();
        this.Name = name;
        if(type instanceof PrimitiveSwaggerTypeStruct){
            this.Type = type as PrimitiveSwaggerTypeStruct;
        } else if(type instanceof CollectionProperty){
            this.Type = type as CollectionProperty;
        } else {
            this.Type = type.toString();
        }
        
        this.Required = required;
        this.Nullable = nullable;
        this.ReadOnly = readonly;
    }
}
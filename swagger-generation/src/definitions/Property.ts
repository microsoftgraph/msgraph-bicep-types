// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class Property extends Object{
    Name: string;
    Type: string;
    Nullable?: boolean;
    
    constructor(name: string, type: string, nullable: boolean) {
        super();
        this.Name = name;
        this.Type = type;
        this.Nullable = nullable;
    }
}


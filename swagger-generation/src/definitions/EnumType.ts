// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Schemas } from "./Swagger";

export class EnumType { 
    Name: string
    Member: Map<string, string>

    constructor(name: string, member: Map<string, string>) {
        this.Name = name;
        this.Member = member;
    }

    toSwaggerDefinition(): Schemas {
        const definition: Schemas = {
            type: "string",
            enum: [],
        };

        this.Member.forEach((value: string, key: string) => {
            definition.enum.push(key);
        });

        return definition;
    }
}
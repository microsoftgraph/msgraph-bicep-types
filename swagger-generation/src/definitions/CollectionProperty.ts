import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType"

export class CollectionProperty {
    Type: string | PrimitiveSwaggerTypeStruct
    constructor(type: string | PrimitiveSwaggerTypeStruct){
        this.Type = type
    }
}
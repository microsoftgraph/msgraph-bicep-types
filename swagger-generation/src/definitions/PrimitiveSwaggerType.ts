// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum SwaggerMetaType {
    Integer = "integer",
    Number = "number",
    String = "string",
    Boolean = "boolean",
}

export enum SwaggerMetaFormat {
    Int32 = "int32",
    Int64 = "int64",
    Float = "float",
    Double = "double",
    Byte = "byte",
    Binary = "binary",
    Boolean = "boolean",
    Date = "date",
    DateTime = "date-time",
    Password = "password",
}

export class PrimitiveSwaggerTypeStruct {
    type: SwaggerMetaType
    format?: SwaggerMetaFormat
    constructor(type: SwaggerMetaType, format: SwaggerMetaFormat | undefined) {
        this.type = type
        if (format)
            this.format = format
    }
}


export class PrimitiveSwaggerType {

    private static _instance: PrimitiveSwaggerType

    Integer: PrimitiveSwaggerTypeStruct
    Long: PrimitiveSwaggerTypeStruct
    Float: PrimitiveSwaggerTypeStruct
    Double: PrimitiveSwaggerTypeStruct
    String: PrimitiveSwaggerTypeStruct
    Byte: PrimitiveSwaggerTypeStruct
    Binary: PrimitiveSwaggerTypeStruct
    Boolean: PrimitiveSwaggerTypeStruct
    Date: PrimitiveSwaggerTypeStruct
    DateTime: PrimitiveSwaggerTypeStruct
    Password: PrimitiveSwaggerTypeStruct

    private constructor() {
        this.Integer = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int32)
        this.Long = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Integer, SwaggerMetaFormat.Int64)
        this.Float = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Float)
        this.Double = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Number, SwaggerMetaFormat.Double)
        this.String = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, undefined)
        this.Byte = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Byte)
        this.Binary = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Binary)
        this.Boolean = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.Boolean, undefined)
        this.Date = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Date)
        this.DateTime = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.DateTime)
        this.Password = new PrimitiveSwaggerTypeStruct(SwaggerMetaType.String, SwaggerMetaFormat.Password)
    }

    public static get Instance(): PrimitiveSwaggerType {
        return this._instance || (this._instance = new this())
    }
}
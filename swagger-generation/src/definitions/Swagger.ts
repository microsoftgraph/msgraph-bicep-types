// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CollectionProperty } from "./CollectionProperty"
import { PrimitiveSwaggerTypeStruct } from "./PrimitiveSwaggerType"

/*  
    This interface definition is not comprehensive to OpenAPI 2.0; 
    it is specifically designed for the Swagger JSON file that is
    consumed by the Bicep Types Generator. Do not use this 
    interface for a General Purpose Swagger JSON file as it would
    lead to unintended restrictions.

    For more info, see https://swagger.io/specification/v2/
*/

export interface Swagger{
    swagger: SwaggerVersion,
    info: Info,
    schemes: Scheme[],
    consumes: string[],
    produces: string[],
    security: Security[],
    securityDefinitions: SecurityDefinitions,
    definitions: Definitions | SchemasDefinitions,
    paths: Paths,
}

// Child Interfaces

export interface Info{
    title: string,
    version: string,
    description?: string,
    termsOfService?: string
}

export interface Security{
    [key: string]: string[]
}

export interface SecurityDefinitions{
    [key: string]: SecurityDefinition
}

export interface SecurityDefinition{
    type: SecurityType,
    authorizationUrl: string,
    flow: SecurityFlow,
    description: string,
    scopes: Scopes
}

export interface Scopes{
    [key: string]: string
}

export interface Definitions{
    [key: string]: Definition
}

export interface Definition{
    description?: string,
    type: string,
    properties: Properties,
    required?: string[],
}

export interface Properties{
    [key: string]: Property
}

export interface Property{
    type?: string | PrimitiveSwaggerTypeStruct | CollectionProperty,
    $ref?: string,
    description?: string,
    format?: string,
    items?: Items,
}

export interface Items{
    type?: string | PrimitiveSwaggerTypeStruct | CollectionProperty,
    format?: string,
    readOnly?: boolean,
    enum?: string[],
    $ref?: string
}

export interface Paths{
    [key: string]: Path
}

export interface Path{
    put: Operation
}

export interface SchemasDefinitions{
    [key: string]: Schemas
}

export interface Schemas{
    type: string,
    enum: string[],
}

export interface Operation{
    tags: string[],
    description: string,
    operationId: string,
    consumes: string[],
    produces: string[],
    parameters: Parameter[],
    responses: Responses,
}

export interface Parameter{
    name: string,
    in: string,
    description: string,
    required: boolean,
    type?: string,
    schema?: Schema
}

export interface Schema{
    $ref: string
}

export interface Responses{
    [key: string]: Response
}

export interface Response{
    description: string,
    schema: Schema
}

// Enums


export enum SwaggerVersion{
    v2 = "2.0",
    v12 = "1.2",
    v11 = "1.1",
    v10 = "1.0"
}

export enum Scheme{
    https = "https",
    http = "http",
    ws = "ws",
    wss = "wss"
}

export enum Product{
    application_json = "application/json",
}

export enum Type{
    integer = "integer",
    long = "long",
    float = "float",
    double = "double",
    string = "string",
    byte = "byte",
    binary = "binary",
    boolean = "boolean",
    date = "date",
    dateTime = "dateTime",
    password = "password",
}

export enum SecurityType{
    basic = "basic",
    apiKey = "apiKey",
    oauth2 = "oauth2"
}

export enum SecurityFlow{
    implicit = "implicit",
    password = "password",
    application = "application",
    accessCode = "accessCode"
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrimitiveSwaggerType, PrimitiveSwaggerTypeStruct } from "../definitions/PrimitiveSwaggerType";
import { PrimitivePropertyType } from "../definitions/RawTypes";


export class TypeTranslator {
  translationMap: Map<PrimitivePropertyType, PrimitiveSwaggerTypeStruct>;
  private static _instance: TypeTranslator;

  private constructor() {
    this.translationMap = new Map<PrimitivePropertyType, PrimitiveSwaggerTypeStruct>([
      [PrimitivePropertyType.Binary, PrimitiveSwaggerType.Instance.Binary],
      [PrimitivePropertyType.Boolean, PrimitiveSwaggerType.Instance.Boolean],
      [PrimitivePropertyType.Byte, PrimitiveSwaggerType.Instance.Byte],
      [PrimitivePropertyType.Date, PrimitiveSwaggerType.Instance.Date],
      [PrimitivePropertyType.DateTimeOffset, PrimitiveSwaggerType.Instance.DateTime],
      [PrimitivePropertyType.Decimal, PrimitiveSwaggerType.Instance.Float],
      [PrimitivePropertyType.Double, PrimitiveSwaggerType.Instance.Double],
      [PrimitivePropertyType.Duration, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.Guid, PrimitiveSwaggerType.Instance.Uuid],
      [PrimitivePropertyType.Int16, PrimitiveSwaggerType.Instance.Integer],
      [PrimitivePropertyType.Int32, PrimitiveSwaggerType.Instance.Integer],
      [PrimitivePropertyType.Int64, PrimitiveSwaggerType.Instance.Long],
      [PrimitivePropertyType.SByte, PrimitiveSwaggerType.Instance.Integer],
      [PrimitivePropertyType.Single, PrimitiveSwaggerType.Instance.Float],
      [PrimitivePropertyType.Stream, PrimitiveSwaggerType.Instance.Stream],
      [PrimitivePropertyType.String, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.TimeOfDay, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.Geography, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyPoint, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyLineString, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyPolygon, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyMultiPoint, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyMultiLineString, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyMultiPolygon, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeographyCollection, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.Geometry, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryPoint, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryLineString, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryPolygon, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryMultiPoint, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryMultiLineString, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryMultiPolygon, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.GeometryCollection, PrimitiveSwaggerType.Instance.String],
      [PrimitivePropertyType.Untyped, PrimitiveSwaggerType.Instance.String],
    ])
  }

  public odataToSwaggerType(primitiveType: PrimitivePropertyType): PrimitiveSwaggerTypeStruct {
    const swaggerType: PrimitiveSwaggerTypeStruct | undefined = this.translationMap.get(primitiveType)
    if (!swaggerType) throw new Error(`No swagger type found for ${primitiveType}`)
    return swaggerType
  }

  public static get Instance(): TypeTranslator {
    return this._instance || (this._instance = new this())
  }
}


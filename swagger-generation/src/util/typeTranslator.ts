import { PrimitiveSwaggerType } from "../definitions/PrimitiveSwaggerType";
import { PrimitivePropertyType } from "../definitions/RawTypes";


export class TypeTranslator{
    translationMap: Map<PrimitivePropertyType, PrimitiveSwaggerType>;
    reverseTranslationMap: Map<PrimitiveSwaggerType, PrimitivePropertyType>;

    constructor(){
        this.translationMap = new Map<PrimitivePropertyType, PrimitiveSwaggerType>([
            [PrimitivePropertyType.Binary, PrimitiveSwaggerType.Binary],
            [PrimitivePropertyType.Boolean, PrimitiveSwaggerType.Boolean],
            [PrimitivePropertyType.Byte, PrimitiveSwaggerType.Byte],
            [PrimitivePropertyType.Date, PrimitiveSwaggerType.Date],
            [PrimitivePropertyType.DateTimeOffset, PrimitiveSwaggerType.DateTime],
            [PrimitivePropertyType.Decimal, PrimitiveSwaggerType.Double],
            [PrimitivePropertyType.Double, PrimitiveSwaggerType.Double],
            [PrimitivePropertyType.Duration, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.Guid, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.Int16, PrimitiveSwaggerType.Integer],
            [PrimitivePropertyType.Int32, PrimitiveSwaggerType.Integer],
            [PrimitivePropertyType.Int64, PrimitiveSwaggerType.Long],
            [PrimitivePropertyType.SByte, PrimitiveSwaggerType.Integer],
            [PrimitivePropertyType.Single, PrimitiveSwaggerType.Float],
            [PrimitivePropertyType.Stream, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.String, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.TimeOfDay, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.Geography, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyPoint, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyLineString, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyPolygon, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyMultiPoint, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyMultiLineString, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyMultiPolygon, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeographyCollection, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.Geometry, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryPoint, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryLineString, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryPolygon, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryMultiPoint, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryMultiLineString, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryMultiPolygon, PrimitiveSwaggerType.String],
            [PrimitivePropertyType.GeometryCollection, PrimitiveSwaggerType.String],
        ])

        this.reverseTranslationMap = new Map<PrimitiveSwaggerType, PrimitivePropertyType>([
            [PrimitiveSwaggerType.Binary, PrimitivePropertyType.Binary],
            [PrimitiveSwaggerType.Boolean, PrimitivePropertyType.Boolean],
            [PrimitiveSwaggerType.Byte, PrimitivePropertyType.Byte],
            [PrimitiveSwaggerType.Date, PrimitivePropertyType.Date],
            [PrimitiveSwaggerType.DateTime, PrimitivePropertyType.DateTimeOffset],
            [PrimitiveSwaggerType.Double, PrimitivePropertyType.Double],
            [PrimitiveSwaggerType.Float, PrimitivePropertyType.Single],
            [PrimitiveSwaggerType.Integer, PrimitivePropertyType.Int32],
            [PrimitiveSwaggerType.Long, PrimitivePropertyType.Int64],
            [PrimitiveSwaggerType.String, PrimitivePropertyType.String],
        ])
    }


    odatatoSwaggerType(primitiveType: PrimitivePropertyType | string): PrimitiveSwaggerType {
        return this.translationMap.get(primitiveType as PrimitivePropertyType) as PrimitiveSwaggerType
    }

    swaggerToODataType(primitiveType: PrimitiveSwaggerType | string): PrimitivePropertyType {
        return this.reverseTranslationMap.get(primitiveType as PrimitiveSwaggerType) as PrimitivePropertyType
    }
}


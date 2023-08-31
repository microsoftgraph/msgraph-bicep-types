import { CollectionProperty } from "../definitions/CollectionProperty";
import { PrimitiveSwaggerTypeStruct } from "../definitions/PrimitiveSwaggerType";
import { Property } from "../definitions/Property";

export const resolvePropertyTypeToReference = (property: Property): string | undefined => {
    let propertyType: CollectionProperty | PrimitiveSwaggerTypeStruct | string = property.Type;
    if(propertyType instanceof CollectionProperty){ // Is collection
        propertyType = propertyType as CollectionProperty; 
        propertyType = propertyType.Type as PrimitiveSwaggerTypeStruct | string; // Unwrap collection
    } else {
        propertyType = propertyType as PrimitiveSwaggerTypeStruct | string; // Not collection
    }

    if(propertyType instanceof PrimitiveSwaggerTypeStruct) // if type is primitive, can't resolve
        return undefined

    return propertyType;
}
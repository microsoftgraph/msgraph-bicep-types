import { Config } from "./config";
import { CollectionProperty } from "./definitions/CollectionProperty";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { PrimitiveSwaggerTypeStruct } from "./definitions/PrimitiveSwaggerType";
import { AliasTranslator } from "./util/aliasTranslator";

export const validateReferences = (): void => {
    console.log("Validating references")
    const definitionMap: DefinitionMap = DefinitionMap.Instance;
    const config: Config = Config.Instance;

    config.EntityTypes.forEach(entityType => {
        const entity: EntityType | undefined = definitionMap.EntityMap.get(entityType.Name);
        if(!entity){
            throw new Error(`Entity ${entityType.Name} from config.yml is not present in the CSDL`);
        }

        entity.Property.forEach(property => {
            let propertyType: CollectionProperty | PrimitiveSwaggerTypeStruct | string = property.Type;
            if(propertyType instanceof CollectionProperty){ // Is collection
                propertyType = propertyType as CollectionProperty; 
                propertyType = propertyType.Type as PrimitiveSwaggerTypeStruct | string; // Unwrap collection
            } else {
                propertyType = propertyType as PrimitiveSwaggerTypeStruct | string; // Not collection
            }

            if(propertyType instanceof PrimitiveSwaggerTypeStruct) // if type is primitive, no need to validate
                return
            
            propertyHandler(entity, propertyType); // type is only and always string
        });

    });
}

const propertyHandler = (entity: EntityType, propertyType: string): void => {
    const definitionMap: DefinitionMap = DefinitionMap.Instance;

    if(!definitionMap.EntityMap.has(propertyType)){ // There's no reference (not considering aliases)
        const propertyMetaName: string[] = propertyType.split('.')
        const namespacelessPropertyType: string = propertyMetaName.pop() as string;
        const alias: string = propertyMetaName.join('.')
        const namespace: string | undefined = AliasTranslator.Instance.getNamespace(alias)
        if(namespace){ // There's an alias, try again
            const entityName: string = `${namespace}.${namespacelessPropertyType}`
            if(!definitionMap.EntityMap.has(entityName)){
                console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL. Also tried to resolve ${entityName} but it is not defined in the CSDL either`);
            }
        } else { // There's no alias
            console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL`);
        }
    }
}
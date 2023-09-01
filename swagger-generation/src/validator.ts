import { Config } from "./config";
import { DefinitionMap } from "./definitions/DefinitionMap";
import { EntityType } from "./definitions/EntityType";
import { Property } from "./definitions/Property";
import { AliasTranslator } from "./util/aliasTranslator";
import { resolvePropertyTypeToReference } from "./util/propertyTypeResolver";

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
            const reference: string | undefined = resolvePropertyTypeToReference(property);
            if(reference)
                propertyHandler(entity, reference); // type is only and always string
        });

    });
}

const propertyHandler = (entity: EntityType, propertyType: string): void => {
    const definitionMap: DefinitionMap = DefinitionMap.Instance;
    const isEnum: boolean = definitionMap.EnumMap.has(propertyType);
    const isEntity: boolean = definitionMap.EntityMap.has(propertyType);
    console.log(`Handling ${propertyType}`)

    if(isEntity) // There's an entity with this id
        return;

    if(isEnum) // There's an enum with this id
        return;

    const propertyMetaName: string[] = propertyType.split('.')
    const namespacelessPropertyType: string = propertyMetaName.pop() as string;
    const alias: string = propertyMetaName.join('.')
    const namespace: string | undefined = AliasTranslator.Instance.getNamespace(alias)
    if(namespace){ // There's an alias, try again
        const entityName: string = `${namespace}.${namespacelessPropertyType}`
        if(definitionMap.EntityMap.has(entityName) || definitionMap.EnumMap.has(entityName)){ // Replace alias with namespace
            entity.Property = entity.Property.map((property: Property) => replaceAlias(property, propertyType, entityName));
            DefinitionMap.Instance.EntityMap.set(entity.Name, entity);
        } else {
            console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL. Also tried to resolve ${entityName} but it is not defined in the CSDL either. Property will be removed from definitions`);
            entity.Property = entity.Property.filter(property => property.Type !== propertyType);
            DefinitionMap.Instance.EntityMap.set(entity.Name, entity);
        }
    } else { // There's no alias
        console.error(`Entity ${entity.Name} references ${propertyType} which is not defined in the CSDL. Property will be removed from definitions`);
        entity.Property = entity.Property.filter(property => property.Type !== propertyType);
        DefinitionMap.Instance.EntityMap.set(entity.Name, entity);
    }
    
}

const replaceAlias = (property: Property, propertyType: string, entityName: string) => {
    if(property.Type === propertyType){
        property.Type = entityName;
    }
    return property;
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CollectionProperty } from "../definitions/CollectionProperty";
import { PrimitiveSwaggerTypeStruct, SwaggerMetaFormat } from "../definitions/PrimitiveSwaggerType";
import { Property } from "../definitions/Property";
import { OrchestrationType } from "../definitions/Metadata";

export const determineOrchestrationType = (property: Property): OrchestrationType => {
    // If it's a stream property
    if (property.Type instanceof PrimitiveSwaggerTypeStruct && 
        property.Type.type === "string" && 
        property.Type.format === SwaggerMetaFormat.Binary) {
        return OrchestrationType.BinaryStream;
    }

    // If it's a collection
    if (property.Type instanceof CollectionProperty) {
        const collectionType = property.Type.Type;
        if (collectionType === "microsoft.graph.certificate") {
            return OrchestrationType.CertificateCollection;
        }
        // Treat other collections as custom metadata
        return OrchestrationType.CustomMetadata;
    }

    // If it's a complex object (not primitive)
    if (typeof property.Type === "string" && !property.Type.startsWith("Edm.")) {
        if (property.Name.toLowerCase().includes("behavior")) {
            return OrchestrationType.BehaviorSettings;
        }
        if (property.Name.toLowerCase().includes("internal")) {
            return OrchestrationType.InternalSettings;
        }
        if (property.Name.toLowerCase().includes("metadata")) {
            return OrchestrationType.CustomMetadata;
        }
        // Treat other complex objects as custom metadata
        return OrchestrationType.CustomMetadata;
    }

    // Default to custom metadata for simple types
    return OrchestrationType.CustomMetadata;
} 
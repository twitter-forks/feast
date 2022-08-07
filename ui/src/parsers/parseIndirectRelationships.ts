import { FeastRegistryType } from "./feastRegistry";
import { EntityRelation } from "./parseEntityRelationships";
import { FEAST_FCO_TYPES } from "./types";

const parseIndirectRelationships = (
  relationships: EntityRelation[],
  objects: FeastRegistryType
) => {
  const indirectLinks: EntityRelation[] = [];

  // Only contains Entity -> FS or DS -> FS relationships
  objects.models?.forEach((model) => {
    model.spec.features.forEach((featureGroup) => {
      relationships
        .filter(
          (relationship) =>
            relationship.target.name === featureGroup.featureGroupName
        )
        .forEach((relationship) => {
          indirectLinks.push({
            source: relationship.source,
            target: {
              type: FEAST_FCO_TYPES["model"],
              name: model.spec.name,
            },
          });
        });
    });
  });
  return indirectLinks;
};

export default parseIndirectRelationships;

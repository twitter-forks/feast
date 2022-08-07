import { FeastRegistryType } from "./feastRegistry";
import { FEAST_FCO_TYPES } from "./types";

interface EntityReference {
  type: FEAST_FCO_TYPES;
  name: string;
}

interface EntityRelation {
  source: EntityReference;
  target: EntityReference;
}

const parseEntityRelationships = (objects: FeastRegistryType) => {
  const links: EntityRelation[] = [];

  objects.models?.forEach((fs) => {
    fs.spec.features.forEach((feature) => {
      links.push({
        source: {
          type: FEAST_FCO_TYPES["featureGroup"],
          name: feature.featureGroupName,
        },
        target: {
          type: FEAST_FCO_TYPES["model"],
          name: fs.spec.name,
        },
      });
    });
  });

  objects.featureGroups?.forEach((fv) => {
    fv.spec.entities.forEach((ent) => {
      links.push({
        source: {
          type: FEAST_FCO_TYPES["entity"],
          name: ent,
        },
        target: {
          type: FEAST_FCO_TYPES["featureGroup"],
          name: fv.spec.name,
        },
      });
    });
    if (fv.spec.batchSource) {
      links.push({
        source: {
          type: FEAST_FCO_TYPES["dataSource"],
          name: fv.spec.batchSource.name || ''
        },
        target: {
          type: FEAST_FCO_TYPES["featureGroup"],
          name: fv.spec.name,
        }
      })
    }
  });

  objects.onDemandFeatureGroups?.forEach((fv) => {
   Object.values(fv.spec.sources).forEach((input: { [key: string]: any }) => {
     if (input.requestDataSource) {
       links.push({
         source: {
              type: FEAST_FCO_TYPES["dataSource"],
              name: input.requestDataSource.name,
            },
            target: {
              type: FEAST_FCO_TYPES["featureGroup"],
              name: fv.spec.name,
            },
          });
     } else if (input.featureGroupProjection?.featureGroupName) {
          const source_fv = objects.featureGroups?.find(el => el.spec.name === input.featureGroupProjection.featureGroupName);
          if (!source_fv) {
            return;
          }
          links.push({
             source: {
               type: FEAST_FCO_TYPES["dataSource"],
               name: source_fv?.spec.batchSource.name || '',
             },
             target: {
               type: FEAST_FCO_TYPES["featureGroup"],
               name: fv.spec.name,
             },
           });
     }
   });
 });

  return links;
};

export default parseEntityRelationships;
export type { EntityRelation, EntityReference };

import { FEAST_FCO_TYPES } from "../../parsers/types";
import { useContext } from "react";
import RegistryPathContext from "../../contexts/RegistryPathContext";

import useLoadRegistry from "../../queries/useLoadRegistry";
import { EntityReference } from "../../parsers/parseEntityRelationships";

const useLoadModel = (modelName: string) => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.objects.models?.find(
          (fs) => fs.spec.name === modelName
        );

  let entities =
    data === undefined
      ? undefined
      : registryQuery.data?.indirectRelationships
          .filter((relationship) => {
            return (
              relationship.target.type === FEAST_FCO_TYPES.model &&
              relationship.target.name === data.spec.name &&
              relationship.source.type === FEAST_FCO_TYPES.entity
            );
          })
          .map((relationship) => {
            return relationship.source;
          });
  // Deduplicate on name of entity
  if (entities) {
    let entityToName: { [key: string]: EntityReference } = {};
    for (let entity of entities) {
      entityToName[entity.name] = entity;
    }
    entities = Object.values(entityToName);
  }
  return {
    ...registryQuery,
    data,
    entities,
  };
};

export default useLoadModel;

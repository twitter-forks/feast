import { useContext } from "react";
import RegistryPathContext from "../../contexts/RegistryPathContext";
import useLoadRegistry from "../../queries/useLoadRegistry";

const useLoadFeatureGroup = (featureGroupName: string) => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.mergedFVMap[featureGroupName];

  return {
    ...registryQuery,
    data,
  };
};

const useLoadRegularFeatureGroup = (featureGroupName: string) => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.objects.featureGroups?.find((fv) => {
          return fv.spec.name === featureGroupName;
        });

  return {
    ...registryQuery,
    data,
  };
};

const useLoadOnDemandFeatureGroup = (featureGroupName: string) => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.objects.onDemandFeatureGroups?.find((fv) => {
          return fv.spec.name === featureGroupName;
        });

  return {
    ...registryQuery,
    data,
  };
};

export default useLoadFeatureGroup;
export { useLoadRegularFeatureGroup, useLoadOnDemandFeatureGroup };

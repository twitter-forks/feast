import React, { useContext } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiStat,
  EuiHorizontalRule,
  EuiTitle,
  EuiSpacer,
} from "@elastic/eui";
import useLoadRegistry from "../queries/useLoadRegistry";
import { useNavigate, useParams } from "react-router-dom";
import RegistryPathContext from "../contexts/RegistryPathContext";

const useLoadObjectStats = () => {
  const registryUrl = useContext(RegistryPathContext);
  const query = useLoadRegistry(registryUrl);

  const data =
    query.isSuccess && query.data
      ? {
          models: query.data.objects.models?.length || 0,
          featureGroups: query.data.mergedFVList.length,
          entities: query.data.objects.entities?.length || 0,
          dataSources: query.data.objects.dataSources?.length || 0,
        }
      : undefined;

  return {
    ...query,
    data,
  };
};

const ObjectsCountStats = () => {
  const { isLoading, isSuccess, isError, data } = useLoadObjectStats();
  const { projectName } = useParams();

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <EuiSpacer size="l" />
      <EuiHorizontalRule margin="xs" />
      {isLoading && <p>Loading</p>}
      {isError && <p>There was an error in loading registry information.</p>}
      {isSuccess && data && (
        <React.Fragment>
          <EuiSpacer size="s" />
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiStat
                description="Models"
                title={data.models}
                reverse
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                description="Feature Groups"
                title={data.featureGroups}
                reverse
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                description="Entities"
                title={data.entities}
                reverse
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                description="Data Sources"
                title={data.dataSources}
                reverse
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ObjectsCountStats;

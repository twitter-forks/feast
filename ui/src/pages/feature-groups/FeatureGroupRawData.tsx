import React from "react";
import { EuiPanel } from "@elastic/eui";
import { useParams } from "react-router-dom";
import useLoadFeatureGroup from "./useLoadFeatureGroup";

const FeatureGroupRawData = () => {
  let { featureGroupName } = useParams();

  const fvName = featureGroupName === undefined ? "" : featureGroupName;

  const { isSuccess, data } = useLoadFeatureGroup(fvName);

  return isSuccess && data ? (
    <EuiPanel hasBorder={true} hasShadow={false}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </EuiPanel>
  ) : (
    <EuiPanel hasBorder={true} hasShadow={false}>
      No data so sad
    </EuiPanel>
  );
};

export default FeatureGroupRawData;

import React from "react";
import { EuiPanel } from "@elastic/eui";
import { useParams } from "react-router-dom";
import useLoadFeature from "./useLoadFeature";

const FeatureRawData = () => {
  let { FeatureGroupName, FeatureName } = useParams();

  const eName = FeatureGroupName === undefined ? "" : FeatureGroupName;
  const fName = FeatureName === undefined ? "" : FeatureName;

  const { isSuccess, data } = useLoadFeature(eName, fName);

  return isSuccess && data ? (
    <EuiPanel hasBorder={true} hasShadow={false}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </EuiPanel>
  ) : (
    <EuiPanel hasBorder={true} hasShadow={false}>
      No data so sad ;-;
    </EuiPanel>
  );
};

export default FeatureRawData;

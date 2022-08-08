import React from "react";
import { EuiPanel } from "@elastic/eui";
import { useParams } from "react-router-dom";
import useLoadModel from "./useLoadModel";

const ModelRawData = () => {
  let { modelName } = useParams();

  const fsName = modelName === undefined ? "" : modelName;

  const { isSuccess, data } = useLoadModel(fsName);

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

export default ModelRawData;

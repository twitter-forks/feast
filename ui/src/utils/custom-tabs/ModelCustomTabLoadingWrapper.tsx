import React from "react";
import { useParams } from "react-router-dom";

import { ModelCustomTabProps } from "../../custom-tabs/types";
import useLoadModel from "../../pages/models/useLoadModel";

interface ModelCustomTabLoadingWrapperProps {
  Component: (props: ModelCustomTabProps) => JSX.Element;
}

const ModelCustomTabLoadingWrapper = ({
  Component,
}: ModelCustomTabLoadingWrapperProps) => {
  const { modelName } = useParams();

  if (!modelName) {
    throw new Error(
      `This route has no 'modelName' part. This route is likely not supposed to render this component.`
    );
  }

  const feastObjectQuery = useLoadModel(modelName);

  return (
    <Component id={modelName} feastObjectQuery={feastObjectQuery} />
  );
};

export default ModelCustomTabLoadingWrapper;

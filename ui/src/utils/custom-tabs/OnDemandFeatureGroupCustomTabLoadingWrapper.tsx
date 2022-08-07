import React from "react";

import { useParams } from "react-router-dom";
import useLoadFeatureGroup from "../../pages/feature-groups/useLoadFeatureGroup";
import {
  OnDemandFeatureGroupCustomTabProps,
  OnDemandFeatureGroupQueryReturnType,
} from "../../custom-tabs/types";
import { FEAST_FV_TYPES } from "../../parsers/mergedFVTypes";

interface OnDemandFeatureGroupCustomTabLoadingWrapperProps {
  Component: (props: OnDemandFeatureGroupCustomTabProps) => JSX.Element;
}

const OnDemandFeatureGroupCustomTabLoadingWrapper = ({
  Component,
}: OnDemandFeatureGroupCustomTabLoadingWrapperProps) => {
  const { featureGroupName } = useParams();

  if (!featureGroupName) {
    throw new Error(
      `This route has no 'featureGroupName' part. This route is likely not supposed to render this component.`
    );
  }

  const feastObjectQuery = useLoadFeatureGroup(featureGroupName);

  if (
    feastObjectQuery.isSuccess &&
    feastObjectQuery.data &&
    feastObjectQuery.data.type !== FEAST_FV_TYPES.ondemand
  ) {
    throw new Error(
      `This should not happen. Somehow a custom tab on a ODFV page received data that does not have the shape?`
    );
  }

  return (
    <Component
      id={featureGroupName}
      feastObjectQuery={feastObjectQuery as OnDemandFeatureGroupQueryReturnType}
    />
  );
};

export default OnDemandFeatureGroupCustomTabLoadingWrapper;

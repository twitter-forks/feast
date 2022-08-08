import React from "react";

import { useParams } from "react-router-dom";
import { EuiLoadingSpinner } from "@elastic/eui";

import { FeastFeatureGroupType } from "../../parsers/feastFeatureGroups";
import RegularFeatureInstance from "./RegularFeatureGroupInstance";
import { FEAST_FV_TYPES } from "../../parsers/mergedFVTypes";
import { FeastODFVType } from "../../parsers/feastODFVS";
import useLoadFeatureGroup from "./useLoadFeatureGroup";
import OnDemandFeatureInstance from "./OnDemandFeatureGroupInstance";

const FeatureGroupInstance = () => {
  const { featureGroupName } = useParams();

  const fvName = featureGroupName === undefined ? "" : featureGroupName;

  const { isLoading, isSuccess, isError, data } = useLoadFeatureGroup(fvName);
  const isEmpty = data === undefined;

  if (isLoading) {
    return (
      <React.Fragment>
        <EuiLoadingSpinner size="m" /> Loading
      </React.Fragment>
    );
  }
  if (isEmpty) {
    return <p>No feature group with name: {featureGroupName}</p>;
  }

  if (isError) {
    isError && <p>Error loading feature group: {featureGroupName}</p>;
  }

  if (isSuccess && !isEmpty) {
    if (data.type === FEAST_FV_TYPES.regular) {
      const fv: FeastFeatureGroupType = data.object;

      return <RegularFeatureInstance data={fv} />;
    }

    if (data.type === FEAST_FV_TYPES.ondemand) {
      const odfv: FeastODFVType = data.object;

      return <OnDemandFeatureInstance data={odfv} />;
    }
  }

  return <p>No Data So Sad</p>;
};

export default FeatureGroupInstance;

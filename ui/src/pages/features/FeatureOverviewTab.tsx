import {
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiTitle,
  EuiPanel,
  EuiFlexItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from "@elastic/eui";
import EuiCustomLink from "../../components/EuiCustomLink";
import React from "react";
import { useParams } from "react-router-dom";
import useLoadFeature from "./useLoadFeature";

const FeatureOverviewTab = () => {
  let { projectName, FeatureGroupName, FeatureName } = useParams();

  const eName = FeatureGroupName === undefined ? "" : FeatureGroupName;
  const fName = FeatureName === undefined ? "" : FeatureName;
  const { isLoading, isSuccess, isError, data, featureData } = useLoadFeature(eName, fName);
  const isEmpty = data === undefined || featureData === undefined;

  return (
    <React.Fragment>
      {isLoading && (
        <React.Fragment>
          <EuiLoadingSpinner size="m" /> Loading
        </React.Fragment>
      )}
      {isEmpty && <p>No Feature with name {FeatureName} in FeatureGroup {FeatureGroupName}</p>}
      {isError && <p>Error loading Feature {FeatureName} in FeatureGroup {FeatureGroupName}</p>}
      {isSuccess && data && (
        <React.Fragment>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiPanel hasBorder={true}>
                <EuiTitle size="xs">
                  <h3>Properties</h3>
                </EuiTitle>
                <EuiHorizontalRule margin="xs" />
                <EuiDescriptionList>
                  <EuiDescriptionListTitle>Name</EuiDescriptionListTitle>
                  <EuiDescriptionListDescription>
                    {featureData?.name}
                  </EuiDescriptionListDescription>

                  <EuiDescriptionListTitle>Value Type</EuiDescriptionListTitle>
                  <EuiDescriptionListDescription>
                    {featureData?.valueType}
                  </EuiDescriptionListDescription>

                  <EuiDescriptionListTitle>FeatureGroup</EuiDescriptionListTitle>
                  <EuiDescriptionListDescription>
                    <EuiCustomLink 
                      href={`/p/${projectName}/feature-group/${FeatureGroupName}`}
                      to={`/p/${projectName}/feature-group/${FeatureGroupName}`}>
                      {FeatureGroupName} 
                    </EuiCustomLink>
                  </EuiDescriptionListDescription>
                </EuiDescriptionList>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default FeatureOverviewTab;

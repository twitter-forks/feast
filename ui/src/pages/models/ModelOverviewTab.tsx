import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiPanel,
  EuiSpacer,
  EuiStat,
  EuiText,
  EuiTextAlign,
  EuiTitle,
} from "@elastic/eui";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FeaturesInModelList from "../../components/FeaturesInModelDisplay";
import TagsDisplay from "../../components/TagsDisplay";
import { encodeSearchQueryString } from "../../hooks/encodeSearchQueryString";
import FeatureGroupEdgesList from "../entities/FeatureGroupEdgesList";
import useLoadModel from "./useLoadModel";

const ModelOverviewTab = () => {
  let { modelName, projectName } = useParams();

  const fsName = modelName === undefined ? "" : modelName;

  const { isLoading, isSuccess, isError, data, entities } =
    useLoadModel(fsName);
  const isEmpty = data === undefined;

  let numFeatures = 0;
  let numFeatureGroups = 0;
  if (data) {
    data.spec.features.forEach((featureGroup) => {
      numFeatureGroups += 1;
      numFeatures += featureGroup.featureColumns.length;
    });
  }

  const navigate = useNavigate();

  return (
    <React.Fragment>
      {isLoading && (
        <React.Fragment>
          <EuiLoadingSpinner size="m" /> Loading
        </React.Fragment>
      )}
      {isEmpty && <p>No model with name: {modelName}</p>}
      {isError && <p>Error loading model: {modelName}</p>}
      {isSuccess && data && (
        <React.Fragment>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiStat title={`${numFeatures}`} description="Total Features" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiTextAlign textAlign="center">
                <p>from</p>
              </EuiTextAlign>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                title={`${numFeatureGroups}`}
                description="Feature Groups"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                title={`${data.meta.createdTimestamp.toLocaleDateString(
                  "en-CA"
                )}`}
                description="Created"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup>
            <EuiFlexItem grow={2}>
              <EuiPanel hasBorder={true}>
                <EuiTitle size="xs">
                  <h2>Features</h2>
                </EuiTitle>
                <EuiHorizontalRule margin="xs" />
                {data.spec.features ? (
                  <FeaturesInModelList featureGroups={data.spec.features} />
                ) : (
                  <EuiText>
                    No features specified for this model.
                  </EuiText>
                )}
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem grow={1}>
              <EuiPanel hasBorder={true} grow={false}>
                <EuiTitle size="xs">
                  <h3>Tags</h3>
                </EuiTitle>
                <EuiHorizontalRule margin="xs" />
                {data.spec.tags ? (
                  <TagsDisplay
                    tags={data.spec.tags}
                    createLink={(key, value) => {
                      return (
                        `/p/${projectName}/model?` +
                        encodeSearchQueryString(`${key}:${value}`)
                      );
                    }}
                  />
                ) : (
                  <EuiText>No Tags specified on this model.</EuiText>
                )}
              </EuiPanel>
              <EuiSpacer size="m" />
              <EuiPanel hasBorder={true}>
                <EuiTitle size="xs">
                  <h3>Entities</h3>
                </EuiTitle>
                <EuiHorizontalRule margin="xs" />
                {entities ? (
                  <EuiFlexGroup wrap responsive={false} gutterSize="xs">
                    {entities.map((entity) => {
                      return (
                        <EuiFlexItem grow={false} key={entity.name}>
                          <EuiBadge
                            color="primary"
                            onClick={() => {
                              navigate(
                                `/p/${projectName}/entity/${entity.name}`
                              );
                            }}
                            onClickAriaLabel={entity.name}
                            data-test-sub="testExample1"
                          >
                            {entity.name}
                          </EuiBadge>
                        </EuiFlexItem>
                      );
                    })}
                  </EuiFlexGroup>
                ) : (
                  <EuiText>No Entities.</EuiText>
                )}
              </EuiPanel>
              <EuiSpacer size="m" />
              <EuiPanel hasBorder={true}>
                <EuiTitle size="xs">
                  <h3>All Feature Groups</h3>
                </EuiTitle>
                <EuiHorizontalRule margin="xs" />
                {data.spec.features.length > 0 ? (
                  <FeatureGroupEdgesList
                    fvNames={data.spec.features.map((f) => {
                      return f.featureGroupName;
                    })}
                  />
                ) : (
                  <EuiText>No feature groups in this model</EuiText>
                )}
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ModelOverviewTab;

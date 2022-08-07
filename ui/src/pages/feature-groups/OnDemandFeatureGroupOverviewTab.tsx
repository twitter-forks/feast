import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiText,
  EuiTitle,
  EuiPanel,
  EuiCodeBlock,
  EuiSpacer,
} from "@elastic/eui";
import React from "react";
import FeaturesListDisplay from "../../components/FeaturesListDisplay";
import {
  FeastODFVType,
  RequestDataSourceType,
  FeatureGroupProjectionType,
} from "../../parsers/feastODFVS";
import { useParams } from "react-router-dom";
import { EntityRelation } from "../../parsers/parseEntityRelationships";
import { FEAST_FCO_TYPES } from "../../parsers/types";
import useLoadRelationshipData from "../../queries/useLoadRelationshipsData";
import FeatureGroupProjectionDisplayPanel from "./components/FeatureGroupProjectionDisplayPanel";
import RequestDataDisplayPanel from "./components/RequestDataDisplayPanel";
import ConsumingModelsList from "./ConsumingModelsList";

interface OnDemandFeatureGroupOverviewTabProps {
  data: FeastODFVType;
}

const whereFSconsumesThisFv = (fvName: string) => {
  return (r: EntityRelation) => {
    return (
      r.source.name === fvName &&
      r.target.type === FEAST_FCO_TYPES.model
    );
  };
};

const OnDemandFeatureGroupOverviewTab = ({
  data,
}: OnDemandFeatureGroupOverviewTabProps) => {
  const inputs = Object.entries(data.spec.sources);
  const { projectName } = useParams();

  const relationshipQuery = useLoadRelationshipData();
  const fsNames = relationshipQuery.data
    ? relationshipQuery.data
        .filter(whereFSconsumesThisFv(data.spec.name))
        .map((fs) => {
          return fs.target.name;
        })
    : [];

  return (
    <React.Fragment>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiTitle size="s">
              <h3>Transformation</h3>
            </EuiTitle>
            <EuiHorizontalRule margin="xs" />
            <EuiCodeBlock language="py" fontSize="m" paddingSize="m">
              {data.spec.userDefinedFunction.body}
            </EuiCodeBlock>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiTitle size="xs">
              <h3>Features ({data.spec.features.length})</h3>
            </EuiTitle>
            <EuiHorizontalRule margin="xs" />
            {projectName && data.spec.features ? (
              <FeaturesListDisplay
                projectName={projectName}
                featureGroupName={data.spec.name}
                features={data.spec.features}
                link={false}
              />
            ) : (
              <EuiText>No Tags sepcified on this feature group.</EuiText>
            )}
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiTitle size="xs">
              <h3>Inputs ({inputs.length})</h3>
            </EuiTitle>
            <EuiHorizontalRule margin="xs" />
            <EuiFlexGroup direction="column">
              {inputs.map(([key, inputGroup]) => {
                if ((inputGroup as RequestDataSourceType).requestDataSource) {
                  return (
                    <EuiFlexItem key={key}>
                      <RequestDataDisplayPanel
                        {...(inputGroup as RequestDataSourceType)}
                      />
                    </EuiFlexItem>
                  );
                }

                if (inputGroup as FeatureGroupProjectionType) {
                  return (
                    <EuiFlexItem key={key}>
                      <FeatureGroupProjectionDisplayPanel
                        {...(inputGroup as FeatureGroupProjectionType)}
                      />
                    </EuiFlexItem>
                  );
                }

                return (
                  <EuiFlexItem key={key}>
                    <EuiCodeBlock language="json" fontSize="m" paddingSize="m">
                      {JSON.stringify(inputGroup, null, 2)}
                    </EuiCodeBlock>
                  </EuiFlexItem>
                );
              })}
            </EuiFlexGroup>
          </EuiPanel>
          <EuiSpacer size="m" />
          <EuiPanel hasBorder={true}>
            <EuiTitle size="xs">
              <h3>Consuming Models</h3>
            </EuiTitle>
            <EuiHorizontalRule margin="xs" />
            {fsNames.length > 0 ? (
              <ConsumingModelsList fsNames={fsNames} />
            ) : (
              <EuiText>No services consume this feature group</EuiText>
            )}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </React.Fragment>
  );
};

export default OnDemandFeatureGroupOverviewTab;

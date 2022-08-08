import React from "react";
import { EuiBasicTable, EuiPanel, EuiText, EuiTitle } from "@elastic/eui";

import { FeatureGroupProjectionType } from "../../../parsers/feastODFVS";
import { useParams } from "react-router-dom";
import EuiCustomLink from "../../../components/EuiCustomLink";

interface RequestDataDisplayPanelProps extends FeatureGroupProjectionType {}

const FeatureGroupProjectionDisplayPanel = ({
  featureGroupProjection,
}: RequestDataDisplayPanelProps) => {
  const { projectName } = useParams();

  const columns = [
    {
      name: "Column Name",
      field: "name",
    },
    {
      name: "Type",
      field: "valueType",
    },
  ];

  return (
    <EuiPanel hasBorder={true}>
      <EuiText size="xs">
        <span>Feature Group</span>
      </EuiText>
      <EuiTitle size="s">
        <EuiCustomLink
          href={`/p/${projectName}/feature-group/${featureGroupProjection.featureGroupName}`}
          to={`/p/${projectName}/feature-group/${featureGroupProjection.featureGroupName}`}
        >
          {featureGroupProjection.featureGroupName}
        </EuiCustomLink>
      </EuiTitle>
      <EuiBasicTable
        columns={columns}
        items={featureGroupProjection.featureColumns}
      />
    </EuiPanel>
  );
};

export default FeatureGroupProjectionDisplayPanel;

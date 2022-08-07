import React from "react";
import { z } from "zod";
import { EuiBasicTable } from "@elastic/eui";
import { FeastFeatureInServiceType } from "../parsers/feastModels";
import EuiCustomLink from "./EuiCustomLink";
import { FEAST_FEATURE_VALUE_TYPES } from "../parsers/types";
import { useParams } from "react-router-dom";

interface FeatureGroupsListInterace {
  featureGroups: FeastFeatureInServiceType[];
}

const FeaturesInModelList = ({ featureGroups }: FeatureGroupsListInterace) => {
  const { projectName } = useParams();

  const FeatureInService = z.object({
    featureGroupName: z.string(),
    featureColumnName: z.string(),
    valueType: z.nativeEnum(FEAST_FEATURE_VALUE_TYPES),
  });
  type FeatureInServiceType = z.infer<typeof FeatureInService>;

  var items: FeatureInServiceType[] = [];
  featureGroups.forEach((featureGroup) => {
    featureGroup.featureColumns.forEach((featureColumn) => {
      const row: FeatureInServiceType = {
        featureGroupName: featureGroup.featureGroupName,
        featureColumnName: featureColumn.name,
        valueType: featureColumn.valueType,
      };
      items.push(row);
    });
  });

  const columns = [
    {
      name: "Feature Group",
      field: "featureGroupName",
      render: (name: string) => {
        return (
          <EuiCustomLink
            href={`/p/${projectName}/feature-group/${name}`}
            to={`/p/${projectName}/feature-group/${name}`}
          >
            {name}
          </EuiCustomLink>
        );
      },
    },
    {
      name: "Feature Column",
      field: "featureColumnName",
    },
    {
      name: "Value Type",
      field: "valueType",
    },
  ];

  const getRowProps = (item: FeatureInServiceType) => {
    return {
      "data-test-subj": `row-${item.featureGroupName}`,
    };
  };

  return (
    <EuiBasicTable columns={columns} items={items} rowProps={getRowProps} />
  );
};

export default FeaturesInModelList;

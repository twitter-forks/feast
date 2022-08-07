import React from "react";
import {
  EuiBasicTable,
  EuiTableComputedColumnType,
  EuiTableFieldDataColumnType,
} from "@elastic/eui";
import EuiCustomLink from "../../components/EuiCustomLink";
import {
  FeastFeatureInServiceType,
  FeastModelType,
} from "../../parsers/feastModels";
import { useParams } from "react-router-dom";

interface ModelListingTableProps {
  tagKeysSet: Set<string>;
  models: FeastModelType[];
}

type ModelTypeColumn =
  | EuiTableFieldDataColumnType<FeastModelType>
  | EuiTableComputedColumnType<FeastModelType>;

const ModelListingTable = ({
  tagKeysSet,
  models,
}: ModelListingTableProps) => {
  const { projectName } = useParams();

  const columns: ModelTypeColumn[] = [
    {
      name: "Name",
      field: "spec.name",
      render: (name: string) => {
        return (
          <EuiCustomLink
            href={`/p/${projectName}/model/${name}`}
            to={`/p/${projectName}/model/${name}`}
          >
            {name}
          </EuiCustomLink>
        );
      },
    },
    {
      name: "# of Features",
      field: "spec.features",
      render: (featureGroups: FeastFeatureInServiceType[]) => {
        var numFeatures = 0;
        featureGroups.forEach((featureGroup) => {
          numFeatures += featureGroup.featureColumns.length;
        });
        return numFeatures;
      },
    },
    {
      name: "Created at",
      field: "meta.createdTimestamp",
      render: (date: Date) => {
        return date.toLocaleDateString("en-CA");
      },
    },
  ];

  tagKeysSet.forEach((key) => {
    columns.push({
      name: key,
      render: (item: FeastModelType) => {
        let tag = <span>n/a</span>;

        const value = item.spec.tags ? item.spec.tags[key] : undefined;

        if (value) {
          tag = <span>{value}</span>;
        }

        return tag;
      },
    });
  });

  const getRowProps = (item: FeastModelType) => {
    return {
      "data-test-subj": `row-${item.spec.name}`,
    };
  };

  return (
    <EuiBasicTable
      columns={columns}
      items={models}
      rowProps={getRowProps}
    />
  );
};

export default ModelListingTable;

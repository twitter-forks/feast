import { EuiBasicTable } from "@elastic/eui";
import React from "react";

interface DatasetFeatureEntry {
  featureName: string;
  featureGroupName: string;
}

interface DatasetFeaturesTableProps {
  features: DatasetFeatureEntry[];
}

const DatasetFeaturesTable = ({ features }: DatasetFeaturesTableProps) => {
  const columns = [
    {
      name: "Feature",
      field: "featureName",
    },
    {
      name: "Sourc Feature Group",
      field: "featureGroupName",
    },
  ];

  return <EuiBasicTable columns={columns} items={features} />;
};

export default DatasetFeaturesTable;

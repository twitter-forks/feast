import React from "react";
import { EuiBasicTable } from "@elastic/eui";
import EuiCustomLink from "../../components/EuiCustomLink";
import { useParams } from "react-router-dom";

interface ConsumingModelsListInterace {
  fsNames: string[];
}

const ConsumingModelsList = ({
  fsNames,
}: ConsumingModelsListInterace) => {
  const { projectName } = useParams();

  const columns = [
    {
      name: "Name",
      field: "",
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
  ];

  const getRowProps = (item: string) => {
    return {
      "data-test-subj": `row-${item}`,
    };
  };

  return (
    <EuiBasicTable columns={columns} items={fsNames} rowProps={getRowProps} />
  );
};

export default ConsumingModelsList;

import React from "react";
import { EuiBasicTable, EuiLoadingSpinner } from "@elastic/eui";
import EuiCustomLink from "../../components/EuiCustomLink";
import { useParams } from "react-router-dom";
import useLoadRelationshipData from "../../queries/useLoadRelationshipsData";
import { EntityRelation } from "../../parsers/parseEntityRelationships";
import { FEAST_FCO_TYPES } from "../../parsers/types";

interface FeatureGroupEdgesListInterace {
  fvNames: string[];
}

const whereFSconsumesThisFv = (fvName: string) => {
  return (r: EntityRelation) => {
    return (
      r.source.name === fvName &&
      r.target.type === FEAST_FCO_TYPES.model
    );
  };
};

const useGetFSConsumersOfFV = (fvList: string[]) => {
  const relationshipQuery = useLoadRelationshipData();

  const data = relationshipQuery.data
    ? fvList.reduce((memo: Record<string, string[]>, fvName) => {
        if (relationshipQuery.data) {
          memo[fvName] = relationshipQuery.data
            .filter(whereFSconsumesThisFv(fvName))
            .map((fs) => {
              return fs.target.name;
            });
        }

        return memo;
      }, {})
    : undefined;

  return {
    ...relationshipQuery,
    data,
  };
};

const FeatureGroupEdgesList = ({ fvNames }: FeatureGroupEdgesListInterace) => {
  const { projectName } = useParams();

  const { isLoading, data } = useGetFSConsumersOfFV(fvNames);

  const columns = [
    {
      name: "Name",
      field: "",
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
      name: "FS Consumers",
      render: (name: string) => {
        return (
          <React.Fragment>
            {isLoading && <EuiLoadingSpinner size="s" />}
            {data && data[name].length}
          </React.Fragment>
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
    <EuiBasicTable columns={columns} items={fvNames} rowProps={getRowProps} />
  );
};

export default FeatureGroupEdgesList;

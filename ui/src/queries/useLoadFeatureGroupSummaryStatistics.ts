import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  featureGroupSummaryStatisticsSchema,
  FeatureGroupSummaryStatisticsType,
} from "../parsers/featureGroupSummaryStatistics";

const useLoadFeatureGroupSummaryStatistics = (featureGroupName: string) => {
  const { projectName } = useParams();

  const queryKey = `featureGroupSummaryStatistics:${featureGroupName}`;
  const url = `/data/${projectName}/featureGroup/${featureGroupName}.json`;

  return useQuery(
    queryKey,
    () => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then<FeatureGroupSummaryStatisticsType>((json) => {
          const summary = featureGroupSummaryStatisticsSchema.parse(json);

          return summary;
        });
    },
    {
      staleTime: 15 * 60 * 1000, // Given that we are reading from a registry dump, this seems reasonable for now.
    }
  );
};

export default useLoadFeatureGroupSummaryStatistics;

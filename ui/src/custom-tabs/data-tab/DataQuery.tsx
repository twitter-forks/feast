import { useQuery } from "react-query";

interface DataQueryInterface {
  featureGroup: string | undefined;
}

const DataQuery = (featureGroup: string) => {
  const response = fetch("https://featurestore.twitter.biz/hello").then((res) => res.text());
  console.log(response);

  const queryKey = `data-tab-namespace:${featureGroup}`;

  return useQuery<any>(
    queryKey,
    () => {
      // Customizing the URL based on your needs
      const url = `/demo-custom-tabs/demo.json`;

      return fetch(url)
        .then((res) => res.json())
    },
    {
      enabled: !!featureGroup, // Only start the query when the variable is not undefined
    }
  );
};

export default DataQuery;

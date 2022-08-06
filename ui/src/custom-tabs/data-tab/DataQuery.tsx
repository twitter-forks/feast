import { useQuery } from "react-query";

interface DataQueryInterface {
  featureView: string | undefined;
}

const DataQuery = (featureView: string) => {
  const response = fetch("https://featurestore.twitter.biz/hello").then((res) => res.text());
  console.log(response);

  const queryKey = `data-tab-namespace:${featureView}`;

  return useQuery<any>(
    queryKey,
    () => {
      // Customizing the URL based on your needs
      const url = `/demo-custom-tabs/demo.json`;

      return fetch(url)
        .then((res) => res.json())
    },
    {
      enabled: !!featureView, // Only start the query when the variable is not undefined
    }
  );
};

export default DataQuery;

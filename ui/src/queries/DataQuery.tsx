import { useQuery } from "react-query";

const DataQuery = () => {
  const url = window.location.href;
  console.log(url);

  return useQuery<any>(
    url,
    () => {
      const data_url = "http://0.0.0.0:8000/api/fetch_data"
      return fetch(data_url, {method: "POST", headers:{'content-type': 'text/plain'}, body: url}).then((res) => res.json())
    },
    {
      enabled: !!url, // Only start the query when the variable is not undefined
    }
  );
};

export default DataQuery;

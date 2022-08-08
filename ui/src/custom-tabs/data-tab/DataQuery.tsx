import { useQuery } from "react-query";

const DataQuery = () => {
  const url = window.location.href;
  console.log(url);

  // const response = fetch("https://featurestore.twitter.biz/api/hello").then((res) => {
  //   return res.json();
  // });
  // console.log(response);

  // const file = `/demo-custom-tabs/demo.json`;
  // const data = fetch(file).then((res) => res.json())
  // data.then(res => console.log(res));
  // console.log("DATA PRINT")
  // console.log(data);
  // return data;

  return useQuery<any>(
    url,
    () => {
      // Customizing the URL based on your needs
      // const data_url = `/demo-custom-tabs/demo.json`;
      const data_url = "http://0.0.0.0:8000/api/fetch_data"
      return fetch(data_url, {method: "POST", headers: {'content-type': 'text/plain'}, body: url}).then((res) => res.json())
    },
    {
      enabled: !!url, // Only start the query when the variable is not undefined
    }
  );
};

export default DataQuery;

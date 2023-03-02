const graphQlFetch = async (graphqlQuery: {}) => {
  const endpoint = "http://localhost:3005/react-graphql";
  const headers = {
    "content-type": "application/json",
    // "Authorization": "<token>"
  };

  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(graphqlQuery)
  };

      const response = await fetch(endpoint, options);
      const error = !response.ok ? false : response.status
      const  data  = await response.json();
      return error ? data : error
    

}

export { graphQlFetch }
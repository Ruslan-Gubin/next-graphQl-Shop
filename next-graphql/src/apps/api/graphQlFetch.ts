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
  try {
      const response = await fetch(endpoint, options);
      const { data } = await response.json();
      return data
    
  } catch (error) {
    throw new Error(`${error.message}`)
  }
}

export { graphQlFetch }
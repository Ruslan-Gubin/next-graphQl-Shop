const graphQlFetch = async (graphqlQuery) => {


  // const endpoint = `https://online-shop-bf1a.onrender.com/react-graphql`;
  // const endpoint = `http://localhost:3005/react-graphql`;
  const endpoint = `${process.env.API_HOST}`;
  
  
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
      const error = response.ok ? false : true
      const status = response.status
      const  data  = await response.json();

      if (!data) {
        throw new Error(`Error fetch ${response.url}`)
      }

      return {
        data: data && data,
        error: error ,
        status: status,
      } 
}

export { graphQlFetch }
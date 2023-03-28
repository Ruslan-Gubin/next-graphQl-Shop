import { URL_CONNECT } from "../constants/apiUrl";

const graphQlFetch = async (graphqlQuery) => {

  const endpoint = URL_CONNECT;

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
      const error = response.ok ? false : response.status
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
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL_CONNECT } from "../constants/apiUrl";


const client = new ApolloClient({
  uri: URL_CONNECT,
  cache: new InMemoryCache(),
});

export { client };

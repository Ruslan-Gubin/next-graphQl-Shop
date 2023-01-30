import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3005/react-graphql',
  cache: new InMemoryCache(),
});

export { client };

import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: `${process.env.API_RENDER}`,
  // uri: 'http://localhost:3005/react-graphql',
  // uri: 'https://online-shop-bf1a.onrender.com/react-graphql',
  cache: new InMemoryCache(),
});

export { client };

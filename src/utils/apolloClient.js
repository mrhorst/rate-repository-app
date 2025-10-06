import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

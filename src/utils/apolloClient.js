import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const link = new HttpLink({
  uri: Constants.expoConfig.extra.APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

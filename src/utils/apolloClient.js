import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { SetContextLink } from '@apollo/client/link/context';

const link = new HttpLink({
  uri: Constants.expoConfig.extra.APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async ({ headers }, _) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

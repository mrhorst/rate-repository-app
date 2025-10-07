import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-numberformat/polyfill';

// If you need locale-specific data for plural rules or number formatting,
// import them as well. For example, for English:
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/en';

import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={client}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}

import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-numberformat/polyfill';

// If you need locale-specific data for plural rules or number formatting,
// import them as well. For example, for English:
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/en';

import Main from './src/components/Main';

export default function App() {
  return <Main />;
}

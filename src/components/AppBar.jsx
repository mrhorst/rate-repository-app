import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarBackground,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  appBarText: {
    color: '#fff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  linkHitArea: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path={'/'}>Repositories</AppBarTab>
        <AppBarTab path={'/sign-in'}>Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

const AppBarTab = ({ children, path }) => {
  return (
    <View style={styles.tabContainer}>
      <Link to={path} style={styles.linkHitArea}>
        <Text style={styles.appBarText}>{children}</Text>
      </Link>
    </View>
  );
};

export default AppBar;

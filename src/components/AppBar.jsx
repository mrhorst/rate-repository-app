import { Text, View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarBackground,
    paddingLeft: 10,
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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab>Repositories</AppBarTab>
    </View>
  );
};

const AppBarTab = ({ children }) => {
  return (
    <View style={styles.tabContainer}>
      <Pressable>
        <Text style={styles.appBarText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;

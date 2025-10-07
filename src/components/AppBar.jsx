import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

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
  const { data } = useQuery(ME);
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path={'/'}>Repositories</AppBarTab>
        {data?.me === null ? (
          <AppBarTab path={'/sign-in'}>Sign In</AppBarTab>
        ) : (
          <AppBarTab onPress={signOut}>Sign Out</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

const AppBarTab = ({ onPress, children, path }) => {
  return path ? (
    <View style={styles.tabContainer}>
      <Link to={path} style={styles.linkHitArea}>
        <Text style={styles.appBarText}>{children}</Text>
      </Link>
    </View>
  ) : (
    <View style={styles.tabContainer}>
      <Pressable onPress={onPress} style={styles.linkHitArea}>
        <Text style={styles.appBarText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;

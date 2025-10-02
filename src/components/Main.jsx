import Constants from 'expo-constants';
import { Text, View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repo App</Text>
      <Text>
        <RepositoryList />
      </Text>
    </View>
  );
};

export default Main;

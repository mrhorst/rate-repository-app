import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd',
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const _renderItem = ({ item }) => {
  return <RepositoryItem item={item} />;
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;

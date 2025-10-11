import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { Button, IconButton, Menu, PaperProvider } from 'react-native-paper';

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

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
      // ListHeaderComponent={}
    />
  );
};

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [lastSelection, setLastSelection] = useState('Latest repositories');

  const [visible, setVisible] = useState(false);

  const { repositories } = useRepositories(orderDirection, orderBy);

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  const setLatestRepositories = () => {
    setOrderDirection('DESC');
    setOrderBy('CREATED_AT');
    setLastSelection('Latest repositories');
    closeMenu();
  };

  const setHighestRatedRepositories = () => {
    setOrderDirection('DESC');
    setOrderBy('RATING_AVERAGE');
    setLastSelection('Highest rated repositories');
    closeMenu();
  };

  const setLowestRatedRepositories = () => {
    setOrderDirection('ASC');
    setOrderBy('RATING_AVERAGE');
    setLastSelection('Lowest rated repositories');
    closeMenu();
  };

  return (
    <PaperProvider>
      <View>
        <View
          style={{
            backgroundColor: '#ddd',
            padding: 0,
            height: 80,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                  alignItems: 'center',
                  width: '100%',
                }}
                onPress={openMenu}
              >
                <Button textColor='#000'>{lastSelection}</Button>
                <IconButton icon='sort-variant' />
              </Pressable>
            }
          >
            <Menu.Item
              onPress={setLatestRepositories}
              title='Latest repositories'
            />
            <Menu.Item
              onPress={setHighestRatedRepositories}
              title='Highest rated repositories'
            />
            <Menu.Item
              onPress={setLowestRatedRepositories}
              title='Lowest rated repositories'
            />
          </Menu>
        </View>

        <RepositoryListContainer repositories={repositories} />
      </View>
    </PaperProvider>
  );
};

export default RepositoryList;

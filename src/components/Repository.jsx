import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const Repository = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;
  if (!data?.repository) return <Text>Repo not found</Text>;

  return <RepositoryItem item={data.repository} isDetailView={true} />;
};
export default Repository;

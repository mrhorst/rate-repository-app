import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-in-network',
  });

  const repositories = data?.repositories?.edges.map((edge) => edge.node);

  return { repositories, loading };
};

export default useRepositories;

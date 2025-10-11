import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderDirection, orderBy) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-in-network',
    variables: { orderDirection, orderBy },
  });

  const repositories = data?.repositories;

  return { repositories, loading };
};

export default useRepositories;

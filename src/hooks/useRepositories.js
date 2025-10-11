import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderDirection, orderBy, searchKeyword) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-in-network',
    variables: { orderDirection, orderBy, searchKeyword },
  });

  const repositories = data?.repositories;

  return { repositories, loading };
};

export default useRepositories;

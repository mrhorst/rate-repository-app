import { useApolloClient, useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { user: { username, password } },
    });

    await apolloClient.resetStore();
    return data;
  };

  return [signUp, result];
};

export default useSignUp;

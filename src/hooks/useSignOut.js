import { useApolloClient } from '@apollo/client/react';
import useAuthStorage from './useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return signOut;
};

export default useSignOut;

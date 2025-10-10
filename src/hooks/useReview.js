import { useApolloClient, useMutation } from '@apollo/client/react';
import { REVIEW } from '../graphql/mutations';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(REVIEW);

  const review = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: Number(rating), text },
      },
    });

    await apolloClient.resetStore();
    return data;
  };
  return [review, result];
};

export default useReview;

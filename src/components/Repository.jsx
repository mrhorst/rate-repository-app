import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { REPOSITORY, REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  ratingContainer: {
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 10,
    width: 40,
    height: 40,
  },
  ratingText: {
    fontWeight: theme.fontWeights.bold,
    paddingTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
  reviewInfoContainer: {
    justifyContent: 'space-between',
    flex: 1,
    gap: 8,
  },
  reviewHeaderContainer: {
    gap: 4,
  },
  reviewUsernameText: {
    fontWeight: theme.fontWeights.bold,
  },
  reviewDateText: {
    color: theme.colors.textSecondary,
  },
  reviewDescriptionContainer: {},
  reviewDescriptionText: {},
});

const RepositoryInfo = ({ repository }) => {
  if (repository?.loading) return <Text>Loading...</Text>;
  if (repository?.error) return <Text>Error!</Text>;
  if (!repository?.data?.repository) return <Text>Repo not found</Text>;

  return (
    <View>
      <RepositoryItem item={repository.data.repository} isDetailView={true} />
      <ItemSeparator />
    </View>
  );
};

export const ReviewItem = ({ review, myReviews = false }) => {
  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <View style={styles.reviewHeaderContainer}>
            <Text style={styles.reviewUsernameText}>
              {myReviews ? review.repository.fullName : review.user.username}
            </Text>
            <Text style={styles.reviewDateText}>
              {format(review.createdAt, 'MM.dd.yyyy')}
            </Text>
          </View>
          <View style={styles.reviewDescriptionContainer}>
            <Text style={styles.reviewDescriptionText}>{review.text}</Text>
          </View>
        </View>
      </View>
      {myReviews ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            gap: 50,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 3,
              padding: 5,
              flex: 1,
            }}
          >
            <Button color='white' title='View repository'></Button>
          </View>
          <View
            style={{
              backgroundColor: '#d33',
              borderRadius: 3,
              padding: 5,
              flex: 1,
            }}
          >
            <Button color='white' title='Delete review'></Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const repository = useQuery(REPOSITORY, {
    variables: { repositoryId: id },
  });

  const reviewsQuery = useQuery(REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = reviewsQuery.data
    ? reviewsQuery.data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews.reverse()}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;

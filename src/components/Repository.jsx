import { useNavigate, useParams } from 'react-router-native';
import { useMutation, useQuery } from '@apollo/client/react';
import { REPOSITORY, REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import theme from '../theme';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import { DELETE_REVIEW } from '../graphql/mutations';

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

const RepositoryInfo = ({ data, loading, error }) => {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;
  if (!data?.repository) return <Text>Repo not found</Text>;

  return (
    <View>
      <RepositoryItem item={data.repository} isDetailView={true} />
      <ItemSeparator />
    </View>
  );
};

export const ReviewItem = ({ refetch, review, myReviews = false }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await mutate({ variables: { deleteReviewId: review.id } });
            refetch();
          },
          style: 'destructive',
        },
      ]
    );
  };
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
            <Button
              onPress={() => navigate(Linking.openURL(review.repository.url))}
              color='white'
              title='View repository'
            ></Button>
          </View>
          <View
            style={{
              backgroundColor: '#d33',
              borderRadius: 3,
              padding: 5,
              flex: 1,
            }}
          >
            <Button
              onPress={handleDelete}
              color='white'
              title='Delete review'
            ></Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const variables = { repositoryId: id, first: 4 };

  const { data, loading, error, fetchMore, ...result } = useQuery(REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const reviews = data
    ? data.repository.reviews?.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryInfo data={data} loading={loading} error={error} />
      }
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;

import Text from './Text';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  repoCardContainer: {
    padding: 10,
    margin: 1,
    gap: 15,
  },
  repoCardAvatar: {
    flexDirection: 'row',
    gap: 10,
  },
  repoCardName: { flexShrink: 1, gap: 5 },
  repoCardStats: { flexDirection: 'row', justifyContent: 'space-around' },
  repoStat: { alignItems: 'center' },
  fullNameText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 3,
    padding: 5,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.repoCardContainer}>
      <View style={[styles.repoCardAvatar]}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={[styles.repoCardName]}>
          <Text style={styles.fullNameText}>{item.fullName}</Text>
          <Text style={{ color: theme.colors.textSecondary }}>
            {item.description}
          </Text>
          <View style={styles.languageContainer}>
            <Text style={{ color: theme.colors.textWhite }}>
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.repoCardStats}>
        <RepoStat label='Stars' stat={item.stargazersCount} />
        <RepoStat label='Forks' stat={item.forksCount} />
        <RepoStat label='Reviews' stat={item.reviewCount} />
        <RepoStat label='Rating' stat={item.ratingAverage} />
      </View>
    </View>
  );
};

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(number);
};

const RepoStat = ({ stat, label }) => {
  return (
    <View style={styles.repoStat}>
      <Text style={{ fontWeight: 'bold' }}>{formatNumber(stat)}</Text>
      <Text style={{ color: theme.colors.textSecondary }}>{label}</Text>
    </View>
  );
};
export default RepositoryItem;

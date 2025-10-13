import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query (
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $after: String
    $first: Int
  ) {
    repositories(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          forksCount
          description
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            repository {
              fullName
              url
            }
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const REPOSITORY = gql`
  query ($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      name
      language
      url
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      watchersCount
      reviews(after: $after, first: $first) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const REVIEWS = gql`
  query ($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(after: $after, first: $first) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

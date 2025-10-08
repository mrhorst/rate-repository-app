import { RepositoryListContainer } from '../../components/RepositoryList';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import formatNumber from '../../utils/formatNumber';
import { SignInForm } from '../../components/SignIn';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // grab node object
      const firstNode = repositories.edges[0].node;
      const secondNode = repositories.edges[1].node;

      // add all values into an array but remove last one (avatar url)
      const firstNodeValuesArray = Object.values(firstNode).slice(0, -1);
      const secondNodeValuesArray = Object.values(secondNode).slice(0, -1);

      // test all values using REGEX to see if firstRepositoryItem has textContent for 'value'
      firstNodeValuesArray.forEach((value) => {
        expect(firstRepositoryItem).toHaveTextContent(
          RegExp(formatNumber(value), 'i')
        );
      });

      secondNodeValuesArray.forEach((value) => {
        expect(secondRepositoryItem).toHaveTextContent(
          RegExp(formatNumber(value), 'i')
        );
      });
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('username'), 'matti');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password',
        });
      });
    });
  });
});

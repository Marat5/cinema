import {
  ApolloClient, InMemoryCache, createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LOCAL_STORAGE_TOKEN_KEY } from './constants';
import { Director } from './types';

// This setup looks awful compared to react query
// But trying a new library is worth this sacrifice

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/api/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const mergePages = <DataToBeMerged extends { totalCount: number }>(
  existing: DataToBeMerged,
  incoming: DataToBeMerged,
  { args }: { args: Record<string, any> | null },
  mergeField: keyof DataToBeMerged
) => {
  const existingArray = existing?.[mergeField] as any[] | undefined;
  const incomingArray = incoming[mergeField] as any[];
  const mergedArray = existingArray ? existingArray.slice() : [];

  incomingArray.forEach((_: any, index: number) => {
    mergedArray[(args!.offset ?? 0) + index] = incomingArray[index];
  });

  return {
    totalCount: incoming.totalCount,
    [mergeField]: mergedArray
  };
};

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Movie: {
        fields: {
          directorName: {
            read(_, { readField }) {
              const director = readField('director') as Director;
              return director?.name;
            }
          }
        }
      },
      Query: {
        fields: {
          directorsData: {
            keyArgs: false,
            merge: (existing, incoming, options) => mergePages(existing, incoming, options, 'directors')
          },
          moviesData: {
            keyArgs: ['orderBy'],
            merge: (existing, incoming, options) => mergePages(existing, incoming, options, 'movies')
          }
        }
      }
    }
  }),
});

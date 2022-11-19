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

const mergePages = <TData>(
  existing: TData[] | null,
  incoming: TData[],
  options: Record<string, any>
) => {
  const offset = options.args?.offset ?? 0;

  const mergedArray = existing ? existing.slice() : [];
  incoming.forEach((_, index: number) => {
    mergedArray[offset + index] = incoming[index];
  });

  return mergedArray;
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
          directors: {
            keyArgs: ['limit'],
            merge: mergePages
          },
          movies: {
            keyArgs: ['orderBy', 'limit'],
            merge: mergePages
          }
        }
      },
    }
  }),
});

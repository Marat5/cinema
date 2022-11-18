import {
  ApolloClient, InMemoryCache, createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LOCAL_STORAGE_TOKEN_KEY } from './constants';
import { Director } from './types';

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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          directorsData: {
            keyArgs: false,
            merge: (existing, incoming, { args }) => {
              const mergedDirectors: Director[] = existing?.directors
                ? existing.directors.slice() : [];

              incoming.directors.forEach((_: any, index: number) => {
                mergedDirectors[args!.offset + index] = incoming.directors[index];
              });
              return {
                totalCount: incoming.totalCount,
                directors: mergedDirectors
              };
            }
          }
        }
      }
    }
  }),
});

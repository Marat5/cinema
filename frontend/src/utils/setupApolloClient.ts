import {
  ApolloClient, InMemoryCache, createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LOCAL_STORAGE_TOKEN_KEY } from './constants';

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
  cache: new InMemoryCache(),
});

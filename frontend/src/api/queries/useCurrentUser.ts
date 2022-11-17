import { gql, useQuery } from '@apollo/client';

type UserData = {
  user: {
    username: string
  }
};

const GET_USER = gql`
    query GetUser {
        user {
            username
        }
    }
`;

const options = {
  errorPolicy: 'all', notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only', nextFetchPolicy: 'network-only'
} as const;

export const useCurrentUser = () => useQuery<UserData>(GET_USER, options);

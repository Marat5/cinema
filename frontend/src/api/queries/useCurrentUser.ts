import { gql, useQuery } from '@apollo/client';

type UserData = {
  user?: {
    id: number
    username: string
  }
};

const GET_USER = gql`
    query GetUser {
        user {
            id
            username
        }
    }
`;

const options = {
  errorPolicy: 'all', notifyOnNetworkStatusChange: true
} as const;

export const useCurrentUser = () => useQuery<UserData>(GET_USER, options);

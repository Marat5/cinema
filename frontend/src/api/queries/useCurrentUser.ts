import { gql, useQuery } from '@apollo/client';

type UserData = {
  user?: {
    id: number
    username: string
  }
};

const CURRENT_USER_QUERY = gql`
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

export const useCurrentUser = () => {
  const queryResult = useQuery<UserData>(CURRENT_USER_QUERY, options);
  const isLoggedIn = Boolean(queryResult.data?.user?.username);
  return { ...queryResult, isLoggedIn };
};

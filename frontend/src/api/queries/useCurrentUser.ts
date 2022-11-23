import { gql, useQuery } from '@apollo/client';
import { QUERY_NAMES } from '../../utils/constants';

type UserData = {
  user?: {
    id: number
    username: string
  }
};

const GET_USER = gql`
    query ${QUERY_NAMES.useCurrentUser} {
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
  const queryResult = useQuery<UserData>(GET_USER, options);
  const isLoggedIn = Boolean(queryResult.data?.user?.username);
  return { ...queryResult, isLoggedIn };
};

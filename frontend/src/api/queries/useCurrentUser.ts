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

export const useCurrentUser = () => useQuery<UserData>(GET_USER);

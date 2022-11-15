import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
    mutation LoginMutation(
        $username: String!
        $password: String!
    ) {
    login(username: $username, password: $password) {
        token
    }
    }
`;

export const useLoginMutation = () => useMutation(LOGIN);

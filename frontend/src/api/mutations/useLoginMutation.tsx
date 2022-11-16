import { gql, useMutation } from '@apollo/client';
import { LoginFormValues } from '../../pages/LoginPage/types';

type LoginData = {
  login: {
    token: string
  }
};

type LoginMutationVars = LoginFormValues;

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

export const useLoginMutation = () => useMutation<LoginData, LoginMutationVars>(LOGIN);

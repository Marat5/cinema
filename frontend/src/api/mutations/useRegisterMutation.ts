import { gql, useMutation } from '@apollo/client';

type RegisterData = {
  register: {
    token: string
  }
};

export type RegisterMutationVars = {
  username: string
  password: string
};

const REGISTER = gql`
    mutation RegisterMutation(
        $username: String!
        $password: String!
    ) {
    register(username: $username, password: $password) {
        token
    }
    }
`;

export const useRegisterMutation = () => useMutation<RegisterData, RegisterMutationVars>(REGISTER);

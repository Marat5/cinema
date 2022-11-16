import { ApolloError } from '@apollo/client';

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Sets formik errors from graphql errors
export const setFormikErrors = (
  e: ApolloError,
  setFieldError: (field: string, message: string) => void
) => {
  e.graphQLErrors.forEach((err) => {
    setFieldError(err.extensions.field as string, err.message);
  });
};

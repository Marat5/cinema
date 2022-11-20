import { gql, useMutation } from '@apollo/client';

type DeleteMovieData = string;

type DeleteMovieVars = { id: number };

const DELETE_MOVIE = gql`
    mutation DeleteMovieMutation ($id: ID!) {
      deleteMovie(id: $id)
    }
`;

export const useDeleteMovieMutation = () => useMutation<DeleteMovieData, DeleteMovieVars>(
  DELETE_MOVIE
);

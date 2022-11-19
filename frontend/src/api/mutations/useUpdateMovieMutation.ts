import { gql, useMutation } from '@apollo/client';
import { MovieFormValues } from '../../components/MovieForm/MovieForm';
import { Movie } from '../../utils/types';

type UpdateMovieData = {
  movie: Movie
};

type UpdateMovieVars = MovieFormValues;

const UPDATE_MOVIE = gql`
    mutation UpdateMovieMutation(
        $id: ID!
        $title: String
        $directorName: String
        $year: Int
        $rating: Float
    ) {
      updateMovie(id: $id, title: $title, directorName: $directorName, year: $year, rating: $rating) {
        id
        title
        rating
        year
        director {
            name
        }
        directorName@client
      }
    }
`;

export const useUpdateMovieMutation = () => useMutation<UpdateMovieData, UpdateMovieVars>(
  UPDATE_MOVIE
);

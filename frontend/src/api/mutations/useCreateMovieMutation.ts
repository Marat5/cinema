import { gql, useMutation } from '@apollo/client';
import { Movie } from '../../utils/types';

type CreateMovieData = {
  createMovie: Movie
};

type CreateMovieVars = Movie;

const CREATE_MOVIE = gql`
    mutation CreateMovieMutation(
        $title: String
        $directorName: String
        $year: Int
        $rating: Float
    ) {
      createMovie(title: $title, directorName: $directorName, year: $year, rating: $rating) {
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

export const useCreateMovieMutation = () => useMutation<CreateMovieData, CreateMovieVars>(
  CREATE_MOVIE
);

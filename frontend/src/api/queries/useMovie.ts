import { gql, useQuery } from '@apollo/client';
import { Movie } from '../../utils/types';
import { useCurrentUser } from './useCurrentUser';

type MovieResponse = {
  movie: Movie
};

type MovieVars = {
  movieId: number
};

const GET_MOVIE = gql`
    query GetMovie($movieId: ID!) {
      movie(movieId: $movieId) {
        id
        title
        rating
        year
        addedBy
        director {
            name
        }
        directorName@client
      }
    }
`;

export const useMovie = (movieId: string) => {
  const { data: currentUser } = useCurrentUser();

  const queryResult = useQuery<MovieResponse, MovieVars>(
    GET_MOVIE,
    {
      variables: {
        movieId: Number(movieId)
      }
    }
  );

  const isCurrentUserAllowedToEdit = Number(currentUser?.user?.id)
  === Number(queryResult.data?.movie.addedBy);

  return { ...queryResult, isCurrentUserAllowedToEdit };
};

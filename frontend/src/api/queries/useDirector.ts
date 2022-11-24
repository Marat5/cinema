import { gql, useQuery } from '@apollo/client';
import { Director } from '../../utils/types';

type DirectorResponse = {
  director: Director
};

type DirectorVars = {
  directorId: number
};

const DIRECTOR_QUERY = gql`
    query GetDirector($directorId: ID!) {
      director(directorId: $directorId) {
        id
        name
        averageRating
        moviesWatched
      }
    }
`;

export const useDirector = (directorId: string) => useQuery<DirectorResponse, DirectorVars>(
  DIRECTOR_QUERY,
  {
    variables: {
      directorId: Number(directorId)
    }
  }
);

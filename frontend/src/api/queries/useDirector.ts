import { gql, useQuery } from '@apollo/client';
import { QUERY_NAMES } from '../../utils/constants';
import { Director } from '../../utils/types';

type DirectorResponse = {
  director: Director
};

type DirectorVars = {
  directorId: number
};

const GET_DIRECTOR = gql`
    query ${QUERY_NAMES.useDirector}($directorId: ID!) {
      director(directorId: $directorId) {
        id
        name
        averageRating
        moviesWatched
      }
    }
`;

export const useDirector = (directorId: string) => useQuery<DirectorResponse, DirectorVars>(
  GET_DIRECTOR,
  {
    variables: {
      directorId: Number(directorId)
    }
  }
);

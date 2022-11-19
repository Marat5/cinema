import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE, QUERY_NAMES } from '../../utils/constants';
import { Director, PaginatedQueryVars } from '../../utils/types';

export type DirectorsData = {
  directors: Director[]
  directorsCount: number
};

export type DirectorsVars = PaginatedQueryVars;

const GET_DIRECTORS = gql`
    query ${QUERY_NAMES.useDirectors}($limit: Int, $offset: Int) {
      directors(limit: $limit, offset: $offset) {
        id
        name
        averageRating
        moviesWatched
      }
      directorsCount
    }
`;

export const useDirectors = () => {
  const queryResult = useQuery<DirectorsData, DirectorsVars>(GET_DIRECTORS, {
    variables: { limit: LIST_PAGE_SIZE, offset: 0 },
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    queryResult.fetchMore({
      variables: { offset: queryResult.data?.directors.length }
    });
  };

  const isAllDataLoaded = Boolean(queryResult.data?.directors.length
     === queryResult.data?.directorsCount);

  return { ...queryResult, isAllDataLoaded, loadMore };
};

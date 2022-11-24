import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE } from '../../utils/constants';
import { Director, PaginatedQueryVars } from '../../utils/types';

export type DirectorsData = {
  directors: Director[]
  directorsCount: number
};

export type DirectorsVars = PaginatedQueryVars;

const DIRECTORS_QUERY_INITIAL_VARS: DirectorsVars = { limit: LIST_PAGE_SIZE, offset: 0 };

const DIRECTORS_QUERY = gql`
    query GetDirectors($limit: Int, $offset: Int) {
      directors(limit: $limit, offset: $offset) {
        id
        name
        averageRating
        moviesWatched
      }
      directorsCount
    }
`;

export const REFETCH_DIRECTORS_QUERY = {
  query: DIRECTORS_QUERY,
  variables: DIRECTORS_QUERY_INITIAL_VARS
};

export const useDirectors = () => {
  const queryResult = useQuery<DirectorsData, DirectorsVars>(DIRECTORS_QUERY, {
    variables: DIRECTORS_QUERY_INITIAL_VARS,
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

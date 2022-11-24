import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE } from '../../utils/constants';
import { Movie, OrderedQueryVars, PaginatedQueryVars } from '../../utils/types';

export enum MoviesSortOption {
  RATING = 'rating',
  SEEN_LATELY = 'added'
}

type MoviesData = {
  movies: Movie[]
  moviesCount: number
};

type MoviesVars = PaginatedQueryVars & OrderedQueryVars<MoviesSortOption>;

// There are two sets of initial vars for movies queries
// Because Movies sorted in different order are different queries, stored separately
const MOVIES_QUERY_INITIAL_VARS_ARRAY: MoviesVars[] = [
  { limit: LIST_PAGE_SIZE, offset: 0, orderBy: MoviesSortOption.RATING },
  { limit: LIST_PAGE_SIZE, offset: 0, orderBy: MoviesSortOption.SEEN_LATELY }
];

const MOVIES_QUERY = gql`
    query GetMovies($orderBy: String, $limit: Int, $offset: Int) {
      movies(orderBy: $orderBy, limit: $limit, offset: $offset) {
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
      moviesCount
    }
`;

export const REFETCH_MOVIES_QUERIES = MOVIES_QUERY_INITIAL_VARS_ARRAY.map(
  (initialVars) => ({ query: MOVIES_QUERY, variables: initialVars })
);

export const useMovies = (sort: MoviesSortOption) => {
  const initialVars = sort === MoviesSortOption.RATING
    ? MOVIES_QUERY_INITIAL_VARS_ARRAY[0] : MOVIES_QUERY_INITIAL_VARS_ARRAY[1];

  const queryResult = useQuery<MoviesData, MoviesVars>(MOVIES_QUERY, {
    variables: initialVars,
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    queryResult.fetchMore({
      variables: { offset: queryResult.data?.movies.length }
    });
  };

  const isAllDataLoaded = Boolean(queryResult.data?.movies.length
    === queryResult.data?.moviesCount);

  return { ...queryResult, loadMore, isAllDataLoaded };
};

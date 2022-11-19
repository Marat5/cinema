import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE, QUERY_NAMES } from '../../utils/constants';
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

const GET_MOVIES = gql`
    query ${QUERY_NAMES.useMovies}($orderBy: String, $limit: Int, $offset: Int) {
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

export const useMovies = (sort: MoviesSortOption) => {
  const queryResult = useQuery<MoviesData, MoviesVars>(GET_MOVIES, {
    variables: { limit: LIST_PAGE_SIZE, offset: 0, orderBy: sort },
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

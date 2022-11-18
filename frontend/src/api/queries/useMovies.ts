import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE } from '../../utils/constants';
import { Movie, OrderedQueryVars, PaginatedQueryVars } from '../../utils/types';

export enum MoviesSortOption {
  RATING = 'rating',
  SEEN_LATELY = 'added'
}

type MoviesData = {
  moviesData: {
    totalCount: number
    movies: Movie[]
  }
};

type MoviesVars = PaginatedQueryVars & OrderedQueryVars<MoviesSortOption>;

const GET_MOVIES = gql`
    query GetMovies($orderBy: String, $limit: Int, $offset: Int) {
        moviesData(orderBy: $orderBy, limit: $limit, offset: $offset) {
            totalCount
            movies {
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
    }
`;

export const useMovies = (sort: MoviesSortOption) => {
  const queryResult = useQuery<MoviesData, MoviesVars>(GET_MOVIES, {
    variables: { limit: LIST_PAGE_SIZE, offset: 0, orderBy: sort },
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    queryResult.fetchMore({
      variables: { offset: queryResult.data?.moviesData.movies.length }
    });
  };

  const isAllDataLoaded = Boolean(queryResult.data?.moviesData.movies.length
    === queryResult.data?.moviesData.totalCount);

  return { ...queryResult, loadMore, isAllDataLoaded };
};

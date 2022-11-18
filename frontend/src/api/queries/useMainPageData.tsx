import { gql, useQuery } from '@apollo/client';
import { MAIN_PAGE_CARD_ITEMS_COUNT } from '../../utils/constants';
import { Director, Movie } from '../../utils/types';

export type MainPageMovie = Pick<Movie, 'title'>;
export type MainPageDirector = Pick<Director, 'name'>;

type MainPageMoviesData = {
  movies: MainPageMovie[]
  totalCount: number
};

type MainPageData = {
  topRatedMovies: MainPageMoviesData
  recentlyWatchedMovies: MainPageMoviesData
  directorsData: {
    directors: MainPageDirector[]
    totalCount: number
  }
};

type MainPageVars = {
  limit: typeof MAIN_PAGE_CARD_ITEMS_COUNT
};

const GET_ALL_MAIN_PAGE_DATA = gql`
    query GetAllMainPageData($limit: Int) {
        topRatedMovies: moviesData(orderBy: "rating", limit: $limit) {
          totalCount
          movies {
            title
          }        }
        recentlyWatchedMovies: moviesData(orderBy: "added", limit: $limit) {
          totalCount
          movies {
            title
          }
        }
        directorsData(limit: $limit) {
            totalCount
            directors {
                name
            }
        }
    }
`;

export const useMainPageData = () => useQuery<MainPageData, MainPageVars>(GET_ALL_MAIN_PAGE_DATA, {
  variables: {
    limit: MAIN_PAGE_CARD_ITEMS_COUNT,
  }
});

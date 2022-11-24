import { gql, useQuery } from '@apollo/client';
import { MAIN_PAGE_CARD_ITEMS_COUNT } from '../../utils/constants';
import { Director, Movie } from '../../utils/types';

export type MainPageMovie = Pick<Movie, 'title'>;
export type MainPageDirector = Pick<Director, 'name'>;

type MainPageData = {
  topRatedMovies: MainPageMovie[]
  recentlyWatchedMovies: MainPageMovie[]
  directors: MainPageDirector[]
};

type MainPageVars = {
  limit: typeof MAIN_PAGE_CARD_ITEMS_COUNT
};

const MAIN_PAGE_DATA_INITIAL_VARS: MainPageVars = {
  limit: MAIN_PAGE_CARD_ITEMS_COUNT,
} as const;

const MAIN_PAGE_DATA_QUERY = gql`
    query GetAllMainPageData($limit: Int) {
        topRatedMovies: movies(orderBy: "rating", limit: $limit) {
          title
        }
        recentlyWatchedMovies: movies(orderBy: "added", limit: $limit) {
          title
        }
        directors(limit: $limit) {
          name
        }
    }
`;

export const REFETCH_MAIN_PAGE_DATA_QUERY = {
  query: MAIN_PAGE_DATA_QUERY,
  variables: MAIN_PAGE_DATA_INITIAL_VARS
};

export const useMainPageData = () => useQuery<MainPageData, MainPageVars>(MAIN_PAGE_DATA_QUERY, {
  variables: MAIN_PAGE_DATA_INITIAL_VARS
});

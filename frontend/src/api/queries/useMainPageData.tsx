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

const GET_ALL_MAIN_PAGE_DATA = gql`
    query GetAllMainPageData {
        topRatedMovies: movies(orderBy: "rating", limit: ${MAIN_PAGE_CARD_ITEMS_COUNT}) {
            title
        }
        recentlyWatchedMovies: movies(orderBy: "added", limit: ${MAIN_PAGE_CARD_ITEMS_COUNT}) {
            title
        }
        directors(limit: ${MAIN_PAGE_CARD_ITEMS_COUNT}) {
            name
            average_rating
        }
    }
`;

export const useMainPageData = () => useQuery<MainPageData>(GET_ALL_MAIN_PAGE_DATA);

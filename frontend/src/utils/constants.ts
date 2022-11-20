// Colors are set in index.css
export const COLORS = {
  primaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color'),
  secondaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--secondary-color'),
  tertiaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--tertiary-color'),
  dangerColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--danger-color'),
};

export const MAIN_PAGE_CARD_ITEMS_COUNT = 5;
export const LIST_PAGE_SIZE = 16;

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export const QUERY_NAMES = {
  useMainPageData: 'GetAllMainPageData',
  useCurrentUser: 'GetUser',
  useDirector: 'GetDirector',
  useDirectors: 'GetDirectors',
  useMovie: 'GetMovie',
  useMovies: 'GetMovies'
};

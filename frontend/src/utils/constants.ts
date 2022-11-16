import { Director } from './types';

// Colors are set in index.css
export const COLORS = {
  primaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color'),
  secondaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--secondary-color'),
  tertiaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--tertiary-color'),
};

export const MAIN_PAGE_CARD_ITEMS_COUNT = 5;

// TMP data, remove when connected to backend
export const MOVIES = [
  {
    title: 'Rushmore',
    id: 1,
    director_name: 'Wes Anderson',
    year: 1994,
    rating: 10,
  },
  {
    title: 'Moonrise Kingdom',
    id: 2,
    director_name: 'Wes Anderson',
    year: 1994,
    rating: 10,
  },
  {
    title: 'The Grand Budapest Hotel',
    id: 3,
    director_name: 'Wes Anderson',
    year: 1994,
    rating: 10,
  },
  {
    title: 'Isle of Dogs',
    id: 4,
    director_name: 'Wes Anderson',
    year: 1994,
    rating: 10,
  },
  {
    title: 'The Darjeeling Limited',
    id: 5,
    director_name: 'Wes Anderson',
    year: 1994,
    rating: 10,
  },
];

export const DIRECTORS: Director[] = [{
  id: 1,
  name: 'Wes Anderson',
  average_rating: 10,
  movies_watched: 3
}];

// End of tmp data

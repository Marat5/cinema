// Colors are set in index.css
export const COLORS = {
  primaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color'),
  secondaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--secondary-color'),
  tertiaryColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--tertiary-color'),
};

export const ROUTES = {
  login: '/login',
  register: '/register',
  movies: '/movies',
};

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
// End of tmp data

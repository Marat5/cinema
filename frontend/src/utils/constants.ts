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
  },
  {
    title: 'Moonrise Kingdom',
  },
  {
    title: 'The Grand Budapest Hotel',
  },
  {
    title: 'Isle of Dogs',
  },
  {
    title: 'The Darjeeling Limited',
  },
];
// End of tmp data

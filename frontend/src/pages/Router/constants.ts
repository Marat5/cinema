export const ROUTES = {
  main: '/',
  login: '/login',
  register: '/register',
  movies: '/movies',
  moviesRoutes: {
    add: '/movies/add',
    id: '/movies/:id'
  },
  directors: '/directors',
  directorsRoutes: {
    id: '/directors/:id'
  }
} as const;

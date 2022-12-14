export const ROUTES = {
  main: '/',
  login: '/login',
  register: '/register',
  movies: '/movies',
  moviesRoutes: {
    create: '/movies/create',
    id: '/movies/:id'
  },
  directors: '/directors',
  directorsRoutes: {
    id: '/directors/:id'
  }
} as const;

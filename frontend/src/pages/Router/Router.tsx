import { Route, Routes } from 'react-router-dom';
import { MovieListPage } from '../MovieListPage/MovieListPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { MainPage } from '../MainPage/MainPage';
import { CommonLayout } from '../../components/CommonLayout/CommonLayout';
import { DirectorListPage } from '../DirectorListPage/DirectorListPage';
import { ROUTES } from './constants';
import { MovieAddPage } from '../MovieAddPage/MovieAddPage';
import { MoviePage } from '../MoviePage/MoviePage';
import { DirectorPage } from '../DirectorPage/DirectorPage';

export const Router = () => (
  <Routes>
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.register} element={<RegisterPage />} />

    <Route element={<CommonLayout />}>
      <Route path="/" element={<MainPage />} />
      <Route path={ROUTES.movies} element={<MovieListPage />} />
      <Route path={ROUTES.directors} element={<DirectorListPage />} />
      <Route path={ROUTES.moviesRoutes.add} element={<MovieAddPage />} />
      <Route path={ROUTES.moviesRoutes.id} element={<MoviePage />} />
      <Route path={ROUTES.directorsRoutes.id} element={<DirectorPage />} />
    </Route>
  </Routes>
);
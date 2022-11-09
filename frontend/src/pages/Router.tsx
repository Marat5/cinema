import { Route, Routes } from 'react-router-dom';
import { MovieListPage } from './MovieListPage/MovieListPage';
import { LoginPage } from './LoginPage/LoginPage';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { MainPage } from './MainPage/MainPage';
import { ROUTES } from '../utils/constants';
import { CommonLayout } from '../components/CommonLayout/CommonLayout';

export const Router = () => (
  <Routes>
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.register} element={<RegisterPage />} />

    <Route element={<CommonLayout />}>
      <Route path="/" element={<MainPage />} />
      <Route path={ROUTES.movies} element={<MovieListPage />} />
    </Route>
  </Routes>
);

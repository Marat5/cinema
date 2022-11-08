import { Route, Routes } from 'react-router-dom';
import { MovieListPage } from './MovieListPage/MovieListPage';
import { LoginPage } from './LoginPage/LoginPage';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { MainPage } from './MainPage/MainPage';
import { ROUTES } from '../utils/constants';

export const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path={ROUTES.register} element={<RegisterPage />} />
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.movies} element={<MovieListPage />} />
  </Routes>
);

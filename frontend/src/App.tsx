import React from 'react';
import 'the-new-css-reset/css/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieListPage } from './pages/MovieList/MovieListPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

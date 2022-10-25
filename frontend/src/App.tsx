import React from 'react';
import './App.css';
import 'the-new-css-reset/css/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieListPage } from './pages/MovieList/MovieListPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

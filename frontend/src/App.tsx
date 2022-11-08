import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'the-new-css-reset/css/reset.css';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Router as AppRoutes } from './pages/Router';

const App = () => (
  <BrowserRouter>
    <AppHeader />
    <AppRoutes />
  </BrowserRouter>
);

export default App;

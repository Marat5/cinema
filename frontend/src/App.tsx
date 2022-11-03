import React from 'react';
import 'the-new-css-reset/css/reset.css';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Router } from './pages/Router';

function App() {
  return (
    <>
      <AppHeader />
      <Router />
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'the-new-css-reset/css/reset.css';
import { ApolloProvider } from '@apollo/client';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Router as AppRoutes } from './pages/Router/Router';
import { apolloClient } from './utils/setupApolloClient';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'the-new-css-reset/css/reset.css';
import {
  ApolloClient, InMemoryCache, ApolloProvider
} from '@apollo/client';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Router as AppRoutes } from './pages/Router/Router';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/api/graphql/',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;

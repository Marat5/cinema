import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login link', () => {
  render(<App />);
  const topRatedMoviesCard = screen.getByText(/Top rated movies/i);
  expect(topRatedMoviesCard).toBeInTheDocument();
});

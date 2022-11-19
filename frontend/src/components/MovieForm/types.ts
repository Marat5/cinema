import { Movie } from '../../utils/types';

export type MovieFormValues = {
  id: number,
  rating: string,
  year: string
} & Omit<Movie, 'id' | 'rating' | 'year'>;

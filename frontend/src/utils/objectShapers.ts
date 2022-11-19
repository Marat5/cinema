import { RegisterMutationVars } from '../api/mutations/useRegisterMutation';
import { MovieFormValues } from '../components/MovieForm/types';
import { RegisterFormValues } from '../pages/RegisterPage/types';
import { Movie } from './types';

export const mapRegisterFormToGQL = (values: RegisterFormValues): RegisterMutationVars => ({
  username: values.username,
  password: values.password1
});

export const mapMovieToFormMovie = (movie?: Movie): MovieFormValues | undefined => {
  if (!movie) {
    return undefined;
  }

  return {
    ...movie,
    rating: String(movie.rating),
    year: String(movie.year)
  };
};

export const mapFormMovieToMovie = (movie?: MovieFormValues): Movie | undefined => {
  if (!movie) {
    return undefined;
  }
  return {
    ...movie,
    rating: Number(movie.rating),
    year: Number(movie.year)
  };
};

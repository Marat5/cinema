import { MovieForm } from '../../components/MovieForm/MovieForm';
import { useCreateMovieSubmit } from '../../hooks/useCreateMovieSubmit';

export const MovieCreatePage = () => {
  const [onCreateMovieSubmit, { loading: isSubmitting }] = useCreateMovieSubmit();

  return (
    <MovieForm
      isEditing
      isSubmitting={isSubmitting}
      onSubmit={onCreateMovieSubmit}
    />
  );
};

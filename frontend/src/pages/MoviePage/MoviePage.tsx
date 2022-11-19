import { useParams } from 'react-router-dom';
import { ResourceNotFound } from '../../components/ResourceNotFound/ResourceNotFound';
import { MovieForm } from '../../components/MovieForm/MovieForm';
import { useMovie } from '../../api/queries/useMovie';
import { useUpdateMovieSubmit } from '../../hooks/useUpdateMovieSubmit';

export const MoviePage = () => {
  const { id } = useParams();
  const { data, loading, isCurrentUserAllowedToEdit } = useMovie(id as string);

  const [onUpdateMovieSubmit, {
    loading: isSubmitting,
    isEditing, setIsEditing
  }] = useUpdateMovieSubmit();

  return (
    (data?.movie || loading) ? (
      <MovieForm
        loadedInitialValues={data?.movie}
        isCurrentUserAllowedToEdit={isCurrentUserAllowedToEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSubmit={onUpdateMovieSubmit}
        isLoading={loading}
        isSubmitting={isSubmitting}
      />
    ) : (
      <ResourceNotFound resourceName="Movie" resourceId={String(id)} />
    )
  );
};

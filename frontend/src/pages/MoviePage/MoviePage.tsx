import { useParams } from 'react-router-dom';
import { ResourceNotFound } from '../../commonComponents/ResourceNotFound/ResourceNotFound';
import { MovieForm } from '../../commonComponents/MovieForm/MovieForm';
import { useMovie } from '../../api/queries/useMovie';
import { useUpdateMovieSubmit } from '../../hooks/useUpdateMovieSubmit';
import { mapMovieToFormMovie } from '../../utils/objectShapers';
import { useOnDeleteMovie } from '../../hooks/useOnDeleteMovie';

export const MoviePage = () => {
  const { id } = useParams();
  const { data, loading, isCurrentUserAllowedToEdit } = useMovie(id as string);

  const [onUpdateMovieSubmit, {
    loading: isSubmitting,
    isEditing, setIsEditing
  }] = useUpdateMovieSubmit();

  const [onDeleteMovie, { loading: isDeleting }] = useOnDeleteMovie(Number(id));

  return (
    (data?.movie || loading) ? (
      <MovieForm
        loadedInitialValues={mapMovieToFormMovie(data?.movie)}
        isCurrentUserAllowedToEdit={isCurrentUserAllowedToEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSubmit={onUpdateMovieSubmit}
        isLoading={loading}
        isSubmitting={isSubmitting}
        onDelete={onDeleteMovie}
        isDeleting={isDeleting}
      />
    ) : (
      <ResourceNotFound resourceName="Movie" resourceId={String(id)} />
    )
  );
};

import { useNavigate } from 'react-router-dom';
import { useDeleteMovieMutation } from '../api/mutations/useDeleteMovieMutation';
import { ROUTES } from '../pages/Router/constants';
import { QUERY_NAMES } from '../utils/constants';

export const useOnDeleteMovie = (id: number) => {
  const [deleteMovie, mutationResult] = useDeleteMovieMutation();
  const navigate = useNavigate();

  const onDeleteMovie = () => {
    deleteMovie({
      variables: { id },
      onCompleted: () => {
        navigate(ROUTES.movies);
      },
      refetchQueries: [
        QUERY_NAMES.useMainPageData,
        QUERY_NAMES.useMovies,
        QUERY_NAMES.useDirectors]
    });
  };

  return [onDeleteMovie, mutationResult] as const;
};

import { useNavigate } from 'react-router-dom';
import { useDeleteMovieMutation } from '../api/mutations/useDeleteMovieMutation';
import { REFETCH_DIRECTORS_QUERY } from '../api/queries/useDirectors';
import { REFETCH_MAIN_PAGE_DATA_QUERY } from '../api/queries/useMainPageData';
import { REFETCH_MOVIES_QUERIES } from '../api/queries/useMovies';
import { ROUTES } from '../pages/Router/constants';

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
        REFETCH_MAIN_PAGE_DATA_QUERY,
        REFETCH_DIRECTORS_QUERY,
        ...REFETCH_MOVIES_QUERIES,
      ]
    });
  };

  return [onDeleteMovie, mutationResult] as const;
};

import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation } from '../api/mutations/useCreateMovieMutation';
import { REFETCH_DIRECTORS_QUERY } from '../api/queries/useDirectors';
import { REFETCH_MAIN_PAGE_DATA_QUERY } from '../api/queries/useMainPageData';
import { REFETCH_MOVIES_QUERIES } from '../api/queries/useMovies';
import { MovieFormValues } from '../commonComponents/MovieForm/types';
import { ROUTES } from '../pages/Router/constants';
import { mapFormMovieToMovie } from '../utils/objectShapers';
import { OnSubmitOrResetType } from '../utils/types';
import { setFormikErrors } from '../utils/utils';

export const useCreateMovieSubmit = () => {
  const [createMovie, mutationResult] = useCreateMovieMutation();
  const navigate = useNavigate();

  const onSubmit: OnSubmitOrResetType<MovieFormValues> = (values, actions) => {
    createMovie({
      variables: mapFormMovieToMovie(values),
      onCompleted: (data) => {
        navigate(`${ROUTES.movies}/${data.createMovie.id}`);
      },
      onError: (e) => setFormikErrors(e, actions.setFieldError),
      refetchQueries: [
        REFETCH_MAIN_PAGE_DATA_QUERY,
        REFETCH_DIRECTORS_QUERY,
        ...REFETCH_MOVIES_QUERIES,
      ]

    });
  };

  return [onSubmit, mutationResult] as const;
};

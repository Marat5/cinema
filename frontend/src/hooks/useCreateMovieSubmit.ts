import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation } from '../api/mutations/useCreateMovieMutation';
import { MovieFormValues } from '../components/MovieForm/types';
import { ROUTES } from '../pages/Router/constants';
import { QUERY_NAMES } from '../utils/constants';
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
      refetchQueries: [QUERY_NAMES.useMainPageData, QUERY_NAMES.useMovies]
    });
  };

  return [onSubmit, mutationResult] as const;
};

import { useState } from 'react';
import { useUpdateMovieMutation } from '../api/mutations/useUpdateMovieMutation';
import { REFETCH_DIRECTORS_QUERY } from '../api/queries/useDirectors';
import { REFETCH_MAIN_PAGE_DATA_QUERY } from '../api/queries/useMainPageData';
import { REFETCH_MOVIES_QUERIES } from '../api/queries/useMovies';
import { MovieFormValues } from '../commonComponents/MovieForm/types';
import { mapFormMovieToMovie } from '../utils/objectShapers';
import { OnSubmitOrResetType } from '../utils/types';
import { setFormikErrors } from '../utils/utils';

export const useUpdateMovieSubmit = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [updateMovie, mutationResult] = useUpdateMovieMutation();

  const onSubmit: OnSubmitOrResetType<MovieFormValues> = (values, actions) => {
    updateMovie({
      variables: mapFormMovieToMovie(values),
      onCompleted: () => {
        setIsEditing(false);
      },
      onError: (e) => setFormikErrors(e, actions.setFieldError),
      refetchQueries: [
        REFETCH_MAIN_PAGE_DATA_QUERY,
        REFETCH_DIRECTORS_QUERY,
        ...REFETCH_MOVIES_QUERIES
      ]
    });
  };

  return [onSubmit, { ...mutationResult, isEditing, setIsEditing }] as const;
};

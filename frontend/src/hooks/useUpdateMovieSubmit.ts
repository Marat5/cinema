import { useState } from 'react';
import { useUpdateMovieMutation } from '../api/mutations/useUpdateMovieMutation';
import { MovieFormValues } from '../components/MovieForm/types';
import { QUERY_NAMES } from '../utils/constants';
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
      refetchQueries: [QUERY_NAMES.useDirectors]
    });
  };

  return [onSubmit, { ...mutationResult, isEditing, setIsEditing }] as const;
};

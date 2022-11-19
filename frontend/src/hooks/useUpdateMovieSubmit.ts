import { useState } from 'react';
import { useUpdateMovieMutation } from '../api/mutations/useUpdateMovieMutation';
import { MovieFormValues } from '../components/MovieForm/MovieForm';
import { OnSubmitOrResetType } from '../utils/types';
import { setFormikErrors } from '../utils/utils';

export const useUpdateMovieSubmit = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [updateMovie, mutationResult] = useUpdateMovieMutation();

  const onSubmit: OnSubmitOrResetType<MovieFormValues> = (values, actions) => {
    updateMovie({
      variables: {
        ...values,
        year: Number(values.year),
        rating: Number(values.rating)
      },
      onCompleted: () => {
        setIsEditing(false);
      },
      onError: (e) => setFormikErrors(e, actions.setFieldError),
    });
  };

  return [onSubmit, { ...mutationResult, isEditing, setIsEditing }] as const;
};

import { FormikHelpers } from 'formik';

export type Movie = {
  id: number
  title: string
  director_name: string
  year: number
  rating: number
};

export type Director = {
  id: number
  name: string
  average_rating: number
};

// Use to type submit and reset functions for formik forms
export type OnSubmitOrResetType<FormValuesType> =
    (values: FormValuesType, actions: FormikHelpers<FormValuesType>) => void;

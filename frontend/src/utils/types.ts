import { FormikHelpers } from 'formik';

export type Movie = {
  id: number
  title: string
  directorName: string
  added_by: number
  year: number
  rating: number
};

export type Director = {
  id: number
  name: string
  average_rating: number
  movies_watched: number
};

// Use to type submit and reset functions for formik forms
export type OnSubmitOrResetType<FormValuesType> =
    (values: FormValuesType, actions: FormikHelpers<FormValuesType>) => void;

export type PaginatedQueryVars = {
  limit: number
  offset: number
};

export type OrderedQueryVars<SortOption> = {
  orderBy: SortOption
};

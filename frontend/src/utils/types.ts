import { FormikHelpers } from 'formik';

export type Movie = {
  id: number
  title: string
  directorName: string
  addedBy: number
  year: number
  rating: number
};

export type Director = {
  id: number
  name: string
  averageRating: number
  moviesWatched: number
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

import { FormikHelpers } from 'formik';

export type OnSubmitType<FormValuesType> =
    (values: FormValuesType, actions: FormikHelpers<FormValuesType>) => void;

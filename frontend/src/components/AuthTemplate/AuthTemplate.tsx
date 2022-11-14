import { Form, Formik } from 'formik';
import { ReactNode } from 'react';
import { OnSubmitOrResetType } from '../../utils/types';
import './AuthTemplate.css';

type Props<FormValuesType> = {
  children: ReactNode
  title?: string
  initialValues: FormValuesType
  onSubmit: OnSubmitOrResetType<FormValuesType>
  validationSchema: object
};

export const AuthTemplate = <FormValuesType extends object>({
  children, title, onSubmit, initialValues, validationSchema,
}: Props<FormValuesType>) => (
  <div className="AuthTemplate">
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="AuthTemplate__card">
        {title && <h1 className="AuthTemplate__title">{title}</h1>}
        {children}
      </Form>
    </Formik>
  </div>
  );

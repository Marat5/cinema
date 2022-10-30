import { Form, Formik } from 'formik';
import { ReactNode } from 'react';
import './AuthTemplate.css';
import { OnSubmitType } from './types';

type Props<FormValuesType> = {
  children: ReactNode
  title?: string
  initialValues: FormValuesType
  onSubmit: OnSubmitType<FormValuesType>
};

export function AuthTemplate<FormValuesType extends object>(
  {
    children, title, onSubmit, initialValues,
  }: Props<FormValuesType>,
) {
  return (
    <div className="AuthTemplate">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="AuthTemplate__card">
          {title && <h1 className="AuthTemplate__title">{title}</h1>}
          {children}
        </Form>
      </Formik>
    </div>
  );
}

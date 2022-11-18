/* eslint-disable no-console */
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Movie, OnSubmitOrResetType } from '../../utils/types';
import { ButtonSet } from '../ButtonSet/ButtonSet';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';
import { ResourceCard } from '../ResourceCard/ResourceCard';

type MovieFormValues = Omit<Movie, 'id'>;

type Props = {
  initialValues: MovieFormValues
};

export const MovieForm = ({ initialValues }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleIsEditing = () => {
    console.log('this is not submit');
    setIsEditing((prev) => !prev);
  };

  const onSubmit: OnSubmitOrResetType<MovieFormValues> = (values, actions) => {
    console.log('submit', values, actions);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      actions.setFieldError('username', 'Validation failed on backend');
    }, 2000);
  };

  const onReset: OnSubmitOrResetType<MovieFormValues> = (values, actions) => {
    console.log('reset');
    console.log(values, actions);
    setIsEditing(false);
  };

  return (
    <ResourceCard title="Movie Card">
      <Formik initialValues={initialValues} onSubmit={onSubmit} onReset={onReset}>
        <Form>
          <CustomTextInput name="title" size="l" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="directorName" displayName="Director Name" size="l" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="year" size="l" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="rating" size="l" isDisabled={!isEditing} isBorderHidden={!isEditing} />

          <ButtonSet isHorizontal>
            {isEditing
              ? (
                <>
                  <CustomButton
                    key="submit"
                    text="Save"
                    type="submit"
                    showLoadIndicator={isLoading}
                  />
                  <CustomButton
                    text="Cancel"
                    type="reset"
                    look="cancel"
                  />
                </>
              )
              : (
                <CustomButton
                  key="edit"
                  text="Edit"
                  onClick={toggleIsEditing}
                />
              )}
          </ButtonSet>
        </Form>
      </Formik>
    </ResourceCard>
  );
};

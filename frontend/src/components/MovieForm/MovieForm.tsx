import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { Movie, OnSubmitOrResetType } from '../../utils/types';
import { ButtonSet } from '../ButtonSet/ButtonSet';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { ValidationMovieSchema } from './ValidationMovieSchema';

export type MovieFormValues = { id: number } & Partial<Omit<Movie, 'id'>>;

type Props = {
  loadedInitialValues?: MovieFormValues
  isCurrentUserAllowedToEdit: boolean
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  isSubmitting: boolean
  onSubmit: OnSubmitOrResetType<MovieFormValues>
};

export const MovieForm = ({
  loadedInitialValues, isCurrentUserAllowedToEdit,
  isEditing, setIsEditing, isLoading, isSubmitting, onSubmit
}: Props) => {
  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const onReset: OnSubmitOrResetType<MovieFormValues> = () => {
    setIsEditing(false);
  };

  return (
    <ResourceCard isLoading={isLoading} title="Movie Card">
      <Formik
        initialValues={loadedInitialValues as MovieFormValues}
        validationSchema={ValidationMovieSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      >
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
                    showLoadIndicator={isSubmitting}
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
                  disabled={!isCurrentUserAllowedToEdit}
                  key="edit"
                  text={isCurrentUserAllowedToEdit ? 'Edit' : 'You can\'t edit other user\'s movie '}
                  onClick={toggleIsEditing}
                />
              )}
          </ButtonSet>
        </Form>
      </Formik>
    </ResourceCard>
  );
};

import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { OnSubmitOrResetType } from '../../utils/types';
import { ButtonSet } from '../ButtonSet/ButtonSet';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { initialValues } from './constants';
import { MovieFormValues } from './types';
import { ValidationMovieSchema } from './ValidationMovieSchema';

type Props = {
  loadedInitialValues?: MovieFormValues
  isCurrentUserAllowedToEdit?: boolean
  isEditing: boolean
  setIsEditing?: Dispatch<SetStateAction<boolean>>
  isLoading?: boolean
  isSubmitting?: boolean
  onSubmit: OnSubmitOrResetType<MovieFormValues>
};

export const MovieForm = ({
  loadedInitialValues, isCurrentUserAllowedToEdit,
  isEditing, setIsEditing, isLoading, isSubmitting, onSubmit
}: Props) => {
  const toggleIsEditing = () => {
    if (setIsEditing) {
      setIsEditing((prev) => !prev);
    }
  };

  const onReset: OnSubmitOrResetType<MovieFormValues> = () => {
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  return (
    <ResourceCard isLoading={Boolean(isLoading)} title="Movie Card">
      <Formik
        initialValues={loadedInitialValues || initialValues}
        validationSchema={ValidationMovieSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <Form>
          <CustomTextInput name="title" size="l" placeholder="Rushmore" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="directorName" placeholder="Wes Anderson" displayName="Director Name" size="l" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="year" size="l" placeholder="1998" isDisabled={!isEditing} isBorderHidden={!isEditing} />
          <CustomTextInput name="rating" size="l" placeholder="10" isDisabled={!isEditing} isBorderHidden={!isEditing} />

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
                    text={setIsEditing ? 'Cancel' : 'Reset'}
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

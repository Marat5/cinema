import { Form, Formik } from 'formik';
import { Director } from '../../utils/types';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';
import { ResourceCard } from '../ResourceCard/ResourceCard';

type Props = {
  loadedInitialValues?: Director
  isLoading: boolean
};

export const DirectorForm = ({ loadedInitialValues, isLoading }: Props) => (
  <ResourceCard isLoading={isLoading} title="Director Card">
    <Formik initialValues={loadedInitialValues as Director} onSubmit={() => {}}>
      <Form>
        <CustomTextInput name="name" size="l" isDisabled isBorderHidden />
        <CustomTextInput name="moviesWatched" displayName="Movies Watched" size="l" isDisabled isBorderHidden />
        <CustomTextInput name="averageRating" displayName="Average Rating" size="l" isDisabled isBorderHidden />
      </Form>
    </Formik>
  </ResourceCard>
);

import { Form, Formik } from 'formik';
import { Director } from '../../utils/types';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';
import { ResourceCard } from '../ResourceCard/ResourceCard';

type Props = {
  initialValues: Omit<Director, 'id'>
};

export const DirectorForm = ({ initialValues }: Props) => (
  <ResourceCard title="Director Card">
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        <CustomTextInput name="name" size="l" isDisabled isBorderHidden />
        <CustomTextInput name="movies_watched" displayName="Movies Watched" size="l" isDisabled isBorderHidden />
        <CustomTextInput name="average_rating" displayName="Average Rating" size="l" isDisabled isBorderHidden />
      </Form>
    </Formik>
  </ResourceCard>
);

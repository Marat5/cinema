import { Form, Formik } from 'formik';
import { CustomTextInputFormik } from '../../components/CustomTextInput/CustomTextInput';

export function LoginPagetmp() {
  return (
    <div className="AuthTemplate">
      <Formik
        initialValues={{ username: '' }}
        onSubmit={() => {
          console.log('submit');
        }}
      >
        <Form className="AuthTemplate__card">
          <h1 className="AuthTemplate__title">Tmp login</h1>

          <CustomTextInputFormik name="username" placeholder="Guest666" />
        </Form>
      </Formik>
    </div>
  );
}

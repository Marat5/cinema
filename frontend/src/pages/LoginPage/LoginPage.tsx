import { useLoginMutation } from '../../api/mutations/useLoginMutation';
import { AuthTemplate } from '../../components/AuthTemplate/AuthTemplate';
import { ButtonSet } from '../../components/ButtonSet/ButtonSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomButtonLink } from '../../components/CustomButton/CustomButtonLink';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import { OnSubmitOrResetType } from '../../utils/types';
import { ROUTES } from '../Router/constants';
import { ValidationLoginSchema } from './ValidationLoginSchema';

type LoginFormValues = {
  username: string
  password: string
};

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

export const LoginPage = () => {
  const [login, { data, error, loading }] = useLoginMutation();
  console.log(data, error);

  const onSubmit: OnSubmitOrResetType<LoginFormValues> = (values, actions) => {
    // eslint-disable-next-line no-console
    console.log(values, actions, 'yay, submit');
    login({ variables: values });
  };
  return (
    <AuthTemplate title="Login" onSubmit={onSubmit} validationSchema={ValidationLoginSchema} initialValues={initialValues}>
      <CustomTextInput name="username" placeholder="Guest" />
      <CustomTextInput name="password" placeholder="123" errorText="Wrong password" />

      <ButtonSet>
        <CustomButton
          text="Login"
          type="submit"
          showLoadIndicator={loading}
        />
        <CustomButtonLink text="Register new account" look="secondary" to={ROUTES.register} />
      </ButtonSet>
    </AuthTemplate>
  );
};

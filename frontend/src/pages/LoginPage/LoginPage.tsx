import { AuthTemplate } from '../../commonComponents/AuthTemplate/AuthTemplate';
import { ButtonSet } from '../../commonComponents/ButtonSet/ButtonSet';
import { CustomButton } from '../../commonComponents/CustomButton/CustomButton';
import { CustomButtonLink } from '../../commonComponents/CustomButton/CustomButtonLink';
import { CustomTextInput } from '../../commonComponents/CustomTextInput/CustomTextInput';
import { useLoginSubmit } from '../../hooks/useLoginSubmit';
import { ROUTES } from '../Router/constants';
import { LoginFormValues } from './types';
import { ValidationLoginSchema } from './ValidationLoginSchema';

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

export const LoginPage = () => {
  const [onLoginSubmit, { loading }] = useLoginSubmit();

  return (
    <AuthTemplate title="Login" onSubmit={onLoginSubmit} validationSchema={ValidationLoginSchema} initialValues={initialValues}>
      <CustomTextInput name="username" placeholder="Guest" />
      <CustomTextInput name="password" placeholder="123" />

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

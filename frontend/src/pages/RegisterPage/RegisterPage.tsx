import { AuthTemplate } from '../../commonComponents/AuthTemplate/AuthTemplate';
import { ButtonSet } from '../../commonComponents/ButtonSet/ButtonSet';
import { CustomButton } from '../../commonComponents/CustomButton/CustomButton';
import { CustomButtonLink } from '../../commonComponents/CustomButton/CustomButtonLink';
import { CustomTextInput } from '../../commonComponents/CustomTextInput/CustomTextInput';
import { useRegisterSubmit } from '../../hooks/useRegisterSubmit';
import { RegisterFormValues } from './types';
import { ValidationRegisterSchema } from './ValidationRegisterSchema';
import { ROUTES } from '../Router/constants';

const initialValues: RegisterFormValues = {
  username: '',
  password1: '',
  password2: '',
};

export const RegisterPage = () => {
  const [onRegisterSubmit, { loading }] = useRegisterSubmit();

  return (
    <AuthTemplate title="Register" onSubmit={onRegisterSubmit} validationSchema={ValidationRegisterSchema} initialValues={initialValues}>
      <CustomTextInput name="username" placeholder="Guest" />
      <CustomTextInput name="password1" displayName="Password" placeholder="123" />
      <CustomTextInput name="password2" displayName="Repeat password" placeholder="123" />

      <ButtonSet>
        <CustomButton text="Create account" type="submit" showLoadIndicator={loading} />
        <CustomButtonLink text="I already have account" look="secondary" to={ROUTES.login} />
      </ButtonSet>
    </AuthTemplate>
  );
};

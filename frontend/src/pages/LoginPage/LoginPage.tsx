import { useState } from 'react';
import { AuthTemplate } from '../../components/AuthTemplate/AuthTemplate';
import { OnSubmitType } from '../../components/AuthTemplate/types';
import { ButtonSet } from '../../components/ButtonSet/ButtonSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import { ValidationLoginSchema } from './ValidationLoginSchema';

type LoginFormValues = {
  username: string
  password: string
};

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: OnSubmitType<LoginFormValues> = (values, actions) => {
    // eslint-disable-next-line no-console
    console.log(values, actions, 'yay, submit');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      actions.setFieldError('username', 'Validation failed on backend');
    }, 2000);
  };
  return (
    <AuthTemplate title="Login" onSubmit={onSubmit} validationSchema={ValidationLoginSchema} initialValues={initialValues}>
      <CustomTextInput name="username" placeholder="Guest" />
      <CustomTextInput name="password" placeholder="123" errorText="Wrong password" />

      <ButtonSet>
        <CustomButton text="Login" type="submit" bottomGap={8} showLoadIndicator={isLoading} />
        <CustomButton text="Register new account" type="button" look="secondary" />
      </ButtonSet>
    </AuthTemplate>
  );
}

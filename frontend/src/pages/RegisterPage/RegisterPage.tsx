import { useState } from 'react';
import { AuthTemplate } from '../../components/AuthTemplate/AuthTemplate';
import { OnSubmitType } from '../../components/AuthTemplate/types';
import { ButtonSet } from '../../components/ButtonSet/ButtonSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';

type RegisterFormValues = {
  username: string
  password1: string
  password2: string
};

const initialValues: RegisterFormValues = {
  username: '',
  password1: '',
  password2: '',
};

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: OnSubmitType<RegisterFormValues> = (values, actions) => {
    // eslint-disable-next-line no-console
    console.log(values, actions, 'yay, submit');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <AuthTemplate title="Register" onSubmit={onSubmit} initialValues={initialValues}>
      <CustomTextInput name="username" placeholder="Guest" />
      <CustomTextInput name="password1" displayName="Password" placeholder="123" />
      <CustomTextInput name="password2" displayName="Repeat password" placeholder="123" />

      <ButtonSet>
        <CustomButton text="Create account" type="submit" bottomGap={8} showLoadIndicator={isLoading} />
        <CustomButton text="I already have account" type="button" look="secondary" />
      </ButtonSet>
    </AuthTemplate>
  );
}

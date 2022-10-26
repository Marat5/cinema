import { ButtonSet } from '../../components/ButtonSet/ButtonSet';
import { AuthTemplate } from '../../components/AuthTemplate/AuthTemplate';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';

export function RegisterPage() {
  return (
    <AuthTemplate title="Register" handleSubmit={() => {}}>
      <CustomTextInput
        title="Username"
        value="username"
        onChange={() => {}}
        placeholder="Guest"
      />
      <CustomTextInput
        title="Password"
        value="password"
        onChange={() => {}}
        placeholder="123"
      />
      <CustomTextInput
        title="Repeat Password"
        value="password"
        onChange={() => {}}
        placeholder="123"
      />

      <ButtonSet>
        <CustomButton text="Create Account" type="submit" bottomGap={8} showLoadIndicator />
        <CustomButton text="I already have account" type="button" look="secondary" />
      </ButtonSet>
    </AuthTemplate>
  );
}

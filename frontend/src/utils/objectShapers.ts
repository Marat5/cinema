import { RegisterMutationVars } from '../api/mutations/useRegisterMutation';
import { RegisterFormValues } from '../pages/RegisterPage/types';

export const mapRegisterFormToGQL = (values: RegisterFormValues): RegisterMutationVars => ({
  username: values.username,
  password: values.password1
});

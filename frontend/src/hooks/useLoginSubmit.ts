import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/mutations/useLoginMutation';
import { useCurrentUser } from '../api/queries/useCurrentUser';
import { LoginFormValues } from '../pages/LoginPage/types';
import { ROUTES } from '../pages/Router/constants';
import { OnSubmitOrResetType } from '../utils/types';
import { setFormikErrors } from '../utils/utils';

export const useLoginSubmit = () => {
  const [login, mutationResult] = useLoginMutation();
  const { refetch: refetchCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const onSubmit: OnSubmitOrResetType<LoginFormValues> = (values, actions) => {
    login({
      variables: values,
      onError: (e) => setFormikErrors(e, actions.setFieldError),
      onCompleted: (data) => {
        localStorage.setItem('token', data.login.token);
        refetchCurrentUser();
        navigate(ROUTES.main);
      }
    });
  };

  return [onSubmit, mutationResult] as const;
};

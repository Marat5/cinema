import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/mutations/useRegisterMutation';
import { useCurrentUser } from '../api/queries/useCurrentUser';
import { RegisterFormValues } from '../pages/RegisterPage/types';
import { ROUTES } from '../pages/Router/constants';
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constants';
import { mapRegisterFormToGQL } from '../utils/objectShapers';
import { OnSubmitOrResetType } from '../utils/types';
import { setFormikErrors } from '../utils/utils';

export const useRegisterSubmit = () => {
  const [register, mutationResult] = useRegisterMutation();
  const { refetch: refetchCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const onSubmit: OnSubmitOrResetType<RegisterFormValues> = (values, actions) => {
    register({
      variables: mapRegisterFormToGQL(values),
      onError: (e) => setFormikErrors(e, actions.setFieldError),
      onCompleted: (data) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.register.token);
        refetchCurrentUser();
        navigate(ROUTES.main);
      }
    });
  };
  return [onSubmit, mutationResult] as const;
};

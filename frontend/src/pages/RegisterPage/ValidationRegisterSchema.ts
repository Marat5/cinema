import * as Yup from 'yup';

export const ValidationRegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .min(2),
  password1: Yup.string()
    .required('Password is required')
    .min(3),
  password2: Yup.string()
    .required()
    .min(3)
    .oneOf([Yup.ref('password1'), null], "Passwords don't match")
    .required('Repeat password is required'),
});

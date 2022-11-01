import * as Yup from 'yup';

export const ValidationLoginSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .min(2),
  password: Yup.string()
    .required()
    .min(3),
});

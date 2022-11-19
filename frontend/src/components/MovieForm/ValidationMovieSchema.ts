import * as Yup from 'yup';

export const ValidationMovieSchema = Yup.object().shape({
  title: Yup.string()
    .required()
    .min(2),
  directorName: Yup.string()
    .required()
    .min(2),
  year: Yup.number()
    .typeError('Year is a number')
    .required()
    .test('validYear', 'Enter a valid year', ((v) => {
      const value = v ?? 0;
      return value > 1850 && value < 2050;
    })),
  rating: Yup.number()
    .typeError('Rating is a number')
    .required()
    .test('validRating', 'Rating should be between 0 and 10', ((v) => {
      const value = v ?? 0;
      return value >= 0 && value <= 10;
    })),
});

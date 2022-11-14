import { Field, FieldProps } from 'formik';
import classNames from 'classnames';
import { capitalize } from '../../utils/utils';
import './CustomTextInput.css';

type Props = {
  name: string
  placeholder?: string
  displayName?: string
  errorText?: string
  isDisabled?: boolean
  isBorderHidden?: boolean
  size?: 'm' | 'l'
};

export const CustomTextInput = ({
  name, placeholder, displayName, isDisabled, isBorderHidden, size = 'm'
}: Props) => {
  const nameText = displayName ? `${displayName}:` : `${capitalize(name)}:`;
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={classNames('CustomTextInput', `CustomTextInput_${size}Size`)}>
          <label htmlFor={name} className="CustomTextInput__label">
            {nameText}
          </label>
          <input
            {...field}
            id={field.name}
            type="text"
            placeholder={placeholder}
            className={classNames(
              'CustomTextInput__input',
              meta.touched && meta.error && 'CustomTextInput__input_error',
              isBorderHidden && 'CustomTextInput__input_noBorder'
            )}
            autoComplete="off"
            disabled={isDisabled}
          />
          <span className="CustomTextInput__error">{meta.touched && meta.error}</span>
        </div>
      )}
    </Field>
  );
};

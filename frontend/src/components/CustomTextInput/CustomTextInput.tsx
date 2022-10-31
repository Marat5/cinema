import { Field, FieldProps } from 'formik';
import { capitalize } from '../../utils/utils';
import './CustomTextInput.css';

type Props = {
  name: string
  placeholder?: string
  displayName?: string
  errorText?: string
};

export function CustomTextInput({
  name, placeholder, displayName, errorText,
}: Props) {
  const nameText = displayName ? `${displayName}:` : `${capitalize(name)}:`;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="CustomTextInput">
          <label htmlFor={name} className="CustomTextInput__label">
            {nameText}
          </label>
          <input id={name} type="text" className="CustomTextInput__input" placeholder={placeholder} value={field.value} onChange={field.onChange} />
          <span className="CustomTextInput__error">{errorText}</span>
        </div>
      ) }
    </Field>
  );
}

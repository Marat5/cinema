import { Field, FieldProps } from 'formik';
import { ChangeEventHandler } from 'react';
import { capitalize } from '../../utils/utils';
import './CustomTextInput.css';

type Props = {
  title: string
  value: string
  onChange: ChangeEventHandler
  placeholder?: string
};

type TMPProps = {
  name: string
  placeholder?: string
};

export function CustomTextInput({
  title, value, onChange, placeholder,
}: Props) {
  const titleText = `${title}:`;

  return (
    <div className="CustomTextInput">
      <label htmlFor={title} className="CustomTextInput__label">
        {titleText}
      </label>
      <input id={title} type="text" className="CustomTextInput__input" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export function CustomTextInputFormik({ name, placeholder }: TMPProps) {
  const nameText = `${capitalize(name)}:`;
  return (
    <Field name="username">
      {({ field }: FieldProps) => (
        <div className="CustomTextInput">
          <label htmlFor={name} className="CustomTextInput__label">
            {nameText}
          </label>
          <input id={name} type="text" className="CustomTextInput__input" placeholder={placeholder} value={field.value} onChange={field.onChange} />
        </div>
      ) }
    </Field>
  );
}

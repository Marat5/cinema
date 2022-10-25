import { ChangeEventHandler } from 'react';
import './CustomTextInput.css';

type Props = {
  title: string
  value: string
  onChange: ChangeEventHandler
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

/* eslint-disable react/button-has-type */
import { MouseEvent } from 'react';
import { PulseLoader } from 'react-spinners';
import { COLORS } from '../../utils/constants';
import './CustomButton.css';

type Props = {
  type: 'submit' | 'button' | 'reset'
  text: string
  onClick: (e: MouseEvent<HTMLElement>) => void;
  look?: 'primary' | 'secondary'
  bottomGap?: number
  showLoadIndicator?: boolean
};

export function CustomButton({
  type, text, look = 'primary', bottomGap = 0, showLoadIndicator, onClick,
}: Props) {
  const className = `CustomButton CustomButton_${look}`;
  return (
    <button
      onClick={onClick}
      disabled={showLoadIndicator}
      type={type}
      style={{ marginBottom: bottomGap }}
      className={className}
    >
      {showLoadIndicator ? <PulseLoader size={10} color={COLORS.tertiaryColor} /> : text}
    </button>
  );
}

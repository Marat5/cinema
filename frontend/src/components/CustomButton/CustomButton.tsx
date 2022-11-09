/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { MouseEvent } from 'react';
import { PulseLoader } from 'react-spinners';
import { COLORS } from '../../utils/constants';
import './CustomButton.css';

// Shared common props for CustomButton and CustomButtonLink
export type BaseCustomButtonProps = {
  text: string
  look?: 'primary' | 'secondary'
  bottomGap?: number
};

type Props = BaseCustomButtonProps & {
  type: 'submit' | 'button' | 'reset',
  showLoadIndicator?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export const CustomButton = ({
  type, text, look = 'primary', bottomGap = 0, showLoadIndicator, onClick,
}: Props) => (
  <button
    onClick={onClick}
    disabled={showLoadIndicator}
    type={type}
    style={{ marginBottom: bottomGap }}
    className={classNames('CustomButton', `CustomButton_${look}`)}
  >
    {showLoadIndicator ? <PulseLoader size={10} color={COLORS.tertiaryColor} /> : text}
  </button>
);

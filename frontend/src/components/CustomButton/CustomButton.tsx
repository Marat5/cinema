/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { MouseEvent } from 'react';
import { PulseLoader } from 'react-spinners';
import './CustomButton.css';
import { getPulseLoaderColor } from './utils';

// Shared common props for CustomButton and CustomButtonLink
export type BaseCustomButtonProps = {
  text: string
  look?: 'primary' | 'secondary' | 'cancel'
  className?: string
};

type Props = BaseCustomButtonProps & {
  type?: 'submit' | 'button' | 'reset',
  showLoadIndicator?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean
};

export const CustomButton = ({
  type = 'button', text, look = 'primary', showLoadIndicator, onClick, className, disabled
}: Props) => (
  <button
    onClick={onClick}
    disabled={showLoadIndicator || disabled}
    type={type}
    className={classNames('CustomButton', `CustomButton_${look}`, disabled && 'CustomButton_disabled', className)}
  >
    {showLoadIndicator ? <PulseLoader size={10} color={getPulseLoaderColor(look)} /> : text}
  </button>
);

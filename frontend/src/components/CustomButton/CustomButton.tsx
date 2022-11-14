/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { MouseEvent } from 'react';
import { PulseLoader } from 'react-spinners';
import { COLORS } from '../../utils/constants';
import './CustomButton.css';

// Shared common props for CustomButton and CustomButtonLink
export type BaseCustomButtonProps = {
  text: string
  look?: 'primary' | 'secondary' | 'cancel'
};

type Props = BaseCustomButtonProps & {
  type: 'submit' | 'button' | 'reset',
  showLoadIndicator?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export const CustomButton = ({
  type, text, look = 'primary', showLoadIndicator, onClick
}: Props) => (
  <button
    onClick={onClick}
    disabled={showLoadIndicator}
    type={type}
    className={classNames('CustomButton', `CustomButton_${look}`)}
  >
    {showLoadIndicator ? <PulseLoader size={10} color={COLORS.tertiaryColor} /> : text}
  </button>
);

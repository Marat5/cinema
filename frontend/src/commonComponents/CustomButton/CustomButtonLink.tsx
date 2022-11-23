import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BaseCustomButtonProps } from './CustomButton';

// CustomButton and CustomButtonLink are similar, have common props and use same styles
// But it is better for typing to separate them

type ButtonLinkProps = BaseCustomButtonProps & {
  to: string;
};

export const CustomButtonLink = ({
  text, look = 'primary', to, className
}: ButtonLinkProps) => (
  <Link
    to={to}
    className={classNames('CustomButton', `CustomButton_${look}`, className)}
  >
    {text}
  </Link>
);

import { PulseLoader } from 'react-spinners';
import { COLORS } from '../../utils/constants';
import './ResourceCard.css';

type Props = {
  title: string
  children: JSX.Element
  isLoading: boolean
};

export const ResourceCard = ({ title, children, isLoading }: Props) => (
  <div className="ResourceCard">
    <h1 className="ResourceCard__title">{title}</h1>

    {isLoading ? (
      <PulseLoader className="ResourceCard__PulseLoader" size={20} color={COLORS.secondaryColor} />
    ) : children}
  </div>
);

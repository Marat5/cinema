import './MainPageCard.css';

type Props = {
  title: string
};

export const MainPageCard = ({ title }: Props) => (
  <div className="MainPageCard">
    <h1>{title}</h1>
    <p>Description of what is inside</p>
  </div>
);

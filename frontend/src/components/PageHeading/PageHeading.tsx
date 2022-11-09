import './PageHeading.css';

type Props = {
  title: string
};

export const PageHeading = ({ title }: Props) => (
  <h1 className="PageHeading">{title}</h1>
);

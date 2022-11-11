import { useParams } from 'react-router-dom';

export const DirectorPage = () => {
  const { id } = useParams();
  return (
    <span>
      Director
      {' '}
      {id}
    </span>
  );
};

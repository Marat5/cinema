import { useParams } from 'react-router-dom';

export const MoviePage = () => {
  const { id } = useParams();

  return (
    <span>
      movie
      {' '}
      {id}
    </span>
  );
};

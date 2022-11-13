import { useParams } from 'react-router-dom';
import { ResourceNotFound } from '../../components/ResourceNotFound/ResourceNotFound';
import { MOVIES } from '../../utils/constants';

export const MoviePage = () => {
  const { id } = useParams();

  const movie = MOVIES.find((m) => m.id === Number(id));
  return (
    movie ? (<span>{movie.title}</span>) : (
      <ResourceNotFound resourceName="Movie" resourceId={String(id)} />
    )
  );
};

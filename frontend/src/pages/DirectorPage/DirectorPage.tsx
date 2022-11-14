import { useParams } from 'react-router-dom';
import { DirectorForm } from '../../components/DirectorForm/DirectorForm';
import { ResourceNotFound } from '../../components/ResourceNotFound/ResourceNotFound';
import { DIRECTORS } from '../../utils/constants';

export const DirectorPage = () => {
  const { id } = useParams();
  const director = DIRECTORS.find((d) => d.id === Number(id));

  return director ? <DirectorForm initialValues={director} /> : (
    <ResourceNotFound resourceName="Director" resourceId={String(id)} />
  );
};

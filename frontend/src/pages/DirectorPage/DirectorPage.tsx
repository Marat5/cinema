import { useParams } from 'react-router-dom';
import { useDirector } from '../../api/queries/useDirector';
import { DirectorForm } from './components/DirectorForm';
import { ResourceNotFound } from '../../commonComponents/ResourceNotFound/ResourceNotFound';

export const DirectorPage = () => {
  const { id } = useParams();
  const { data, loading } = useDirector(id as string);

  return (data?.director || loading)
    ? <DirectorForm isLoading={loading} loadedInitialValues={data?.director} /> : (
      <ResourceNotFound resourceName="Director" resourceId={String(id)} />
    );
};

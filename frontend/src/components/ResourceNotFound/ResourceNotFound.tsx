import { FullPageMessage } from '../FullPageMessage/FullPageMessage';

type Props = {
  resourceName: string
  resourceId: string
};

export const ResourceNotFound = ({ resourceName, resourceId }: Props) => (
  <FullPageMessage
    title="404 Not Found"
    renderSubtitle={(highlightedTextCN) => (
      <h2>
        <span className={highlightedTextCN}>{resourceName}</span>
        {' '}
        with id
        {' '}
        <span className={highlightedTextCN}>{resourceId}</span>
        {' '}
        does not exist
      </h2>
    )}
  />
);

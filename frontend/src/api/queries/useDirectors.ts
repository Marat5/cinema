import { gql, useQuery } from '@apollo/client';
import { LIST_PAGE_SIZE } from '../../utils/constants';
import { Director, PaginatedQueryVars } from '../../utils/types';

export type DirectorsData = {
  directorsData: {
    totalCount: number
    directors: Director[]
  }
};

export type DirectorsVars = PaginatedQueryVars;

const GET_DIRECTORS = gql`
    query GetDirectors($limit: Int, $offset: Int) {
        directorsData(limit: $limit, offset: $offset) {
            totalCount
            directors {
                id
                name
                average_rating
                movies_watched
            }
        }
    }
`;

export const useDirectors = () => {
  const queryResult = useQuery<DirectorsData, DirectorsVars>(GET_DIRECTORS, {
    variables: { limit: LIST_PAGE_SIZE, offset: 0 },
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    queryResult.fetchMore({
      variables: { offset: queryResult.data?.directorsData.directors.length }
    });
  };

  const isAllDataLoaded = Boolean(queryResult.data?.directorsData.directors.length
     === queryResult.data?.directorsData.totalCount);

  return { ...queryResult, isAllDataLoaded, loadMore };
};

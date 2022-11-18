import { gql, useQuery } from '@apollo/client';
import { Director } from '../../utils/types';

type DirectorsData = {
  directorsData: {
    totalCount: number
    directors: Director[]
  }
};

type DirectorVars = {
  limit: Number
  offset: Number
};

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
  const queryResult = useQuery<DirectorsData, DirectorVars>(GET_DIRECTORS, {
    variables: { limit: 15, offset: 0 },
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

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchParamSort = <SortOption extends string>(defaultOption: SortOption) => {
  const [search, setSearch] = useSearchParams();
  const setSort = (sort: SortOption) => {
    setSearch({ sort });
  };

  const sort = search.get('sort') as SortOption | null;

  useEffect(() => {
    if (!sort) {
      setSort(defaultOption);
    }
  }, []);

  return [sort ?? defaultOption, setSort] as const;
};

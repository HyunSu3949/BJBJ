import { useState, useEffect } from 'react';

type PaginationOptions<T, Params> = {
  fetchData: (
    params: Params,
  ) => Promise<{ totalCount: number; [key: string]: T[] | number }>;
  fetchParams: Params;
  itemsPerPage: number;
  dataKey: string;
};

function usePagination<T, Params>({
  fetchData,
  fetchParams,
  itemsPerPage,
  dataKey,
}: PaginationOptions<T, Params>) {
  const [dataPages, setDataPages] = useState<Record<number, T[]>>({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      if (!dataPages[page]) {
        const res = await fetchData({ ...fetchParams, page });
        const dataList: T[] = res[dataKey] as T[];
        setDataPages(prev => ({ ...prev, [page]: dataList }));
        setMaxPage(Math.ceil(res.totalCount / itemsPerPage));
      }
    };
    fetch();
  }, [page]);

  return {
    data: dataPages[page],
    setPage,
    page,
    maxPage,
  };
}

export default usePagination;

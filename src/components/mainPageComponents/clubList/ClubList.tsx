import { useEffect, useState } from 'react';

import { getClubsSortedBy } from '../../../apis/clubApis';
import { Club, ClubSort } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import usePagination from '../../../hooks/usePagination';

type Props = {
  sortBy: ClubSort;
};
type ClubFetchParams = {
  sortBy: ClubSort;
  page: number;
};

export default function ClubList({ sortBy }: Props) {
  const {
    data: clubs,
    setPage,
    maxPage,
  } = usePagination<Club, ClubFetchParams>({
    fetchData: getClubsSortedBy,
    fetchParams: {
      page: 1,
      sortBy,
    },
    itemsPerPage: 4,
    dataKey: 'clubList',
  });

  return (
    <>
      <ul style={{ display: 'flex' }}>
        {clubs?.map(club => <ClubCard key={club.clubId} {...club} />)}
      </ul>
      <ul style={{ display: 'flex' }}>
        {Array(maxPage)
          .fill(0)
          .map((_, i) => i + 1)
          .map((v, i) => (
            <li key={i} onClick={() => setPage(i + 1)}>
              {v}
            </li>
          ))}
      </ul>
    </>
  );
}

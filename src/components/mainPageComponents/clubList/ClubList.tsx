import { getClubsSortedBy } from '../../../apis/clubApis';
import { Club, ClubSort } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import usePagination from '../../../hooks/usePagination';
import Pagination from './../../common/pagination/Pagination';

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
      <Pagination maxPage={maxPage} setPage={setPage} />
    </>
  );
}

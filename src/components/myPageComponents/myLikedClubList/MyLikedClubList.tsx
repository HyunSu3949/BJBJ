import { getMyLikedClubList } from '../../../apis/clubApis';
import { Club } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import { useUserContext } from '../../contexts/userContext';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../common/pagination/Pagination';

type GetData = Club;
type FetchParams = {
  userId: string;
  page: number;
};

export default function MyLikedClubList() {
  const { userProfile } = useUserContext();
  const {
    data: clubs,
    setPage,
    maxPage,
  } = usePagination<GetData, FetchParams>({
    fetchData: getMyLikedClubList,
    fetchParams: {
      page: 1,
      userId: userProfile.userId,
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

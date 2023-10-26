import { useUserContext } from '../../contexts/userContext';
import { getMyFeedList } from '../../../apis/feedApis';
import FeedCardSmall from '../../common/feedCard/FeedCardSmall';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../common/pagination/Pagination';
import { FeedCardSmallType } from '../../types';

type GetData = FeedCardSmallType;

type FetchParams = {
  userId: string;
  page: number;
};

export default function MyFeedList() {
  const { userProfile } = useUserContext();
  const {
    data: feedList,
    setPage,
    maxPage,
  } = usePagination<GetData, FetchParams>({
    fetchData: getMyFeedList,
    fetchParams: {
      page: 1,
      userId: userProfile.userId,
    },
    itemsPerPage: 4,
    dataKey: 'commentList',
  });
  return (
    <>
      <ul>
        {feedList &&
          feedList.map((feed, idx) => <FeedCardSmall key={idx} {...feed} />)}
      </ul>
      <Pagination maxPage={maxPage} setPage={setPage} />
    </>
  );
}

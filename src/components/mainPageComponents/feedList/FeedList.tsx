import FeedCardSmall from '../../common/feedCard/FeedCardSmall';
import { getMainFeedListSortBy } from '../../../apis/feedApis';
import { ClubSort } from '../../types';
import { MainFeed } from '../../../mocks/types';
import usePagination from '../../../hooks/usePagination';
import Pagination from './../../common/pagination/Pagination';
type Props = {
  sortBy: ClubSort;
};
type MainFeedFetchParams = {
  sortBy: ClubSort;
  page: number;
};
export default function FeedList({ sortBy }: Props) {
  const {
    data: feeds,
    setPage,
    maxPage,
  } = usePagination<MainFeed, MainFeedFetchParams>({
    fetchData: getMainFeedListSortBy,
    fetchParams: {
      page: 1,
      sortBy,
    },
    itemsPerPage: 4,
    dataKey: 'feedList',
  });

  return (
    <>
      <ul style={{ display: 'flex' }}>
        {feeds?.map(feed => (
          <li key={feed.feedId}>
            <FeedCardSmall {...feed} />
          </li>
        ))}
      </ul>
      <Pagination maxPage={maxPage} setPage={setPage} />
    </>
  );
}

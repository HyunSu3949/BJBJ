import FeedCardSmall from '../../common/feedCard/FeedCardSmall';
import { getMainFeedListSortBy } from '../../../apis/feedApis';
import { useEffect, useState } from 'react';
import { FeedCardSmallType } from '../../types';

type Props = {
  sortBy: 'likes' | 'createdAt';
};

export default function FeedList({ sortBy }: Props) {
  const [feeds, setFeeds] = useState<FeedCardSmallType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMainFeedListSortBy({ sortBy });
      setFeeds(res.FeedList);
    };

    fetchData();
  }, [sortBy]);

  return (
    <>
      <ul style={{ display: 'flex' }}>
        {feeds?.map(feed => <FeedCardSmall key={feed.feedId} {...feed} />)}
      </ul>
    </>
  );
}

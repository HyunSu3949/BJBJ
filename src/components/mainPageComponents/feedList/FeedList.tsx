import React, { useEffect, useState } from 'react';
import FeedCardSmall from '../../common/feedCard/FeedCardSmall';
import { mainFeedListSortBy } from '../../../apis/feedApis';

type Props = {
  sortBy: 'likes' | 'createdAt';
};

type Feed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  id: string;
  likes: number;
  contents: string;
  commentCount: string;
};

export default function FeedList({ sortBy }: Props) {
  const [feedList, setFeedList] = useState<Feed[]>([]);

  useEffect(() => {
    const fetchFeedList = async (sortBy: string) => {
      const feedData = await mainFeedListSortBy(sortBy);

      setFeedList(feedData.feedList);
    };
    fetchFeedList(sortBy);
  }, [sortBy]);

  return (
    <ul>
      {feedList.map(feed => (
        <FeedCardSmall key={feed.id} {...feed} />
      ))}
    </ul>
  );
}

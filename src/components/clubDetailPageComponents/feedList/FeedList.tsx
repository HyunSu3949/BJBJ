import React, { useEffect, useState } from 'react';
import { getClubFeedList } from '../../../apis/feedApis';
import FeedCardSmall from '../../common/feedCard/FeedCardSmall';

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

export default function FeedList({ clubId }: { clubId: string }) {
  const [feedList, setFeedList] = useState<Feed[]>([]);

  useEffect(() => {
    const fetchFeedData = async (clubId: string) => {
      const feedData = await getClubFeedList(clubId);
      setFeedList(feedData.feedList);
    };
    fetchFeedData(clubId);
  }, []);

  return (
    <ul>
      {feedList.map(feed => (
        <FeedCardSmall key={feed.id} {...feed} />
      ))}
    </ul>
  );
}

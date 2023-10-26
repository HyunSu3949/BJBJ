import React, { useEffect, useState } from 'react';
import { getClubFeedList } from '../../../apis/feedApis';
import FeedCardSmall from '../../common/feedCard/FeedCardSmall';

type Feed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  feedId: string;
  likes: string;
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
  }, [clubId]);

  if (feedList.length == 0) {
    return <div>작성된 게시글이 없습니다.</div>;
  }

  return (
    <ul>
      {feedList?.map(feed => <FeedCardSmall key={feed.feedId} {...feed} />)}
    </ul>
  );
}

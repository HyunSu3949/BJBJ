import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { getMyFeedList } from '../../../apis/feedApis';
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

export default function MyFeedList() {
  const { userProfile } = useUserContext();
  const [feedList, setFeedList] = useState<Feed[]>([]);
  useEffect(() => {
    const fetchMyFeedList = async (userId: string) => {
      const res = await getMyFeedList(userId);

      setFeedList(res.feedList);
    };

    fetchMyFeedList(userProfile.userId);
  }, [userProfile.userId]);
  return (
    <ul>
      {feedList &&
        feedList.map((feed, idx) => <FeedCardSmall key={idx} {...feed} />)}
    </ul>
  );
}

import React, { useEffect, useState } from 'react';
import FeedCardBig from '../../common/feedCard/FeedCardBig';
import { getClubFeedList } from '../../../apis/feedApis';
import { useParams } from 'react-router-dom';

type Feed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  feedId: string;
  contents: string;
  likes: string;
  commentCount: string;
};

export default function FeedList() {
  const { clubId } = useParams();
  const [clubFeedList, setClubFeedList] = useState<Feed[]>([]);
  useEffect(() => {
    const fetchClubFeedList = async () => {
      if (clubId) {
        const res = await getClubFeedList(clubId);
        setClubFeedList(res.feedList);
      }
    };

    fetchClubFeedList();
  }, [clubId]);

  return (
    <ul>
      {clubFeedList.map(feed => (
        <li key={feed.feedId}>
          <FeedCardBig {...feed} />
        </li>
      ))}
    </ul>
  );
}

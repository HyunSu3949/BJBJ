import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  sortBy: 'likes' | 'createdAt';
};

type Feed = {
  id: string;
  userId: string;
  clubId: string;
  title: string;
  likes: number;
  contents: string;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
};

type FeedsResponse = {
  totalCount: string;
  feedList: Feed[];
};

export default function FeedList({ sortBy }: Props) {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    axios.get(`/feeds?sortby=${sortBy}`).then(res => {
      const { totalCount, feedList }: FeedsResponse = res.data.data;

      setFeeds(feedList);
    });
  }, [sortBy]);

  return (
    <ul>
      {feeds.map(feed => (
        <li key={feed.id}>
          <img src={feed.imgUrl} alt={feed.title} />
          <h3>{feed.title}</h3>
          <p>{feed.contents}</p>
          <p>Likes: {feed.likes}</p>
          <p>comments: {}</p>
        </li>
      ))}
    </ul>
  );
}

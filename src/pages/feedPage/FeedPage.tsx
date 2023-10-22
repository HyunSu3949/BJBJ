import React from 'react';
import PostFeedButton from '../../components/feedPageComponents/PostFeedButton/PostFeedButtont';
import FeedList from '../../components/feedPageComponents/feedList/FeedList';

export default function FeedPage() {
  return (
    <>
      <h1>피드 페이지</h1>
      <PostFeedButton />
      <FeedList />
    </>
  );
}

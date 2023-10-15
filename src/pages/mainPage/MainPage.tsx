import React, { useEffect } from 'react';
import ClubList from './../../components/mainPageComponents/clubList/ClubList';
import FeedList from '../../components/mainPageComponents/feedList/FeedList';
import MoreButton from './../../components/mainPageComponents/moreButton/MoreButton';

export default function MainPage() {
  const handleLogin = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    window.localStorage.setItem(
      'Access_Token',
      urlParams.get('Access_Token') || '',
    );
    window.localStorage.setItem(
      'Refresh_Token',
      urlParams.get('Refresh_Token') || '',
    );
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <>
      <h1>메인페이지</h1>
      <section>
        <h2>독서모임 목록</h2>
        <ClubList sortBy="likes" />
        <ClubList sortBy="createdAt" />
        <MoreButton route="/search" />
      </section>
      <section>
        <h2>v피드 목록</h2>
        <FeedList sortBy="likes" />
        <MoreButton route="/search" />
      </section>
    </>
  );
}

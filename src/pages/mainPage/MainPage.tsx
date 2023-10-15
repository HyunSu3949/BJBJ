import React, { useEffect } from 'react';
import ClubList from './../../components/mainPageComponents/clubList/ClubList';
import FeedList from '../../components/mainPageComponents/feedList/FeedList';
import MoreButton from './../../components/mainPageComponents/moreButton/MoreButton';

export default function MainPage() {
  useEffect(() => {
    console.log('mainPage mount');

    const handleLogin = () => {
      const queryString = window.location.search;
      console.log(queryString);

      const urlParams = new URLSearchParams(queryString);
      console.log(urlParams);
      const Access_Token = urlParams.get('Access_Token');
      console.log(Access_Token);
      const Refresh_Toke = urlParams.get('Refresh_Token');
      if (Access_Token) localStorage.setItem('Access_Token', Access_Token);
      if (Refresh_Toke) localStorage.setItem('Refresh_Token', Refresh_Toke);
    };
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

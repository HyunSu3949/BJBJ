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
      for (const [key, value] of urlParams.entries()) {
        console.log(`${key}, ${value}`);
      }
      const accessToken = urlParams.get('Access_Token');
      console.log('token: ', accessToken);
      const refreshToken = urlParams.get('Refresh_Token');
      if (accessToken !== null)
        localStorage.setItem('Access_Token', accessToken.slice(8));
      if (refreshToken !== null)
        localStorage.setItem('Refresh_Token', refreshToken.slice(8));
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

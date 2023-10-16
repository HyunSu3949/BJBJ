import { useEffect } from 'react';

import ClubList from './../../components/mainPageComponents/clubList/ClubList';
import FeedList from '../../components/mainPageComponents/feedList/FeedList';
import MoreButton from './../../components/mainPageComponents/moreButton/MoreButton';
import { useEffect } from 'react';
import { useUserContext } from '../../components/contexts/userContext';

export default function MainPage() {
  const { storeTokenInLocalStorage } = useUserContext();
  useEffect(() => {
    storeTokenInLocalStorage();
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
        <h2>피드 목록</h2>
        <FeedList sortBy="likes" />
        <MoreButton route="/search" />
      </section>
    </>
  );
}

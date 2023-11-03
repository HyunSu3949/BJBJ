import { Link } from 'react-router-dom';
import ClubList from './../../components/common/clubList/ClubList';
import FeedList from '../../components/mainPageComponents/feedList/FeedList';

import * as S from './styles';

export default function MainPage() {
  return (
    <>
      <h1 className="sr-only">메인페이지</h1>
      <S.Section>
        <h2>인기순</h2>
        <ClubList sortBy="likes" />
      </S.Section>
      <S.Section>
        <h2>최신순</h2>
        <ClubList sortBy="createdAt" />
        <Link to="/search">더알아보기</Link>
      </S.Section>
      <S.Section>
        <h2>인기글</h2>
        <FeedList sortBy="likes" />
        <Link to="/search">더알아보기</Link>
      </S.Section>
    </>
  );
}

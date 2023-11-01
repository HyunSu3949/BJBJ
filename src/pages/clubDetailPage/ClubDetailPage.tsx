import { useParams } from 'react-router-dom';
import ClubDetails from './../../components/clubDetailPageComponents/clubDetails/ClubDetails';
import FeedList from '../../components/clubDetailPageComponents/feedList/FeedList';
import * as S from './styles';

export default function ClubDetailPage() {
  const { clubId } = useParams();

  if (!clubId) {
    return <p>잘못된 접근입니다.</p>;
  }
  return (
    <>
      <h1 className="sr-only">모임 상세페이지</h1>
      <ClubDetails clubId={clubId} />
      <S.BottomDiv>
        <S.ContentsDiv>
          <h2>모임 게시글</h2>
          <FeedList clubId={clubId} />
        </S.ContentsDiv>
      </S.BottomDiv>
    </>
  );
}

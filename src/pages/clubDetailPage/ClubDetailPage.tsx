import { useParams } from 'react-router-dom';
import ClubDetails from './../../components/clubDetailPageComponents/clubDetails/ClubDetails';
import FeedList from '../../components/clubDetailPageComponents/feedList/FeedList';

export default function ClubDetailPage() {
  const { clubId } = useParams();

  if (!clubId) {
    return <p>잘못된 접근입니다.</p>;
  }
  return (
    <>
      <h1>모임 상세페이지</h1>
      <h2>모임 정보</h2>
      <ClubDetails clubId={clubId} />
      <h2>피드 리스트</h2>
      <FeedList clubId={clubId} />
    </>
  );
}

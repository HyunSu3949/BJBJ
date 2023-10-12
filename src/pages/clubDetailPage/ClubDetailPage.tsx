import { useParams } from 'react-router-dom';
import ClubDetails from './../../components/clubDetailPageComponents/clubDetails/ClubDetails';

export default function ClubDetailPage() {
  const { clubId } = useParams();

  if (!clubId) {
    return <p>잘못된 접근입니다.</p>;
  }
  return (
    <>
      <h1>모임 상세페이지</h1>
      <ClubDetails clubId={clubId} />
    </>
  );
}

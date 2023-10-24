import { useEffect, useState } from 'react';
import { getClubDetails } from '../../../apis/clubApis';
import { ClubDetailsType } from '../../types';
import ApplyButton from '../joinButton/ApplyButton';
import LikeButton from '../likeButton/LikeButton';
import ClubImgBig from './../../common/clubImg/ClubImgBit';

export default function ClubDetails({ clubId }: { clubId: string }) {
  const [clubDetail, setClubDetail] = useState<ClubDetailsType | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (clubId) {
        const details = await getClubDetails(clubId);

        setClubDetail(details);
      }
    };
    fetchData();
  }, [clubId]);

  if (!clubDetail)
    return (
      <>
        <p>잘못된 접근입니다.</p>
      </>
    );

  return (
    <>
      <div>
        <h2>모임 소개</h2>
        <div>
          <ClubImgBig imgUrl={clubDetail.imgUrl} />
        </div>
        <div>
          <h3>{clubDetail.title}</h3>
          <p>{clubDetail.contents}</p>
          <p>{clubDetail.description}</p>
          <p>{clubDetail.tags}</p>
        </div>
        <div>
          <ApplyButton status={clubDetail.status} clubId={clubDetail.userId} />
          <LikeButton clubId={clubDetail.userId} />
        </div>
      </div>
      <div>
        <div>
          <h2>모임 선정 도서</h2>
        </div>
        <div>
          <h3>{clubDetail.bookTitle}</h3>
          <p>{clubDetail.author}</p>
          <p>{clubDetail.publisher}</p>
        </div>
      </div>
    </>
  );
}

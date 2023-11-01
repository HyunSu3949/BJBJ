import { useEffect, useState } from 'react';
import { getClubDetails } from '../../../apis/clubApis';
import { ClubDetailsType } from '../../types';
import ApplyButton from '../joinButton/ApplyButton';
import LikeButton from '../likeButton/LikeButton';
import ClubImgBig from './../../common/clubImg/ClubImgBit';
import * as S from './styles';

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
    <S.Wrapper>
      <S.TopBox>
        <h2>모임 소개</h2>
        <div>
          <S.TopLeftDiv>
            <ClubImgBig imgUrl={clubDetail.imgUrl} />
          </S.TopLeftDiv>
          <S.TopRightDiv>
            <S.TextBox>
              <h3>{clubDetail.title}</h3>
              <p>{clubDetail.contents}</p>
              <p>{clubDetail.description}</p>
              <S.TagBox>
                {clubDetail.tags.split(',').map(tag => (
                  <div key={tag}>{tag}</div>
                ))}
              </S.TagBox>
            </S.TextBox>
            <S.ButtonBox>
              <ApplyButton status={clubDetail.status} clubId={clubId} />
              <div>
                <LikeButton clubId={clubId} />
              </div>
            </S.ButtonBox>
          </S.TopRightDiv>
        </div>
      </S.TopBox>
      <S.BottomBox>
        <h2>모임 선정 도서</h2>
        <div>
          <div>
            <h3>책 제목</h3>
            <p>{clubDetail.bookTitle}</p>
          </div>
          <div>
            <h3>작가</h3>
            <p>{clubDetail.author}</p>
          </div>
          <div>
            <h3>출판사</h3>
            <p>{clubDetail.publisher}</p>
          </div>
        </div>
      </S.BottomBox>
    </S.Wrapper>
  );
}

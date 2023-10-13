import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { cancleLikesClub, likesClub } from '../../../apis/clubApis';

export default function useLikeClub({ clubId }: { clubId: string }) {
  const { userProfile, userInfo, fetchJoiedLikedClubData } = useUserContext();
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    if (userInfo.likedClubs.includes(clubId)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [userInfo.likedClubs.length]);

  const onClickForLike = async () => {
    await likesClub({ clubId, userId: userProfile.userId });
    fetchJoiedLikedClubData();
  };

  const onClickForCancleLike = async () => {
    await cancleLikesClub({ clubId, userId: userProfile.userId });
    fetchJoiedLikedClubData();
  };

  return { isLike, onClickForLike, onClickForCancleLike };
}

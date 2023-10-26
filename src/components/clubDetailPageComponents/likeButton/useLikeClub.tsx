import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { cancleLikesClub, likesClub } from '../../../apis/clubApis';

export default function useLikeClub({ clubId }: { clubId: string }) {
  const { userProfile, likedClubs, fetchLikedClubs } = useUserContext();
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    if (likedClubs.some(data => data.clubId == clubId)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [clubId, likedClubs]);

  const onClickForLike = async () => {
    await likesClub({ clubId, userId: userProfile.userId });
    fetchLikedClubs(userProfile.userId);
  };

  const onClickForCancleLike = async () => {
    await cancleLikesClub({ clubId, userId: userProfile.userId });
    fetchLikedClubs(userProfile.userId);
  };

  return { isLike, onClickForLike, onClickForCancleLike };
}

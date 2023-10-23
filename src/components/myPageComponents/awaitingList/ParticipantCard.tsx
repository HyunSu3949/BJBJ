import React from 'react';
import { removeParticipant } from '../../../apis/clubApis';

type Props = {
  memberId: string;
  clubId: string;
  user: { userId: string; imgUrl: string; userName: string };
  fetchList: () => void;
};

export default function ParticipantCard({ clubId, user, fetchList }: Props) {
  const onRemove = async () => {
    await removeParticipant({ clubId, userId: user.userId });
    fetchList();
  };
  return (
    <div>
      <img src={user.imgUrl} alt="유저 프로필 사진" />
      <span>{user.userName}</span>
      <button onClick={onRemove}>내보내기</button>
    </div>
  );
}

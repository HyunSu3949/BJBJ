import React from 'react';
import { approveMember, rejectMember } from '../../../apis/clubApis';

type Props = {
  memberId: string;
  clubId: string;
  user: { userId: string; imgUrl: string; userName: string };
  fetchList: () => void;
};
export default function AwaitngCard({
  memberId,
  clubId,
  user,
  fetchList,
}: Props) {
  const onApprove = async () => {
    await approveMember(memberId);
    fetchList();
  };
  const onReject = async () => {
    await rejectMember({ clubId, userId: user.userId });
    fetchList();
  };
  return (
    <div>
      <img src={user.imgUrl} alt="유저 프로필 사진" />
      <span>{user.userName}</span>
      <button onClick={onApprove}>승인</button>
      <button onClick={onReject}>거절</button>
    </div>
  );
}

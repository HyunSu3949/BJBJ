import React from 'react';
import { useUserContext } from '../../contexts/userContext';

type Props = {
  userId: string;
  userName: string;
  imgUrl: string;
  contents: string;
  commentId: string;
  handleDeleteComment: (id: string) => void;
};
export default function Comment({
  userName,
  imgUrl,
  contents,
  userId,
  commentId,
  handleDeleteComment,
}: Props) {
  const { userProfile } = useUserContext();
  return (
    <>
      <div>
        <img src={imgUrl} alt="유저 이미지" />
      </div>
      <div>
        <span>{userName}</span>
        {userId == userProfile.userId && (
          <div>
            <button onClick={() => handleDeleteComment(commentId)}>삭제</button>
          </div>
        )}
      </div>
      <p>{contents}</p>
    </>
  );
}

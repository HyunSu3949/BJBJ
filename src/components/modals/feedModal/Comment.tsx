import { useUserContext } from '../../contexts/userContext';
import UserImg from '../../common/userImg/UserImg';

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
        <UserImg imgUrl={imgUrl} />
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

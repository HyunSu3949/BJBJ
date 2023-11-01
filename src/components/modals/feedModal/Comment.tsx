import { useUserContext } from '../../contexts/userContext';
import UserImg from '../../common/userImg/UserImg';
import * as S from './styles';

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
    <S.CommentWrapper>
      <div className="user-image-wrapper">
        <UserImg imgUrl={imgUrl} />
      </div>
      <div className="comment-content-wrapper">
        <div className="user-info-wrapper">
          <span className="user-name">{userName}</span>
          {userId == userProfile.userId && (
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(commentId)}
            >
              삭제
            </button>
          )}
        </div>
        <p className="comment-text">{contents}</p>
      </div>
    </S.CommentWrapper>
  );
}

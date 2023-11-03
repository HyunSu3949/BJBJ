import ReactModal from 'react-modal';
import useFeed from './useFeed';
import CloseIcon from '../../../assets/image/close.svg';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';
import CommentForm from './CommentForm';
import LikeFeedButton from './LikeFeedButton';
import UserImg from '../../common/userImg/UserImg';
import CommentIcon from '../../../assets/image/comment.svg';
import * as S from './styles';
import { domains } from '../../../constants/constants';

type Props = {
  onClose: () => void;
  feedId: string;
};

export default function FeedModal({ onClose, feedId }: Props) {
  const {
    isLiked,
    feedDetails,
    commentList,
    handlePostComment,
    openEditFeedModal,
    handleDeleteComment,
    handleLikeFeed,
    handleDeleteLikeFeed,
  } = useFeed({ feedId });

  const { userProfile } = useUserContext();
  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.Wrapper>
        <S.IconDiv>
          <CloseIcon onClick={onClose} />
        </S.IconDiv>
        <S.TopDiv>
          <div>
            <UserImg imgUrl={feedDetails.user.imgUrl} />
            <span>{feedDetails.user.userName}</span>
          </div>

          {userProfile.userId == feedDetails?.user.userId && (
            <button onClick={openEditFeedModal}>수정/삭제</button>
          )}
        </S.TopDiv>
        <S.MidDiv>
          <h2>{feedDetails.title}</h2>
          <p>{feedDetails.contents}</p>
          {feedDetails.imgUrl && (
            <img src={domains.imgUrl + feedDetails.imgUrl} />
          )}
          <S.ButtonDiv>
            <div>
              <LikeFeedButton
                isLiked={isLiked}
                feedId={feedId}
                handleLikeFeed={handleLikeFeed}
                handleDeleteLikeFeed={handleDeleteLikeFeed}
              />
              <span>{feedDetails.likes}</span>
            </div>
            <div>
              <CommentIcon />
              <span>{commentList.length}</span>
            </div>
          </S.ButtonDiv>
          <div>
            <CommentForm
              feedId={feedId}
              handlePostComment={handlePostComment}
            />
          </div>
        </S.MidDiv>
        <S.BottomDiv>
          <ul>
            {commentList.map((comment, idx) => (
              <li key={idx}>
                <Comment
                  {...comment}
                  handleDeleteComment={handleDeleteComment}
                />
              </li>
            ))}
          </ul>
        </S.BottomDiv>
      </S.Wrapper>
    </ReactModal>
  );
}

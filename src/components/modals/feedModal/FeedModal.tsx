import ReactModal from 'react-modal';
import useFeed from './useFeed';
import CloseIcon from '../../../assets/image/close.svg';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';
import CommentForm from './CommentForm';
import LikeFeedButton from './LikeFeedButton';

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
      className="ModalSmall"
      overlayClassName="Overlay"
    >
      <div>
        <CloseIcon onClick={onClose} />
        {userProfile.userId == feedDetails?.user.userId && (
          <button onClick={openEditFeedModal}>수정/삭제</button>
        )}
      </div>
      <div>
        <span>{feedDetails && feedDetails.user.userName}</span>
        <h2>{feedDetails && feedDetails.title}</h2>
        <div>{feedDetails && feedDetails.contents}</div>
      </div>
      <div>
        <LikeFeedButton
          isLiked={isLiked}
          feedId={feedId}
          handleLikeFeed={handleLikeFeed}
          handleDeleteLikeFeed={handleDeleteLikeFeed}
        />
      </div>
      <div>
        <CommentForm feedId={feedId} handlePostComment={handlePostComment} />
      </div>
      <div>
        <ul>
          {commentList.map((comment, idx) => (
            <li key={idx}>
              <Comment {...comment} handleDeleteComment={handleDeleteComment} />
            </li>
          ))}
        </ul>
      </div>
    </ReactModal>
  );
}

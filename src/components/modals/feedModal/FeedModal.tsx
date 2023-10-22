import ReactModal from 'react-modal';
import useFeed from './useFeed';
import CommentForm from './CommentForm';
import CloseIcon from '../../../assets/image/close.svg';
import { useUserContext } from '../../contexts/userContext';
type Props = {
  onClose: () => void;
  feedId: string;
};
export default function FeedModal({ onClose, feedId }: Props) {
  const { feedDetails, commentList, handlePostComment, openEditFeedModal } =
    useFeed({ feedId });

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
        <CommentForm feedId={feedId} handlePostComment={handlePostComment} />
      </div>
      <div>
        <ul>
          {commentList.map((comment, idx) => (
            <li key={idx}>
              <p>{comment.userName}</p>
              <p>{comment.contents}</p>
            </li>
          ))}
        </ul>
      </div>
    </ReactModal>
  );
}

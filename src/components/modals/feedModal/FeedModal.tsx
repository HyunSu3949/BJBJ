import ReactModal from 'react-modal';
import useFeed from './useFeed';
import CloseIcon from '../../../assets/image/close.svg';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';
import CommentForm from './CommentForm';
import LikeFeedButton from './LikeFeedButton';
import UserImg from '../../common/userImg/UserImg';
import ClubImg from '../../common/clubImg/ClubImg';

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
      <div
        style={{
          width: '95%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {userProfile.userId == feedDetails?.user.userId && (
          <button onClick={openEditFeedModal}>수정/삭제</button>
        )}
        <CloseIcon onClick={onClose} />
      </div>
      <div>
        <UserImg imgUrl={feedDetails.user.imgUrl} />
        <span>{feedDetails.user.userName}</span>
        <h2>{feedDetails.title}</h2>
        <div>{feedDetails.contents}</div>
        {feedDetails.imgUrl && <ClubImg imgUrl={feedDetails.imgUrl} />}
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

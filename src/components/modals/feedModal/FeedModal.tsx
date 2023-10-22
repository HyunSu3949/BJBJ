import { useEffect } from 'react';
import ReactModal from 'react-modal';
import useFeed from './useFeed';

type Props = {
  onClose: () => void;
  feedId: string;
};
export default function FeedModal({ onClose, feedId }: Props) {
  const { feedDetails, commentList } = useFeed({ feedId });

  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={onClose}
      className="ModalSmall"
      overlayClassName="Overlay"
    >
      <div>
        <span>{feedDetails && feedDetails.user.userName}</span>
        <h2>{feedDetails && feedDetails.title}</h2>
        <div>{feedDetails && feedDetails.contents}</div>
      </div>
      <div>
        <ul>
          {commentList.map((comment, idx) => (
            <li key={idx}>{comment.contents}</li>
          ))}
        </ul>
      </div>
    </ReactModal>
  );
}

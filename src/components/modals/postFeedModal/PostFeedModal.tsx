import FeedForm from './FeedForm';
import ReactModal from 'react-modal';

type Props = {
  onClose: () => void;
  message: string;
  btnText: string;
  clubId: string;
};

export default function PostFeedModal({
  onClose,
  message,
  btnText,
  clubId,
}: Props) {
  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h1 className="sr-only">{message}</h1>
      <FeedForm onClose={onClose} clubId={clubId} />
    </ReactModal>
  );
}

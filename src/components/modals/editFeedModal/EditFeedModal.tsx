import ReactModal from 'react-modal';
import EditFeedForm from './EditFeedForm';

type Props = {
  onClose: () => void;
  handleDelete: () => void;
  handleEdit: (PutFeed: PutFeedType) => void;
  message: string;
  feedId: string;
  clubId: string;
};
type PutFeedType = {
  feedId: string;
  clubId: string;
  userId: string;
  title: string;
  contents: string;
  imgUrl: string;
};

export default function EditFeedModal({
  onClose,
  message,
  clubId,
  feedId,
  handleDelete,
  handleEdit,
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
      <EditFeedForm
        feedId={feedId}
        clubId={clubId}
        onClose={onClose}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </ReactModal>
  );
}

import EditFeedForm from './EditFeedForm';
import ReactModal from 'react-modal';

type Props = {
  onClose: () => void;
  handleDelete: () => void;
  handleEdit: (PutFeed: PutFeedType) => void;
  message: string;
  feedId: string;
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
      <h1>{message}</h1>
      <EditFeedForm
        feedId={feedId}
        onClose={onClose}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </ReactModal>
  );
}

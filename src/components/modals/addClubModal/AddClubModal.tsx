import ReactModal from 'react-modal';
import ClubForm from './ClubForm';

type Props = {
  onClose: () => void;
  message: string;
  btnText: string;
};

export default function AddClubModal({ onClose, message, btnText }: Props) {
  const handleClose = () => {
    onClose();
  };
  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={handleClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h1>{message}</h1>
      <ClubForm handleClose={handleClose} />
      <div>
        <button onClick={handleClose}>취소</button>
      </div>
    </ReactModal>
  );
}

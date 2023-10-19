import ReactModal from 'react-modal';

type Props = {
  onClose: () => void;
  message: string;
  btnText: string;
};

export default function AddClubModal({ onClose, message, btnText }: Props) {
  const handleAddClub = () => {};
  const handleClose = () => {
    onClose();
  };
  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={handleClose}
      className="ModalSmall"
      overlayClassName="Overlay"
    >
      <h1>{message}</h1>
      <div>
        <button onClick={handleAddClub}>{btnText}</button>
        <button onClick={handleClose}>취소</button>
      </div>
    </ReactModal>
  );
}

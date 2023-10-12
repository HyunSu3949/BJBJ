import ReactModal from 'react-modal';

type Props = {
  onClose: () => void;
  message: string;
  btnText: string;
};
export default function CompletionModal({ onClose, message, btnText }: Props) {
  const handleClickCancel = () => {
    onClose();
  };

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
      <p>{message}</p>
      <div>
        <button onClick={handleClickCancel}>{btnText}</button>
      </div>
    </ReactModal>
  );
}

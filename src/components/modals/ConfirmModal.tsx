import ReactModal from 'react-modal';

type Props = {
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  btnText: string;
};
export default function ConfirmModal({
  onConfirm,
  onClose,
  message,
  btnText,
}: Props) {
  const handleClickCancel = () => {
    onClose();
  };

  const handleClickConfirm = () => {
    onConfirm();
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
        <button onClick={handleClickConfirm}>{btnText}</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </ReactModal>
  );
}

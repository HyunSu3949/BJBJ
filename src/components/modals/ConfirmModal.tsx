import ReactModal from 'react-modal';
import './modal.css';
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
      <p className="modal-text">{message}</p>
      <div className="modal-button-box">
        <button className="modal-button" onClick={handleClickConfirm}>
          {btnText}
        </button>
        <button className="modal-button-cancle" onClick={handleClickCancel}>
          취소
        </button>
      </div>
    </ReactModal>
  );
}

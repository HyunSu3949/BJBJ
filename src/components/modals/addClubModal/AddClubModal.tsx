import ReactModal from 'react-modal';
import ClubForm from './ClubForm';
import * as S from './styles';

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
      <S.Heading>
        <h1>{message}</h1>
      </S.Heading>
      <ClubForm handleClose={handleClose} />
    </ReactModal>
  );
}

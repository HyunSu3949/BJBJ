import AddClubIcon from '../../../assets/image/add_club_button.svg';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

export default function AddClubButton() {
  const { openModal } = useModalContext();

  const onClick = () => {
    openModal({
      Component: modals.AddClubModal,
      props: {
        message: '모임 등록 하기',
        btnText: '등록',
      },
    });
  };
  return (
    <button onClick={onClick} aria-label="독서 모임 만들기 버튼">
      <AddClubIcon />
    </button>
  );
}

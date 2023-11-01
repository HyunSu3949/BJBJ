import PlusIcon from '../../../assets/image/plus.svg';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';
import * as S from './styles';

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
    <S.Button onClick={onClick} aria-label="독서 모임 만들기 버튼">
      <PlusIcon />
      독서 모임 만들기
    </S.Button>
  );
}

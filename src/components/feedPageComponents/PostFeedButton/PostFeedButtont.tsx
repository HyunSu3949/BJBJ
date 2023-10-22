import PancleIcon from '../../../assets/image/pancle.svg';

import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

export default function PostFeedButton() {
  const { openModal } = useModalContext();
  const onClick = () => {
    openModal({
      Component: modals.PostFeedModal,
      props: {
        message: '글 작성하기',
        btnText: '글쓰기',
      },
    });
  };
  return (
    <button onClick={onClick}>
      <PancleIcon />
    </button>
  );
}

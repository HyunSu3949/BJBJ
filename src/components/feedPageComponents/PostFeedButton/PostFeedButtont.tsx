import { useParams } from 'react-router-dom';
import PancleIcon from '../../../assets/image/pancle.svg';

import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

type PostFeedModalProps = {
  clubId: string;
};
export default function PostFeedButton() {
  const { clubId } = useParams();
  const { openModal } = useModalContext();
  const onClick = () => {
    if (clubId) {
      openModal<PostFeedModalProps>({
        Component: modals.PostFeedModal,
        props: {
          message: '글 작성하기',
          btnText: '글쓰기',
          clubId,
        },
      });
    }
  };
  return (
    <button onClick={onClick}>
      <PancleIcon />
    </button>
  );
}

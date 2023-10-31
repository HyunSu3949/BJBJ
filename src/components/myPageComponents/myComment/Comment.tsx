import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';
import UserImg from '../../common/userImg/UserImg';
import * as S from './styles';

type Props = {
  imgUrl: string;
  contents: string;
  feedId: string;
};
type FeedModalType = {
  feedId: string;
};

export default function Comment({ imgUrl, contents, feedId }: Props) {
  const { openModal } = useModalContext();
  const onClick = () => {
    openModal<FeedModalType>({
      Component: modals.FeedModal,
      props: {
        message: '',
        btnText: '',
        feedId,
      },
    });
  };
  return (
    <S.ItemWrapper>
      <div>
        <UserImg imgUrl={imgUrl} />
      </div>
      <p>{contents}</p>
      <button onClick={onClick}>글보기</button>
    </S.ItemWrapper>
  );
}

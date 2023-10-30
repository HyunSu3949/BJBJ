import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';
import UserImg from '../userImg/UserImg';
import HeartIcon from '../../../assets/image/empty_heart.svg';
import CommentIcon from '../../../assets/image/comment.svg';
import { FeedCardSmallType } from '../../types';

import * as S from './styles';

type FeedModal = {
  feedId: string;
};

export default function FeedCardSmall(props: FeedCardSmallType) {
  const { openModal } = useModalContext();

  const openFeedModal = (feedId: string) => {
    openModal<FeedModal>({
      Component: modals.FeedModal,
      props: {
        message: '',
        btnText: '',
        feedId,
      },
    });
  };
  return (
    <S.Wrapper onClick={() => openFeedModal(props.feedId)}>
      <S.TopBox>
        <UserImg imgUrl={props.user.imgUrl} />
        <span>{props.user.userName}</span>
      </S.TopBox>
      <S.Paragraph>{props.contents}</S.Paragraph>
      <S.BottomBox>
        <div>
          <CommentIcon />
          <span>{props.commentCount}</span>
        </div>
        <div>
          <HeartIcon />
          <span>{props.likes}</span>
        </div>
      </S.BottomBox>
    </S.Wrapper>
  );
}

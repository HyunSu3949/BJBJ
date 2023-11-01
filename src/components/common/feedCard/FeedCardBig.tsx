import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';
import UserImg from '../userImg/UserImg';
import HeartIcon from '../../../assets/image/empty_heart.svg';
import CommentIcon from '../../../assets/image/comment.svg';
import { FeedCardSmallType } from '../../types';

import { useUserContext } from '../../contexts/userContext';
import * as S from './styles';

type FeedModal = {
  feedId: string;
};

export default function FeedCardBig(props: FeedCardSmallType) {
  const { openModal } = useModalContext();
  const { userProfile } = useUserContext();

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
    <S.Wrapper onClick={() => openFeedModal(props.feedId)} big={true}>
      <S.BigWrapper>
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
      </S.BigWrapper>
      <S.FormWrapper>
        <UserImg imgUrl={userProfile.imgUrl} />
        <S.Form>
          <input type="text" />
          <button type="submit">등록</button>
        </S.Form>
      </S.FormWrapper>
    </S.Wrapper>
  );
}

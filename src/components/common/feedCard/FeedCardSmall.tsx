import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';
import UserImg from '../userImg/UserImg';
import HeartIcon from '../../../assets/image/empty_heart.svg';
import CommentIcon from '../../../assets/image/comment.svg';
import { FeedCardSmallType } from '../../types';

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
    <div onClick={() => openFeedModal(props.feedId)}>
      <div>
        <UserImg imgUrl={props.user.imgUrl} />
        <span>{props.user.userName}</span>
      </div>
      <p>{props.contents}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CommentIcon />
        <p>{props.commentCount}</p>
        <HeartIcon />
        <p>{props.likes}</p>
      </div>
    </div>
  );
}

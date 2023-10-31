import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

type Feed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  feedId: string;
  contents: string;
  likes: string;
  commentCount: string;
};

type FeedModal = {
  feedId: string;
};

export default function FeedCardBig(props: Feed) {
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
      <img src={props.user.imgUrl} alt="피드 유저 사진" />
      <span>{props.user.userName}</span>
      <p>{props.contents}</p>
      <p>comments: {props.commentCount}</p>
      <p>Likes: {props.likes}</p>
    </div>
  );
}

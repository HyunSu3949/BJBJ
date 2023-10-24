import { MainFeed } from '../../../mocks/types';
import UserImg from '../userImg/UserImg';

export default function FeedCardSmall(props: MainFeed) {
  return (
    <>
      <div>
        <UserImg imgUrl={props.user.imgUrl} />
        <span>{props.user.userName}</span>
      </div>
      <p>{props.contents}</p>
      <p>comments: {props.commentCount}</p>
      <p>Likes: {props.likes}</p>
    </>
  );
}

type Feed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  id: string;
  likes: number;
  contents: string;
  commentCount: string;
};
export default function FeedCardSmall(props: Feed) {
  return (
    <li key={props.id}>
      <div>
        <img src={props.user.imgUrl} alt="피드 유저 사진" />
        <span>{props.user.userName}</span>
      </div>
      <p>{props.contents}</p>
      <p>comments: {props.commentCount}</p>
      <p>Likes: {props.likes}</p>
    </li>
  );
}

import CommentList from './../../components/myPageComponents/myComment/CommentList';
import MyFeedList from '../../components/myPageComponents/myFeedList/MyFeedList';
import MyLikedClubList from '../../components/myPageComponents/myLikedClubList/MyLikedClubList';

export default function AboutMyActivity() {
  return (
    <div>
      <h2>내가 쓴 댓글</h2>
      <CommentList />
      <h2>내가 좋아요한 독서 모임</h2>
      <MyLikedClubList />
      <h2>내가 쓴 피드</h2>
      <MyFeedList />
    </div>
  );
}

import CommentList from '../../../components/myPageComponents/myComment/CommentList';
import MyFeedList from '../../../components/myPageComponents/myFeedList/MyFeedList';
import MyLikedClubList from '../../../components/myPageComponents/myLikedClubList/MyLikedClubList';
import * as S from './styles';

export default function AboutMyActivity() {
  return (
    <S.Wrapper>
      <div>
        <h2>내가 쓴 댓글</h2>
        <CommentList />
      </div>
      <div>
        <h2>내가 좋아요한 독서 모임</h2>
        <MyLikedClubList />
      </div>
      <div>
        <h2>내가 쓴 피드</h2>
        <MyFeedList />
      </div>
    </S.Wrapper>
  );
}

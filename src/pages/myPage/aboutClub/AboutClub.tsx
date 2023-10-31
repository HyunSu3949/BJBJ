import EditMyClubForm from '../../../components/myPageComponents/editMyClubForm/EditMyClubForm';
import MyJoinedClubList from '../../../components/myPageComponents/myJoinedClubList/MyJoinedClubList';
import UserList from '../../../components/myPageComponents/awaitingList/UserList';
import * as S from './styles';

export default function AboutClub() {
  return (
    <S.Wrapper>
      <div>
        <h2>내가 참여중인 독서모임</h2>
        <MyJoinedClubList />
      </div>
      <div>
        <h2>내가 운영중인 독서모임</h2>
        <h3>참여자 관리</h3>
        <S.ListDiv>
          <UserList />
        </S.ListDiv>
        <h3>독서모임 수정하기</h3>
        <S.ListDiv>
          <EditMyClubForm />
        </S.ListDiv>
      </div>
    </S.Wrapper>
  );
}

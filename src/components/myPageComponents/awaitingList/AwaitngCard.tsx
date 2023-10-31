import { approveMember, rejectMember } from '../../../apis/clubApis';
import UserImg from '../../common/userImg/UserImg';
import * as S from './styles';

type Props = {
  memberId: string;
  clubId: string;
  user: { userId: string; imgUrl: string; userName: string };
  fetchList: () => void;
};
export default function AwaitngCard({
  memberId,
  clubId,
  user,
  fetchList,
}: Props) {
  const onApprove = async () => {
    await approveMember(memberId);
    fetchList();
  };
  const onReject = async () => {
    await rejectMember({ clubId, userId: user.userId });
    fetchList();
  };
  return (
    <S.ItemWrapper>
      <div>
        <UserImg imgUrl={user.imgUrl} />
      </div>
      <p>{user.userName}</p>
      <div>
        <button onClick={onApprove}>승인</button>
        <button onClick={onReject}>거절</button>
      </div>
    </S.ItemWrapper>
  );
}

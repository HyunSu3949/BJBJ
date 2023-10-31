import { removeParticipant } from '../../../apis/clubApis';
import UserImg from '../../common/userImg/UserImg';
import * as S from './styles';

type Props = {
  memberId: string;
  clubId: string;
  user: { userId: string; imgUrl: string; userName: string };
  fetchList: () => void;
};

export default function ParticipantCard({ clubId, user, fetchList }: Props) {
  const onRemove = async () => {
    await removeParticipant({ clubId, userId: user.userId });
    fetchList();
  };
  return (
    <S.ItemWrapper>
      <div>
        <UserImg imgUrl={user.imgUrl} />
      </div>
      <p>{user.userName}</p>
      <button onClick={onRemove}>내보내기</button>
    </S.ItemWrapper>
  );
}

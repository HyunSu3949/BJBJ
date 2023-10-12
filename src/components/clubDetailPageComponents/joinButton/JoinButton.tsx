import { ClubDetailsStatus } from '../../types';
import useJoinClub from './useJoinClub';

export default function JoinButton({
  status,
  clubId,
}: {
  status: ClubDetailsStatus;
  clubId: string;
}) {
  const { buttonStatus } = useJoinClub({
    clubId,
    status,
  });

  return (
    <>
      <button onClick={buttonStatus.onClick}>{buttonStatus.text}</button>
    </>
  );
}

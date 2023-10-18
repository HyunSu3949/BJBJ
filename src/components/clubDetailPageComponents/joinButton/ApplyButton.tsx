import { ClubDetailsStatus } from '../../types';
import useApplyClub from './useApplyClub';

export default function ApplyButton({
  status,
  clubId,
}: {
  status: ClubDetailsStatus;
  clubId: string;
}) {
  const { buttonStatus } = useApplyClub({
    clubId,
    status,
  });

  return (
    <>
      <button onClick={buttonStatus.onClick}>{buttonStatus.text}</button>
    </>
  );
}

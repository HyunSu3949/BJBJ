import useLikeClub from './useLikeClub';
import EmptyHeart from '../../../assets/image/empty_heart.svg';
import FilledHeart from '../../../assets/image/filled_heart.svg';

export default function LikeButton({ clubId }: { clubId: string }) {
  const { onClickForCancleLike, onClickForLike, isLike } = useLikeClub({
    clubId,
  });

  return isLike ? (
    <FilledHeart onClick={onClickForCancleLike} aria-label="좋아요 취소 버튼" />
  ) : (
    <EmptyHeart onClick={onClickForLike} aria-label="좋아요 버튼" />
  );
}

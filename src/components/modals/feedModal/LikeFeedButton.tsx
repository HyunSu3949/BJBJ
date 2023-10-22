import React from 'react';
import EmptyHeart from '../../../assets/image/empty_heart.svg';
import FilledHeart from '../../../assets/image/filled_heart.svg';

type Props = {
  isLiked: boolean;
  feedId: string;
  handleLikeFeed: (feedId: string) => void;
  handleDeleteLikeFeed: (feedId: string) => void;
};
export default function LikeFeedButton({
  isLiked,
  feedId,
  handleLikeFeed,
  handleDeleteLikeFeed,
}: Props) {
  return isLiked ? (
    <FilledHeart
      onClick={() => handleDeleteLikeFeed(feedId)}
      aria-label="좋아요 취소 버튼"
    />
  ) : (
    <EmptyHeart
      onClick={() => handleLikeFeed(feedId)}
      aria-label="좋아요 버튼"
    />
  );
}

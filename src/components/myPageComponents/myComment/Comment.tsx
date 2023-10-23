import React from 'react';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

type Props = {
  imgUrl: string;
  contents: string;
  feedId: string;
};
type FeedModalType = {
  feedId: string;
};
export default function Comment({ imgUrl, contents, feedId }: Props) {
  const { openModal } = useModalContext();
  const onClick = () => {
    openModal<FeedModalType>({
      Component: modals.FeedModal,
      props: {
        message: '',
        btnText: '',
        feedId,
      },
    });
  };
  return (
    <div>
      <img src={imgUrl} alt="유저 프로필 이미지" />
      <p>{contents}</p>
      <button onClick={onClick}>글보기</button>
    </div>
  );
}

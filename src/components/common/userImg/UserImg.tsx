import React, { useState } from 'react';
import * as S from './styles';
type Props = {
  imgUrl: string;
};

export default function UserImg({ imgUrl }: Props) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <S.BasigUserProfile />;
  }

  return <S.Img src={imgUrl} onError={handleError} alt="유저 프로필 이미지" />;
}

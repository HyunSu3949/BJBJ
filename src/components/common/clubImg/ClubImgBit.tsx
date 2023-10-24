import React, { useState } from 'react';
import * as S from './styles';
type Props = {
  imgUrl: string;
};

export default function ClubImgBig({ imgUrl }: Props) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <S.BasigClubImgBig />;
  }

  return <S.Img src={imgUrl} onError={handleError} alt="독서모임 배경사진" />;
}
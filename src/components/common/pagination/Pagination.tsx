import React from 'react';
import * as S from './styles';

type Props = {
  maxPage: number;
  setPage: (i: number) => void;
};

export default function Pagination({ maxPage, setPage }: Props) {
  return (
    <S.List style={{ display: 'flex' }}>
      {Array(maxPage)
        .fill(0)
        .map((_, i) => i + 1)
        .map((v, i) => (
          <S.Item key={i} onClick={() => setPage(i + 1)}>
            {v}
          </S.Item>
        ))}
    </S.List>
  );
}

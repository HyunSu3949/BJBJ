import React, { useState } from 'react';
import * as S from './styles';
import { Wrapper } from './../clubCard/styles';

type Props = {
  maxPage: number;
  setPage: (i: number) => void;
};

export default function Pagination({ maxPage = 1, setPage }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  if (!maxPage || maxPage < 1) return null;

  return (
    <S.Wrapper>
      <S.List>
        <S.Item onClick={handlePrevious}>&lt;</S.Item>
        {Array(maxPage)
          .fill(0)
          .map((_, i) => i + 1)
          .map((v, i) => (
            <S.Item
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                setPage(i + 1);
              }}
              isActive={currentPage === v}
            >
              {v}
            </S.Item>
          ))}
        <S.Item onClick={handleNext}>&gt;</S.Item>
      </S.List>
    </S.Wrapper>
  );
}

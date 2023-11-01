import React from 'react';
import PostFeedButton from '../../components/feedPageComponents/PostFeedButton/PostFeedButtont';
import FeedList from '../../components/feedPageComponents/feedList/FeedList';
import * as S from './styles';

export default function FeedPage() {
  return (
    <S.Wrapper>
      <h1 className="sr-only">피드 페이지</h1>
      <S.ButtonWrapper>
        <PostFeedButton />
      </S.ButtonWrapper>
      <S.ContentsWrapper>
        <FeedList />
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}

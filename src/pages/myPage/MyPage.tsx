import React, { useState } from 'react';
import AboutMyActivity from './aboutMyActivity/AboutMyActivity';
import AboutClub from './aboutClub/AboutClub';
import * as S from './styles';

export default function MyPage() {
  const [toggle, setToggle] = useState('activity');

  return (
    <>
      <h1 className="sr-only">마이페이지</h1>
      <S.ButtonDiv>
        <S.ToggleButton
          isActive={toggle === 'activity'}
          onClick={() => {
            setToggle('activity');
          }}
        >
          내 활동
        </S.ToggleButton>
        <S.ToggleButton
          isActive={toggle === 'club'}
          onClick={() => {
            setToggle('club');
          }}
        >
          독서 모임
        </S.ToggleButton>
      </S.ButtonDiv>
      <S.ContentsDiv>
        {toggle == 'activity' ? <AboutMyActivity /> : <AboutClub />}
      </S.ContentsDiv>
    </>
  );
}

import React, { useState } from 'react';
import AboutMyActivity from './AboutMyActivity';
import AboutClub from './AboutClub';

export default function MyPage() {
  const [toggle, setToggle] = useState('activity');

  return (
    <>
      <h1>마이페이지</h1>
      <button
        onClick={() => {
          setToggle('activity');
        }}
      >
        내 활동
      </button>{' '}
      <button
        onClick={() => {
          setToggle('club');
        }}
      >
        독서 모임
      </button>
      {toggle == 'activity' ? <AboutMyActivity /> : <AboutClub />}
    </>
  );
}

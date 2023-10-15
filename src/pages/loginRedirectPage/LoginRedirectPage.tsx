import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRedirectPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('handleLogin');
    const queryString = window.location.search;
    console.log('handleLogin');
    const urlParams = new URLSearchParams(queryString);
    const Access_Token = urlParams.get('Access_Token');
    const Refresh_Toke = urlParams.get('Refresh_Toke');
    console.log(Access_Token);
    if (Access_Token) localStorage.setItem('Access_Token', Access_Token);
    if (Refresh_Toke) localStorage.setItem('Refresh_Token', Refresh_Toke);
  };
  const afterLogin = () => {
    navigate('/');
  };

  useEffect(() => {
    handleLogin();
    afterLogin();
  }, []);
  return <div>로그인 중입니다.</div>;
}

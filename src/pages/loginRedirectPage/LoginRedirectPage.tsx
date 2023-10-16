import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRedirectPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('Access_Token', 'accessToken');
    localStorage.setItem('Refresh_Token', 'refreshToken');
  };
  const afterLogin = () => {
    navigate('/');
  };

  useEffect(() => {
    handleLogin();
    afterLogin();
  }, []);
  return (
    <>
      <h1>로그인 리다이렉트 페이지</h1>
      <div>로그인 중입니다.</div>
    </>
  );
}

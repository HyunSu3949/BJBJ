import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/contexts/userContext';

export default function LoginRedirectPage() {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage, handleLogin } = useUserContext();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('Access_Token', '0');
    queryParams.set('Refresh_Token', '0');
    storeTokenInLocalStorage();
    handleLogin();
    if (localStorage.getItem('Access_Token')) navigate('/');
  }, []);
  return (
    <>
      <h1>로그인 리다이렉트 페이지</h1>
      <div>로그인 중입니다.</div>
    </>
  );
}

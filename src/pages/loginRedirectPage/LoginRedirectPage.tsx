import React, { useEffect } from 'react';
import { domains } from '../../constants/constants';

export default function LoginRedirectPage() {
  const handleLogin = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Access_Token = urlParams.get('Access_Token');
    const Refresh_Toke = urlParams.get('Refresh_Toke');
    window.opener.postMessage(
      { Access_Token, Refresh_Toke },
      `http://${domains.frontEnd}.com`,
    );
    window.close();
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return <div>로그인 중입니다.</div>;
}

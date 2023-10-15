import React, { useEffect } from 'react';
import { domains } from '../../constants/constants';

export default function NavBar() {
  useEffect(() => {
    const handleTokenMessage = (event: MessageEvent) => {
      if (event.origin !== `${domains.frontEnd}`) {
        return;
      }

      const Access_Token = event.data.Access_Token;
      const Refresh_Toke = event.data.Refresh_Toke;
      localStorage.setItem('Access_Token', Access_Token);
      localStorage.setItem('Refresh_Token', Refresh_Toke);
    };

    window.addEventListener('message', handleTokenMessage);
  }, []);

  return (
    <div>
      <a
        href={domains.backEnd + '/oauth2/authorization/google'}
        target="_blank"
        rel="noopener noreferrer"
      >
        로그인
      </a>
    </div>
  );
}

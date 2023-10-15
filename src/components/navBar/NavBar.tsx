import { domains } from '../../constants/constants';

export default function NavBar() {
  return (
    <div>
      <a href={domains.backEnd + '/oauth2/authorization/google'}>로그인</a>
    </div>
  );
}

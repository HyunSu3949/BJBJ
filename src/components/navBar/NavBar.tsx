import { Link } from 'react-router-dom';

import LoginButton from './LoginButton/LoginButton';
import AddClubButton from './addClubButton/AddClubButton';
import logo from '../../assets/image/bjbj_logo.png';
import JoinedClubDropdown from './joinedClubDropdown/JoinedClubDropdown';

export default function NavBar() {
  return (
    <nav style={{ display: 'flex' }}>
      <div>
        <Link to="/search">검색</Link>
        <JoinedClubDropdown />
      </div>
      <Link to="/">
        <img
          src={logo}
          alt="메인로고"
          role="button"
          style={{ width: '50px', height: '50px' }}
        />
      </Link>
      <div>
        <LoginButton />
        <AddClubButton />
      </div>
    </nav>
  );
}

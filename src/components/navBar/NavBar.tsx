import AddClubButton from '../../assets/image/add_club_button.svg';
import { useUserContext } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton/LoginButton';

import logo from '../../assets/image/bjbj_logo.png';
export default function NavBar() {
  const { joinedClubs } = useUserContext();

  return (
    <nav>
      <div>
        <Link to="/search">검색</Link>
        <button>
          <ul>
            {joinedClubs.map(club => (
              <li key={club.clubId}>{club.clubId}</li>
            ))}
          </ul>
        </button>
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
        <AddClubButton aria-label="독서 모임 만들기" role="button" />
      </div>
    </nav>
  );
}

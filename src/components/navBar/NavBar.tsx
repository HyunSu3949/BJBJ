import { domains } from '../../constants/constants';
import GoogleLogin from '../../assets/image/btn_google_light_normal_ios.svg';
import AddClubButton from '../../assets/image/add_club_button.svg';
import { useUserContext } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton/LoginButton';

export default function NavBar() {
  const { isLogedin, userProfile, userInfo, handleLogout } = useUserContext();

  return (
    <nav>
      <div>
        <Link to="/search">검색</Link>
        <button>
          <ul>
            {userInfo.joinedClubs.map(club => (
              <li key={club.clubId}>{club.clubId}</li>
            ))}
          </ul>
        </button>
      </div>
      <div>로고</div>
      <div>
        <LoginButton />
        <AddClubButton aria-label="독서 모임 만들기" role="button" />
      </div>
    </nav>
  );
}

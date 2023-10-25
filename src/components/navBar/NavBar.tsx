import { Link } from 'react-router-dom';

import LoginButton from './LoginButton/LoginButton';
import AddClubButton from './addClubButton/AddClubButton';
import logo from '../../assets/image/bjbj_logo.png';
import JoinedClubDropdown from './joinedClubDropdown/JoinedClubDropdown';
import { deleteClub } from '../../apis/clubApis';
import { useUserContext } from '../contexts/userContext';

export default function NavBar() {
  const { userProfile } = useUserContext();
  const handleDeleteClub = async () => {
    await deleteClub({ userId: userProfile.userId });
  };
  return (
    <nav style={{ display: 'flex', alignItems: 'center' }}>
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
      <div style={{ display: 'flex' }}>
        <LoginButton />
        <AddClubButton />
      </div>
      <button onClick={handleDeleteClub}>독서모임 삭제</button>
    </nav>
  );
}

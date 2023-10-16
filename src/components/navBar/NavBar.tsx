import { domains } from '../../constants/constants';
import GoogleLogin from '../../assets/image/btn_google_light_normal_ios.svg';
import AddClubButton from '../../assets/image/add_club_button.svg';
import { useUserContext } from '../contexts/userContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { isLogedin, userProfile } = useUserContext();

  return (
    <nav>
      <div>
        <Link to="/search">검색</Link>
        <button>피드</button>
      </div>
      <div>로고</div>
      <div>
        {isLogedin ? (
          <a href={domains.backEnd + '/oauth2/authorization/google'}>
            <GoogleLogin aria-label="구글 로그인" role="button" />
          </a>
        ) : (
          <Link to="/my">
            <img
              src={userProfile.imgUrl}
              role="link"
              alt="유저 프로필 이미지"
            />
          </Link>
        )}
        <AddClubButton aria-label="독서 모임 만들기" role="button" />
      </div>
    </nav>
  );
}

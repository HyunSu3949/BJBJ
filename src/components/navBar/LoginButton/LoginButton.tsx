import GoogleLogin from '../../../assets/image/btn_google_light_normal_ios.svg';
import { useUserContext } from '../../contexts/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { domains, nodeEnv } from '../../../constants/constants';
import { useEffect } from 'react';

export default function LoginButton() {
  const navigate = useNavigate();
  const { isLogedin, userProfile, handleLogout, storeTokenInLocalStorage } =
    useUserContext();
  const location = useLocation();

  useEffect(() => {
    storeTokenInLocalStorage(new URLSearchParams(location.search));
  }, [location]);

  return (
    <div>
      {isLogedin ? (
        <>
          <Link to="/my">
            <img
              src={userProfile.imgUrl}
              role="link"
              alt="유저 프로필 이미지"
            />
          </Link>
          <button
            onClick={() => {
              handleLogout();
              navigate('/');
            }}
          >
            logout
          </button>
        </>
      ) : nodeEnv == 'development' ? (
        <Link to={`/?${'Access_Token=Bearer 0'}`}>
          <GoogleLogin aria-label="구글 로그인" role="button" />
        </Link>
      ) : (
        <a href={domains.backEnd + '/oauth2/authorization/google'}>
          <GoogleLogin aria-label="구글 로그인" role="button" />
        </a>
      )}
    </div>
  );
}

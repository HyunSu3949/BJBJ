import GoogleLogin from '../../../assets/image/btn_google_light_normal_ios.svg';
import { useUserContext } from '../../contexts/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { domains, nodeEnv } from '../../../constants/constants';
import { useEffect } from 'react';
import UserImg from '../../common/userImg/UserImg';
import * as S from './styles';

export default function LoginButton() {
  const navigate = useNavigate();
  const { isLogedin, userProfile, handleLogout, storeTokenInLocalStorage } =
    useUserContext();
  const location = useLocation();

  useEffect(() => {
    storeTokenInLocalStorage(new URLSearchParams(location.search));
  }, [location, storeTokenInLocalStorage]);

  return (
    <>
      {isLogedin ? (
        <>
          <Link to="/my">
            <UserImg imgUrl={userProfile.imgUrl} />
          </Link>
          <S.TextButton
            onClick={() => {
              handleLogout();
              navigate('/');
            }}
          >
            로그아웃
          </S.TextButton>
        </>
      ) : nodeEnv == 'development' ? (
        <Link to={`/?${'Access_Token=0'}`}>
          <GoogleLogin aria-label="구글 로그인" role="button" />
        </Link>
      ) : (
        <a href={domains.backEnd + '/oauth2/authorization/google'}>
          <GoogleLogin aria-label="구글 로그인" role="button" />
        </a>
      )}
    </>
  );
}

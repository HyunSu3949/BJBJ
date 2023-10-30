import LoginButton from './LoginButton/LoginButton';
import AddClubButton from './addClubButton/AddClubButton';
import logo from '../../assets/image/bjbj_logo.png';
import JoinedClubDropdown from './joinedClubDropdown/JoinedClubDropdown';
import * as S from './styles';

export default function NavBar() {
  return (
    <S.Navbar>
      <S.LeftDiv>
        <S.UnstyledLink to="/search">검색</S.UnstyledLink>
        <JoinedClubDropdown />
      </S.LeftDiv>
      <S.CenterLogo to="/">
        <img src={logo} alt="메인로고" role="button" />
      </S.CenterLogo>
      <S.RightDiv>
        <AddClubButton />
        <LoginButton />
      </S.RightDiv>
    </S.Navbar>
  );
}

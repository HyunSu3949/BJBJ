import { Outlet } from 'react-router-dom';
import NavBar from './../navBar/NavBar';
import * as S from './styles';

export default function Layout() {
  return (
    <S.LayoutWrapper>
      <header>
        <NavBar />
      </header>
      <main style={{ background: '#D9D9D9' }}>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </S.LayoutWrapper>
  );
}

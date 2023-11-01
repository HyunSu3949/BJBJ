import { Outlet } from 'react-router-dom';
import NavBar from './../navBar/NavBar';
import * as S from './styles';

export default function Layout() {
  return (
    <S.LayoutWrapper>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </S.LayoutWrapper>
  );
}

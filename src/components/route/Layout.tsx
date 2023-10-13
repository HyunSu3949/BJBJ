import { Outlet } from 'react-router-dom';
import NavBar from './../navBar/NavBar';

export default function Layout() {
  return (
    <>
      <header>
        헤더
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </>
  );
}

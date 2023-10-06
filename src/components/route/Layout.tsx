import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </>
  );
}

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContextProvider } from '../contexts/userContext';
import MainPage from '../../pages/mainPage/MainPage';
import Layout from '../route/Layout';
import FeedPage from '../../pages/feedPage/FeedPage';
import SearchPage from '../../pages/searchPage/SearchPage';
import MyPage from '../../pages/myPage/MyPage';

const setup = async () => {
  render(
    <UserContextProvider>
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/feed/:clubId" element={<FeedPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/my" element={<MyPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </UserContextProvider>,
  );
};

const login = async () => {
  const loginButton = await screen.findByLabelText('구글 로그인');
  userEvent.click(loginButton);

  await waitFor(async () => {
    expect(
      await screen.findByAltText('유저 프로필 이미지'),
    ).toBeInTheDocument();
  });
};

describe('navBar 테스트', () => {
  beforeEach(async () => {
    await setup();
    await login();
  });

  test('로그아웃 테스트', async () => {
    expect(
      await screen.findByAltText('유저 프로필 이미지'),
    ).toBeInTheDocument();

    const logoutButton = await screen.findByRole('button', { name: 'logout' });
    userEvent.click(logoutButton);
    expect(await screen.findByLabelText('구글 로그인')).toBeInTheDocument();
  });
});

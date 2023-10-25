import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContextProvider } from '../contexts/userContext';
import { ModalContextProvider } from './../contexts/modalContext';
import MainPage from '../../pages/mainPage/MainPage';
import Layout from '../route/Layout';
import FeedPage from '../../pages/feedPage/FeedPage';
import SearchPage from '../../pages/searchPage/SearchPage';
import MyPage from '../../pages/myPage/MyPage';
import Modals from '../modals/Modals';

const setup = async () => {
  render(
    <UserContextProvider>
      <ModalContextProvider>
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
        <Modals />
      </ModalContextProvider>
    </UserContextProvider>,
  );
};

const login = async () => {
  const loginButton = await screen.findByLabelText('구글 로그인');
  await userEvent.click(loginButton);

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
      await screen.findByLabelText('유저 프로필 이미지'),
    ).toBeInTheDocument();

    const logoutButton = await screen.findByRole('button', { name: 'logout' });
    userEvent.click(logoutButton);
    expect(await screen.findByLabelText('구글 로그인')).toBeInTheDocument();
  });

  test('피드 목록 드롭다운 테스트', async () => {
    const dropButton = await screen.findByRole('button', { name: '피드' });
    expect(dropButton).toBeInTheDocument();

    userEvent.click(dropButton);

    const dropedItems =
      await screen.findByLabelText('독서모임 피드 페이지 목록');
    const listItems = within(dropedItems).queryAllByRole('listitem');

    expect(listItems).not.toHaveLength(0);

    userEvent.click(dropButton);
    await waitFor(() => {
      expect(dropedItems).not.toBeInTheDocument();
    });
  });

  test('피드페이지로 이동 테스트', async () => {
    const dropButton = await screen.findByRole('button', { name: '피드' });
    userEvent.click(dropButton);

    const dropedItems =
      await screen.findByLabelText('독서모임 피드 페이지 목록');
    const linkItems = within(dropedItems).queryAllByRole('link');
    userEvent.click(linkItems[0]);

    const feedPageHeading = await screen.findByRole('heading', {
      name: '피드 페이지',
    });
    await waitFor(() => {
      expect(feedPageHeading).toBeInTheDocument();
    });
  });

  test('독서 모임 모달 팝업', async () => {
    const addClubButton = await screen.findByLabelText('독서 모임 만들기 버튼');
    expect(addClubButton).toBeInTheDocument();

    await userEvent.click(addClubButton);
    const addClubModal = await screen.findByRole('dialog');
    expect(addClubModal).toBeInTheDocument();

    const cancleAddClub = await screen.findByRole('button', { name: '취소' });
    await userEvent.click(cancleAddClub);
    expect(addClubModal).not.toBeInTheDocument();
  });
});

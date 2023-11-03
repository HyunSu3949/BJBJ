import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContextProvider } from '../../contexts/userContext';
import Layout from '../../route/Layout';
import MainPage from '../../../pages/mainPage/MainPage';
import SearchPage from '../../../pages/searchPage/SearchPage';

const setup = async () => {
  render(
    <UserContextProvider>
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </UserContextProvider>,
  );
};

const login = async () => {
  const loginButton = await screen.findByLabelText('구글 로그인');
  expect(loginButton).toBeInTheDocument();

  await userEvent.click(loginButton);
  expect(await screen.findByLabelText('마이 페이지 링크')).toBeInTheDocument();
};

describe('메인 페이지', () => {
  beforeEach(async () => {
    await setup();
    await login();
  });

  afterEach(async () => {
    cleanup();
  });

  test('독서모임 리스트가 렌더링 테스트', async () => {
    const items = await screen.findAllByLabelText('독서 모임 카드');
    expect(items).not.toHaveLength(0);
  });

  test('피드 렌더링 테스트', async () => {
    const items = await screen.findAllByLabelText('피드 카드');
    expect(items).not.toHaveLength(0);
  });

  test('더 알아보기 버튼 클릭 시 페이지 이동', async () => {
    const linkButtons = await screen.findAllByRole('link', {
      name: '더알아보기',
    });
    expect(linkButtons).toHaveLength(2);

    await userEvent.click(linkButtons[0]);

    const searchPageHeading = await screen.findByRole('heading', {
      name: '검색페이지',
    });
    expect(searchPageHeading).toBeInTheDocument();
  });
});

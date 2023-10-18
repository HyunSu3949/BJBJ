import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { findAllByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContextProvider } from '../contexts/userContext';
import MainPage from '../../pages/mainPage/MainPage';
import LoginRedirectPage from '../../pages/loginRedirectPage/LoginRedirectPage';
import Layout from '../route/Layout';

const mockLocalStorage = (() => {
  let store: { [key in string]: string } = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe('token 테스트', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  test('로그인 테스트', async () => {
    const user = userEvent.setup();
    render(
      <UserContextProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </UserContextProvider>,
    );

    const loginButton = await screen.findByLabelText('구글 로그인');
    user.click(loginButton);

    await waitFor(async () => {
      expect(
        await screen.findByAltText('유저 프로필 이미지'),
      ).toBeInTheDocument();
    });

    const clubIds = await screen.findAllByRole('listitem');
    expect(clubIds).not.toHaveLength(0);
  });
});

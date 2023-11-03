import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClubDetailPage from './../../pages/clubDetailPage/ClubDetailPage';
import Modals from '../modals/Modals';
import { UserContextProvider } from '../contexts/userContext';
import { ModalContextProvider } from './../contexts/modalContext';
import Layout from '../route/Layout';
import MainPage from '../../pages/mainPage/MainPage';

const setup = async () => {
  render(
    <UserContextProvider>
      <ModalContextProvider>
        <MemoryRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/club/:clubId" element={<ClubDetailPage />} />
            </Route>
          </Routes>
          <Modals />
        </MemoryRouter>
      </ModalContextProvider>
    </UserContextProvider>,
  );
};
const login = async () => {
  const loginButton = await screen.findByLabelText('구글 로그인');
  expect(loginButton).toBeInTheDocument();
  await userEvent.click(loginButton);

  expect(await screen.findByLabelText('마이 페이지 링크')).toBeInTheDocument();
};

const goToClubDetail = async () => {
  const linkElements = await screen.findAllByText('더 알아보기');
  await userEvent.click(linkElements[0]);
};

describe('Club Detail Page', () => {
  beforeEach(async () => {
    await setup();
    await login();
    await goToClubDetail();
  });

  afterEach(async () => {
    cleanup();
  });

  test('상세페이지 컴포넌트 렌더링 테스트', async () => {
    const clubTitle = await screen.findByText(/독서모임1/i);
    expect(clubTitle).toBeInTheDocument();
    const clubFeedList = await screen.findAllByLabelText('피드 카드');
    expect(clubFeedList).not.toHaveLength(0);
  });

  test('참여 신청 기능, 모달 기능', async () => {
    const user = userEvent.setup();

    const joinButton = await screen.findByRole('button', { name: '참여신청' });
    await user.click(joinButton);

    const joinConfirmModal = await screen.findByRole('dialog');
    expect(joinConfirmModal).toBeInTheDocument();
    expect(joinConfirmModal).toHaveTextContent(/참여 신청이 완료되었습니다./);

    const confirmButton1 = screen.getByRole('button', { name: '확인' });
    await user.click(confirmButton1);
    expect(joinConfirmModal).not.toBeInTheDocument();

    await waitFor(() => {
      expect(joinButton).toHaveTextContent(/신청완료/);
    });

    await user.click(joinButton);
    const cancleJoinModal = await screen.findByRole('dialog');
    expect(cancleJoinModal).toBeInTheDocument();
    expect(cancleJoinModal).toHaveTextContent(/참여 신청을 취소 하시겠어요?/);

    const confirmButton2 = screen.getByRole('button', { name: '확인' });
    await user.click(confirmButton2);

    await waitFor(() => {
      expect(joinButton).toHaveTextContent(/참여신청/);
    });
  });

  test('좋아요 기능', async () => {
    const user = userEvent.setup();

    const likeButton = await screen.findByLabelText('좋아요 버튼');
    expect(likeButton).toBeInTheDocument();

    await user.click(likeButton);
    const cancleLikeButton = await screen.findByLabelText('좋아요 취소 버튼');
    await waitFor(() => {
      expect(cancleLikeButton).toBeInTheDocument();
    });
    await user.click(cancleLikeButton);

    const afterCancleLikeButton = await screen.findByLabelText('좋아요 버튼');
    expect(afterCancleLikeButton).toBeInTheDocument();
  });
});

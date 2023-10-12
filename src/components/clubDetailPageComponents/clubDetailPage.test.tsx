import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClubDetailPage from './../../pages/clubDetailPage/ClubDetailPage';
import Modals from '../modals/Modals';
import { UserContextProvider } from '../contexts/userContext';
import { ModalContextProvider } from './../contexts/modalContext';

test('독서모임 상세정보 렌더링 테스트', async () => {
  render(
    <MemoryRouter initialEntries={['/club/1']}>
      <Routes>
        <Route path="/club/:clubId" element={<ClubDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
  const clubTitle = await screen.findByText(/독서모임1/i);
  expect(clubTitle).toBeInTheDocument();
});

test('참여 신청 버튼 상태, 모달 테스트', async () => {
  const user = userEvent.setup();

  render(
    <UserContextProvider>
      <ModalContextProvider>
        <MemoryRouter initialEntries={['/club/1']}>
          <Routes>
            <Route path="/club/:clubId" element={<ClubDetailPage />} />
          </Routes>
          <Modals />
        </MemoryRouter>
      </ModalContextProvider>
    </UserContextProvider>,
  );

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

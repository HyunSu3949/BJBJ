import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ClubList from '../clubList/ClubList';
import FeedList from '../feedList/FeedList';
import ClubDetailPage from '../../../pages/clubDetailPage/ClubDetailPage';

test('독서모임 리스트가 렌더링되었는지 테스트', async () => {
  render(<ClubList sortBy="likes" />, { wrapper: BrowserRouter });
  const items = await waitFor(() => screen.findAllByRole('listitem'));
  expect(items).not.toHaveLength(0);
});

test('독서모임 리스트 렌더링 테스트(날짜순)', async () => {
  render(<ClubList sortBy="createdAt" />, { wrapper: BrowserRouter });
  const items = await waitFor(() => screen.findAllByRole('listitem'));
  expect(items).not.toHaveLength(0);
});

test('피드 렌더링 테스트(좋아요순)', async () => {
  render(<FeedList sortBy="likes" />);
  const items = await screen.findAllByRole('listitem');
  expect(items).not.toHaveLength(0);
});

test('더 알아보기 링크 클릭 시 페이지 이동', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<ClubList sortBy="likes" />} />
        <Route path="/club/:clubId" element={<ClubDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );

  const linkElements = await screen.findAllByText('더 알아보기');
  await user.click(linkElements[0]);

  const detailHeader = screen.getByText('모임 상세페이지');
  expect(detailHeader).toBeInTheDocument();
});

// test('클럽 좋아요 누르기', async () => {
//   const user = userEvent.setup();

//   render(<ClubList sortBy="likes" />, { wrapper: BrowserRouter });
//   const likeBtns = await screen.findAllByRole('button');
//   const likeBtn = likeBtns[0];
//   const likeCnts = await screen.findAllByTestId('likes-count');
//   const likeCnt = likeCnts[0];

//   const initialLikes = Number(likeCnt.textContent);
//   await user.click(likeBtn);
//   expect(Number(likeCnt.textContent)).toBe(initialLikes + 1);

//   await user.click(likeBtn);
//   expect(Number(likeCnt.textContent)).toBe(initialLikes);
// });

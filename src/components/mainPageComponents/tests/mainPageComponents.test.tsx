import { render, screen, waitFor } from '@testing-library/react';
import ClubList from '../clubList/ClubList';
import FeedList from '../feedList/FeedList';

test('독서모임 리스트가 렌더링되었는지 테스트', async () => {
  render(<ClubList sortBy="likes" />);
  const items = await screen.findAllByRole('listitem');
  expect(items).not.toHaveLength(0);
});

test('독서모임 리스트 렌더링 테스트(날짜순)', async () => {
  render(<ClubList sortBy="createdAt" />);
  const items = await screen.findAllByRole('listitem');
  expect(items).not.toHaveLength(0);
});

test('피드 렌더링 테스트(좋아요순)', async () => {
  render(<FeedList sortBy="likes" />);
  const items = await screen.findAllByRole('listitem');
  expect(items).not.toHaveLength(0);
});

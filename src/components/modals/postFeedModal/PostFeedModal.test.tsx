import { render, screen } from '@testing-library/react';
import PostFeedModal from './../postFeedModal/PostFeedModal';

const setup = async () => {
  const props = {
    onClose: () => {},
    message: '글 쓰기',
    btnText: '확인',
  };
  render(<PostFeedModal {...props} />);
};

describe('피드 모달 테스트', () => {
  beforeEach(async () => {
    await setup();
  });

  test('피드 모달 렌더링 테스트', async () => {
    expect(
      await screen.findByRole('heading', { name: '글 쓰기' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText('제목을 입력해주세요'),
    ).toBeInTheDocument();
  });
});

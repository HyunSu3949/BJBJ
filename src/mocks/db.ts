import { DB } from './types';
export const db: DB = {
  users: [
    {
      id: '0',
      name: '현수',
      email: 'ahs@gmail.com',
      imgUrl: 'hs.png',
    },
    {
      id: '1',
      name: '주홍',
      email: 'mjh@gmail.com',
      imgUrl: 'jh.png',
    },
    {
      id: '2',
      name: '준용',
      email: 'bjy@gmail.com',
      imgUrl: 'jy.png',
    },
  ],
  clubs: [
    {
      id: '0',
      userId: '0', // 현수
      title: '오만과편견 독서모임0',
      contents: '한줄소개0',
      imgUrl: '0.png',
      maxPersonnel: 5,
      description: '자세한 설명0',
      likes: 30,
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      status: '모집중',
      tags: '소모임,오프라인',
    },
    {
      id: '1',
      userId: '1', //주홍
      title: '오만과편견 독서모임1',
      contents: '한줄소개1',
      imgUrl: '1.png',
      maxPersonnel: 5,
      description: '자세한 설명1',
      likes: 30,
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      status: '모집중',
      tags: '소모임,오프라인',
    },
    {
      id: '2',
      userId: '2', // 준용
      title: '오만과편견 독서모임2',
      contents: '한줄소개2',
      imgUrl: '2.png',
      maxPersonnel: 5,
      description: '자세한 설명2',
      likes: 30,
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      status: '모집중',
      tags: '소모임,오프라인',
    },
  ],
  feeds: [
    {
      id: '0',
      userId: '0',
      clubId: '0',
      title: '오만과 편견0을 읽고',
      likes: 2,
      contents: '오만과 편견을 읽어봤어요',
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      imgUrl: '0.png',
    },
    {
      id: '1',
      userId: '0',
      clubId: '1',
      title: '오만과 편견1을 읽고',
      likes: 2,
      contents: '오만과 편견을 읽어봤어요',
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      imgUrl: '0.png',
    },
    {
      id: '2',
      userId: '0',
      clubId: '2',
      title: '오만과 편견2을 읽고',
      likes: 2,
      contents: '오만과 편견을 읽어봤어요',
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T13:34:56.789',
      imgUrl: '0.png',
    },
  ],
  members: [
    {
      // 현수(0)가 만든 0번 모임
      id: '0',
      userId: '0',
      clubId: '0',
      status: '승인됨',
    },
    {
      id: '1', // 주홍(1)이 만든 1번 모임
      userId: '1',
      clubId: '1',
      status: '승인됨',
    },
    {
      id: '2', // 준용(2)가 만든 2번 모임
      userId: '2',
      clubId: '2',
      status: '승인됨',
    },
    {
      id: '3',
      userId: '0',
      clubId: '3',
      status: '승인됨',
    },
    {
      id: '4',
      userId: '0',
      clubId: '2',
      status: '승인됨',
    },
    {
      id: '5',
      userId: '1',
      clubId: '0',
      status: '승인됨',
    },
    {
      id: '6',
      userId: '2',
      clubId: '1',
      status: '대기중',
    },
  ],
  likedClubs: [
    {
      id: '0',
      userId: '0',
      clubId: '0',
    },
    {
      id: '1',
      userId: '0',
      clubId: '1',
    },
    {
      id: '2',
      userId: '0',
      clubId: '2',
    },
    {
      id: '3',
      userId: '1',
      clubId: '1',
    },
    {
      id: '4',
      userId: '1',
      clubId: '2',
    },
    {
      id: '5',
      userId: '2',
      clubId: '0',
    },
  ],
  likedFeeds: [
    {
      id: '0',
      userId: '1',
      feedId: '0',
    },
    {
      id: '1',
      userId: '2',
      feedId: '0',
    },
    {
      id: '2',
      userId: '1',
      feedId: '1',
    },
    {
      id: '3',
      userId: '2',
      feedId: '1',
    },
    {
      id: '4',
      userId: '1',
      feedId: '2',
    },
    {
      id: '5',
      userId: '2',
      feedId: '2',
    },
  ],
  feedComment: [
    {
      id: '0',
      userId: '1',
      feedId: '0',
      contents: '잘 읽었습니다',
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T12:34:56.789',
    },
    {
      id: '1',
      userId: '2',
      feedId: '2',
      contents: '잘 읽었습니다',
      createdAt: '2023-10-05T12:34:56.789',
      updatedAt: '2023-10-05T12:34:56.789',
    },
  ],
};

export const usersDB = {};

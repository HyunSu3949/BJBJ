import { DB } from './types';

export const ids = {
  users: 1,
  clubs: 0,
  feeds: 0,
  members: 0,
  likedClubs: 0,
  likedFeeds: 0,
  feedComment: 0,
};

export const db: DB = {
  users: [
    {
      userId: '0',
      userName: '현수',
      userEmail: 'ahs@gmail.com',
      imgUrl: 'hs.png',
    },
  ],
  clubs: [],
  feeds: [],
  members: [],
  likedClubs: [],
  likedFeeds: [],
  feedComment: [],
};

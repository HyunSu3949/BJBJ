export type DB = {
  clubs: Club[];
  users: User[];
  members: Member[];
  likedClubs: LikeClub[];
  likedFeeds: LikeFeed[];
  feeds: Feed[];
  feedComment: FeedComment[];
};

export type Club = {
  clubId: string;
  userId: string;
  title: string;
  imgUrl: string;
  contents: string;
  maxPersonnel: number;
  description: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  status: ClubStatus;
  tags: Tags;
  bookTitle: string;
  author: string;
  publisher: string;
};

export type User = {
  userId: string;
  userName: string;
  userEmail: string;
  imgUrl: string;
};

export type Member = {
  memberId: string;
  userId: string;
  clubId: string;
  status: string;
};

export type LikeFeed = {
  likeId: string;
  userId: string;
  feedId: string;
};

export type LikeClub = {
  likeId: string;
  userId: string;
  clubId: string;
};

export type Feed = {
  feedId: string;
  userId: string;
  clubId: string;
  title: string;
  likes: number;
  contents: string;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
};
export type FeedComment = {
  commentId: string;
  userId: string;
  feedId: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
};

export type PostClub = {
  userId: string;
  title: string;
  imgUrl: string;
  contents: string;
  maxPersonnel: number;
  description: string;
  tags: Tags;
  bookTitle: string;
  author: string;
  publisher: string;
};

export type PostFeed = {
  userId: string;
  clubId: string;
  title: string;
  contents: string;
  imgUrl: string;
};

export type PutFeed = {
  feedId: string;
  userId: string;
  clubId: string;
  title: string;
  contents: string;
  imgUrl: string;
};

export type MainFeed = {
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  feedId: string;
  likes: number;
  contents: string;
  commentCount: string;
};
export type GetClub = {
  clubId: string;
  title: string;
  contents: string;
  imgUrl: string;
  tags: Tags;
  likes: number;
};

export type Tag = '소모임' | '오프라인' | '온라인' | '수도권' | '지방';

export type Tags =
  | `${Tag}`
  | `${Tag},${Tag}`
  | `${Tag},${Tag},${Tag}`
  | `${Tag},${Tag},${Tag},${Tag}`;
export type ClubStatus = '모집중' | '마감됨';

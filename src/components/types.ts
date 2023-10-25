export type SortBy = 'likes' | 'createdAt';

export type Club = {
  clubId: string;
  title: string;
  contents: string;
  imgUrl: string;
  endDate?: string;
  tags: string;
  likes: string;
};

export type ClubsResponse = {
  totalCount: string;
  clubList: Club[];
};

export type ClubDetailsStatus = '모집중' | '마감됨';
export type ClubDetailsType = {
  userId: string;
  title: string;
  imgUrl: string;
  contents: string;
  maxPersonnel: number;
  description: string;
  tags: string;
  likes: string;
  status: ClubDetailsStatus;
  bookTitle: string;
  author: string;
  publisher: string;
};

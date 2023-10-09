export type ClubSort = {
  sortBy: 'likes' | 'createdAt';
};

export type Club = {
  id: string;
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

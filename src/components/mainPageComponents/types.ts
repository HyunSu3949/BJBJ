type ClubSort = {
  sortBy: 'likes' | 'createdAt';
};

type Club = {
  id: string;
  title: string;
  contents: string;
  imgUrl: string;
  endDate?: string;
  tags: string;
  likes: string;
};

type ClubsResponse = {
  totalCount: string;
  clubList: Club[];
};

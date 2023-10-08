import axiosInstance from './instance';

type ClubSort = 'likes' | 'createdAt';

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
export async function getClubsSortedByLikes(sortBy: ClubSort) {
  const res = await axiosInstance.get(`/clubs?sortby=${sortBy}`);
  const response: ClubsResponse = res.data.data;
  return response;
}

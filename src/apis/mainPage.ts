import axiosInstance from './instance';

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
export async function getClubsSortedByLikes(sortBy: 'likes' | 'createdAt') {
  const res = await axiosInstance.get(`/clubs?sortby=${sortBy}`);
  const response: ClubsResponse = res.data.data;
  return response;
}

export async function likesClub({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  await axiosInstance.post('/likeclubs', { clubId, userId });
}

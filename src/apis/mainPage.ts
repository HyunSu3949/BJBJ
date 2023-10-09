import axiosInstance from './instance';

export async function getClubsSortedByLikes(sortBy: 'likes' | 'createdAt') {
  const res = await axiosInstance.get(`/clubs?sortby=${sortBy}`);
  const response = res.data.data;
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

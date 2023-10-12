import axiosInstance from './instance';

export async function getClubDetails(id: string) {
  const res = await axiosInstance.get(`/clubs/${id}`);
  return res.data.data;
}

export async function requestParticipation({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  await axiosInstance.post('/members', { clubId, userId });
}

export async function cancleRequestParticipation({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  return await axiosInstance.delete(
    `/members?userId=${userId}&clubId=${clubId}`,
  );
}

export async function likesClub({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  return await axiosInstance.post('/likeclubs', { clubId, userId });
}

export async function getJoinedClubs(userId: string) {
  const res = await axiosInstance.get(`/members/ids?userId=${userId}`);
  return res.data.data;
}

export async function getClubsSortedBy(sortBy: 'likes' | 'createdAt') {
  const res = await axiosInstance.get(`main/clubs?sortby=${sortBy}`);
  const response = res.data.data;
  return response;
}

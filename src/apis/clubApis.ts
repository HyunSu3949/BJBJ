import { axiosInstance, axsiosPuplic } from './instance';

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
  return await axiosInstance.post('/likedclubs', { clubId, userId });
}
export async function cancleLikesClub({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  return await axiosInstance.delete(
    `/likedclubs?clubId=${clubId}&userId=${userId}`,
  );
}

export async function getJoinedClubs(userId: string, page: string) {
  const res = await axiosInstance.get(
    `/members/users/${userId}?page = ${page}`,
  );
  return res.data.data;
}
export async function getAppliedClubs(userId: string) {
  const res = await axiosInstance.get(`/members/ids?userId=${userId}`);
  return res.data.data;
}
export async function getlikedClubs(userId: string) {
  const res = await axiosInstance.get(`/likedclubs/ids?userId=${userId}`);
  return res.data.data;
}

export async function getClubsSortedBy(
  sortBy: 'likes' | 'createdAt',
  page = 1,
) {
  const res = await axsiosPuplic.get(
    `main/clubs?sortBy=${sortBy}&page=${page}`,
  );
  const response = res.data.data;
  return response;
}

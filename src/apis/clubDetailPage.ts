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
  return await axiosInstance.post('/members', { clubId, userId });
}

export async function cancleRequestParticipation({
  clubId,
  userId,
  myId,
}: {
  clubId: string;
  userId: string;
  myId: string;
}) {
  return await axiosInstance.delete(
    `/members?userId=${userId}&clubId=${clubId}&myId=${myId}`,
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

export async function clubFeedList(id: string) {
  const res = await axiosInstance.get(`feeds/clubs/${id}`);
  return res.data.data;
}

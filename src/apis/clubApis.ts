import { PostClub, Tags } from '../mocks/types';
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
  const res = await axiosInstance.delete(
    `/likedclubs?clubId=${clubId}&userId=${userId}`,
  );

  return res.data;
}

export async function getJoinedClubs({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const res = await axiosInstance.get(`/members/users/${userId}?page=${page}`);
  return res.data.data;
}
export async function getJoinedClubIds(userId: string) {
  const res = await axiosInstance.get(`/members/ids?userId=${userId}`);
  return res.data.data;
}
export async function getAppliedClubs(userId: string) {
  const res = await axiosInstance.get(`/members/ids?userId=${userId}`);
  return res.data.data;
}
export async function getLikedClubIdList(userId: string) {
  const res = await axiosInstance.get(`/likedclubs/ids?userId=${userId}`);
  return res.data.data;
}

export async function getClubsSortedBy({
  sortBy,
}: {
  sortBy: 'likes' | 'createdAt';
}) {
  const res = await axsiosPuplic.get(`/main/clubs?sortBy=${sortBy}`);
  const response = res.data.data;
  return response;
}

export async function postClub(data: PostClub) {
  const res = await axiosInstance.post('clubs', data);

  // return res.data;
}
export async function getUsersClubInfo(userId: string) {
  const res = await axiosInstance.get(`/clubs/users/${userId}`);

  return res.data.data;
}

export async function putUsersClubInfo(userId: string, data: PostClub) {
  const res = await axiosInstance.put(`/clubs/users/${userId}`, data);

  return res.data;
}

type SearchFormValues = {
  keyword: string;
  tags: Tags;
  sortBy: 'createdAt' | 'likes';
  page: number;
};
export async function getClubList({
  sortBy,
  page,
  keyword,
  tags,
}: SearchFormValues) {
  const res = await axiosInstance.get(
    `/clubs?sortBy=${sortBy}&tags=${tags}&keyword=${keyword}&page=${page}`,
  );

  return res.data.data;
}

export async function getMyLikedClubList({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const res = await axsiosPuplic.get(
    `/likedclubs/users/${userId}?page=${page}`,
  );

  return res.data.data;
}

export async function getAwaitingApprovalList(userId: string, page: number) {
  const res = await axsiosPuplic.get(
    `/members?userId=${userId}&approvalStatus=대기중&page=${page}`,
  );

  return res.data.data;
}

export async function approveMember(memberId: string) {
  const res = await axiosInstance.put(`/members`, { memberId });

  return res.data;
}

export async function rejectMember({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const res = await axiosInstance.delete(
    `/members?userId=${userId}&clubId=${clubId}`,
  );

  return res.data;
}

export async function getParticipantsList(userId: string, page: number) {
  const res = await axsiosPuplic.get(
    `/members?userId=${userId}&approvalStatus=승인됨&page=${page}`,
  );

  return res.data.data;
}

export async function removeParticipant({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const res = await axiosInstance.delete(
    `/members?userId=${userId}&clubId=${clubId}`,
  );

  return res.data;
}

export async function deleteClub({ userId }: { userId: string }) {
  const res = await axiosInstance.delete(`/clubs/users?userId=${userId}`);

  return res.data;
}

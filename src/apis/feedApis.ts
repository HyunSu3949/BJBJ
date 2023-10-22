import { PostFeed, PutFeed } from '../mocks/types';
import { axiosInstance, axsiosPuplic } from './instance';

export async function mainFeedListSortBy(sortBy = 'likes', page = 1) {
  const res = await axsiosPuplic.get(
    `/main/feeds?sortBy=${sortBy}&page=${page}`,
  );

  return res.data.data;
}

export async function getClubFeedList(
  clubId: string,
  sortBy = 'likes',
  page = 1,
) {
  const res = await axiosInstance.get(
    `/feeds/clubs/${clubId}?sortBy=${sortBy}&page=${page}`,
  );
  return res.data.data;
}

export async function getFeedDetail(feedId: string) {
  const res = await axsiosPuplic.get(`/feeds/${feedId}`);

  return res.data.data;
}

export async function getMyFeedList(userId: string, page = 1) {
  const res = await axsiosPuplic.get(`/feeds/users/${userId}?page=${page}`);

  return res.data.data;
}
export async function postFeed(postFeed: PostFeed) {
  const res = await axsiosPuplic.post(`/feeds`, postFeed);

  return res.data;
}

export async function putFeed(putFeed: PutFeed) {
  const res = await axsiosPuplic.put(`/feeds`, putFeed);

  return res.data;
}

export async function deleteFeed(feedId: string) {
  const res = await axsiosPuplic.delete(`/feeds?feedId=${feedId}`);

  return res.data;
}

export async function getFeedCommentList(feedId: string, page = 1) {
  const res = await axsiosPuplic.get(
    `/comments/feeds?feedId=${feedId}&page=${page}`,
  );

  return res.data.data;
}

export async function putFeedComment(putComment: {
  commentId: string;
  feedId: string;
  userId: string;
  contents: string;
}) {
  const res = await axsiosPuplic.put(`/comments`, putComment);

  return res.data;
}

export async function deleteComment(commentId: string) {
  const res = await axsiosPuplic.delete(`/comments?commentId=${commentId}`);

  return res.data;
}

export async function likeFeed(feedId: string, userId: string) {
  const res = await axsiosPuplic.post(`/likedfeeds`, { feedId, userId });

  return res.data;
}

export async function deleteLikeFeed(feedId: string, userId: string) {
  const res = await axsiosPuplic.delete(
    `/likedfeeds?feedId=${feedId}&userId=${userId}`,
  );

  return res.data;
}

export async function postComment({
  feedId,
  userId,
  contents,
}: {
  feedId: string;
  userId: string;
  contents: string;
}) {
  const res = await axsiosPuplic.post(`/comments`, {
    feedId,
    userId,
    contents,
  });

  return res.data;
}

export async function getlikedFeedList(userId: string, page: number) {
  const res = await axsiosPuplic.get(
    `/likedfeeds/users/${userId}?page=${page}`,
  );

  return res.data.data;
}

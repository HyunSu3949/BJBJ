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

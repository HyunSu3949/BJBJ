import axiosInstance from './instance';

export async function mainFeedListSortBy(sortBy: string) {
  const res = await axiosInstance.get(`main/feeds?sortby=${sortBy}`);

  return res.data.data;
}

export async function getClubFeedList(clubId: string) {
  const res = await axiosInstance.get(`feeds/clubs/${clubId}`);
  return res.data.data;
}

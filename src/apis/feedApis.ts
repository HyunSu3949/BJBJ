import axiosInstance from './instance';

export async function mainFeedListSortBy(sortBy: string, page = 1) {
  const res = await axiosInstance.get(
    `main/feeds?sortby=${sortBy}&page=${page}`,
  );

  return res.data.data;
}

export async function getClubFeedList(clubId: string, page = 1) {
  const res = await axiosInstance.get(`feeds/clubs/${clubId}&page=${page}`);
  return res.data.data;
}

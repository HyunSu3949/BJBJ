import axiosInstance from './instance';

export async function clubFeedList(id: string) {
  const res = await axiosInstance.get(`feeds/clubs/${id}`);
  return res.data.data;
}

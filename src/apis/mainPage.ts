import axiosInstance from './instance';

export async function getClubsSortedBy(sortBy: 'likes' | 'createdAt') {
  const res = await axiosInstance.get(`/clubs?sortby=${sortBy}`);
  const response = res.data.data;
  return response;
}

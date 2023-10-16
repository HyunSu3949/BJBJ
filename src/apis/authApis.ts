import { axiosInstance } from './instance';

export async function getUserProfile() {
  const res = await axiosInstance.get('/users');

  return res.data.data;
}

export async function getPreSingedUrl(imageName: string) {
  const res = await axiosInstance.post('/users', { imageName });

  return res.data.data;
}

import { domains } from '../constants/constants';
import { axiosInstance } from './instance';
export async function getUserProfile() {
  const res = await axiosInstance.get('/users');

  return res.data.data;
}

export async function uploadImgToS3(imageName: string, file: File) {
  const { url } = await getPreSingedUrl(imageName);
  await axiosInstance.put(url, file);

  return domains.imgUrl + imageName;
}
export async function getPreSingedUrl(imageName: string) {
  const res = await axiosInstance.post('/s3', { imageName });

  return res.data.data;
}

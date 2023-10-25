import { domains } from '../constants/constants';
import { axiosInstance, axsiosPuplic } from './instance';
export async function getUserProfile() {
  const res = await axiosInstance.get('/users');

  return res.data.data;
}

export async function uploadImgToS3(
  imageName: string,
  file: File,
  fileType: string,
): Promise<string> {
  console.log('fileType: ', fileType);
  console.log('imageName: ', imageName);
  const { url } = await getPreSingedUrl(imageName);
  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': fileType,
    },
  }).catch(err => {
    console.log(err);
  });

  console.log('presignedUrl: ', url);

  return domains.imgUrl + imageName;
}
export async function getPreSingedUrl(imageName: string) {
  const res = await axiosInstance.post('/s3', { imageName });

  return res.data.data;
}

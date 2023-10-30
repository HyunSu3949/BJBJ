import { domains } from '../constants/constants';
import { axiosInstance } from './instance';
import AWS from 'aws-sdk';

export async function getUserProfile() {
  const res = await axiosInstance.get('/users');

  return res.data.data;
}

export async function uploadImgToS3(
  imageName: string,
  file: File,
  fileType: string,
) {
  const BUCKET = 'bjbj-media-storage';
  const REGION = process.env.REACT_APP_S3_REGION;
  const ACESS_KEY_ID = process.env.REACT_APP_S3_ACCESS_KEY_ID;
  const SECRET_ACESS_KEY_ID = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

  AWS.config.update({
    region: REGION,
    accessKeyId: ACESS_KEY_ID,
    secretAccessKey: SECRET_ACESS_KEY_ID,
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      ContentType: fileType,
      Bucket: BUCKET,
      Key: `${imageName}`,
      Body: file,
    },
  });

  upload.promise().then(() => console.log('업로드'));
  return imageName;
}

export async function uploadImgToS31(
  imageName: string,
  file: File,
  fileType: string,
): Promise<string> {
  console.log('fileType: ', fileType);
  console.log('imageName: ', imageName);
  const bucketName = 'bjbj-media-storage';
  const { url } = await getPreSingedUrl(imageName);
  await fetch(`https://${bucketName}.s3.amazonaws.com/${imageName}`, {
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

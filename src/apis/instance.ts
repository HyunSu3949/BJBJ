import axios, { AxiosError, AxiosResponse } from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.BACK_URL;
} else {
  baseURL = process.env.BACK_URL;
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<unknown>) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

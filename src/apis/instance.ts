import axios, { AxiosError, AxiosResponse } from 'axios';
import { domains } from '../constants/constants';

const baseURL = domains.backEnd;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<unknown>) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

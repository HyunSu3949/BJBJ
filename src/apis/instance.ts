import axios, { AxiosError, AxiosResponse } from 'axios';
import { domains } from '../constants/constants';

let baseURL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  baseURL = domains.backEnd;
} else {
  baseURL = domains.backEnd;
}
console.log(baseURL);
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

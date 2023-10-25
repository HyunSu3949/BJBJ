import axios, { AxiosError, AxiosResponse } from 'axios';
import { domains } from '../constants/constants';

const baseURL = domains.backEnd;

export const axsiosPuplic = axios.create({
  baseURL,
});

axsiosPuplic.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<unknown>) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export const axiosInstance = axios.create({
  baseURL,
});

const isTokenExpiredError = (error: AxiosError) => {
  return error.response && error.response.status === 401;
};
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('Access_Token');
    const refreshToken = localStorage.getItem('Refresh_Token');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Access_Token'] = accessToken;
    config.headers['Refresh_Token'] = refreshToken;

    console.log(config.headers['Access_Token']);

    return config;
  },
  error => {
    if (isTokenExpiredError(error)) {
      localStorage.removeItem('Access_Token');
      localStorage.removeItem('Refresh_Token');
      alert('다시 로그인 해주세요');
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const accessToken = res.headers['Access_Token'];
    const refreshToken = res.headers['Refresh_Token'];

    if (accessToken) {
      localStorage.setItem('Access_Token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('Refresh_Token', accessToken);
    }
    return res;
  },
  (error: AxiosError<unknown>) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

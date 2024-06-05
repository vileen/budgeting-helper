import axios, { AxiosResponse } from 'axios';

interface ICreateHttpClient {
  baseURL: string;
  timeout?: number;
}

export function createHttpClient({ baseURL, timeout }: ICreateHttpClient) {
  const axiosInstance = axios.create({
    baseURL,
    timeout: timeout,
  });

  // request interceptor to add authorisation token
  axiosInstance.interceptors.request.use(
    async config => {
      return config;
    },
    (err: Error) => Promise.reject(err),
  );

  // response interceptor to track API failures
  axiosInstance.interceptors.response.use(
    response => response,
    (err: Error & { response: AxiosResponse }) => {
      return Promise.reject(err);
    },
  );

  return axiosInstance;
}

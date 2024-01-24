import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

import DefaultAddOptions from 'p-queue';
import type { Options } from 'p-queue';
import PQueue from 'p-queue';
import type { RequestInterceptors } from './types';
import { useRequestStore } from '@/stores/modules/request';

const basePath = import.meta.env.VITE_APP_BASE_PATH;

const axiosInstance = axios.create({
  baseURL: basePath ? basePath + '/' : '/',
  timeout: 10 * 60 * 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

let queue = new PQueue({
  concurrency: 5,
  intervalCap: 5,
  interval: 500,
  carryoverConcurrencyCount: true,
});

type RequestConfig = InternalAxiosRequestConfig & { id: string; interceptors?: RequestInterceptors }
type Response = AxiosResponse & { config: RequestConfig };
export type RequestError = AxiosError & { response: Response };

export const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const requestStore = useRequestStore();
  const id = requestStore.startRequest();

  const requestConfig: RequestConfig = {
    id: id,
    ...config,
  };

  return new Promise((resolve) => {
    if (config.url && config.url === '/auth/refresh/token') {
      queue.pause();
      resolve(requestConfig);
      queue.start();
    } else {
      queue.add(() => resolve(requestConfig));
    }
  });
};

const onResponse = (response: AxiosResponse | Response): AxiosResponse | Response => {
  const requestStore = useRequestStore();
  const id = (response.config as RequestConfig)?.id;
  if (id) requestStore.endRequest(id);
  return response;
};

const onError = async (error: RequestError): Promise<RequestError> => {
  const requestStore = useRequestStore();

  const id = (error.response?.config as RequestConfig)?.id;

  if (id) requestStore.endRequest(id);

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {

      }
    })
  }
}

export default service;

export async function replaceQueue(options: Options<any, DefaultAddOptions>) {
  await queue.onIdle();
  queue = new PQueue(options);
}

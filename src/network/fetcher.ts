import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type ResModel<T> = {
  status: number;
  data: T | null;
  isSuccess: boolean;
  message: string;
};

const instance = axios.create({
  timeout: 15000,
});

const fetcher = async <T>(params: AxiosRequestConfig): Promise<ResModel<T>> => {
  const response: ResModel<T> = await instance({
    ...params,
  })
    .then((res: AxiosResponse) => ({
      status: res.status,
      data: res.data,
      isSuccess: true,
      message: '',
    }))
    .catch((e) => {
      const tmp = e.response?.data?.message ?? '';
      let message = '';
      if (typeof tmp === 'string') {
        message = tmp;
      } else if (Array.isArray(tmp)) {
        message = tmp.join(', ');
      }

      return {
        status: e.response?.data?.statusCode ?? 500,
        message,
        data: null,
        isSuccess: false,
      };
    });

  return response;
};

export { fetcher };

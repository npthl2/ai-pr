import { AxiosResponse } from 'axios';
import axiosInstance from '../api/axios';
import { CommonResponse } from '@model/common/CommonResponse';

// delete 등 필요한 것은 추가
export const baseService = {
  async get<T>(endpoint: string): Promise<CommonResponse<T>> {
    const response: AxiosResponse<CommonResponse<T>> = await axiosInstance.get(endpoint);
    return response.data;
  },

  async post<T, D>(endpoint: string, data: D): Promise<CommonResponse<T>> {
    const response: AxiosResponse<CommonResponse<T>> = await axiosInstance.post(endpoint, data);
    return response.data;
  },
};

//dummyjson 사용 시 사용(예제용, 추후삭제 필요)
export const baseDummyService = {
  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint);
    return response.data;
  },

  async post<T, D>(endpoint: string, data: D): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
    return response.data;
  },
};

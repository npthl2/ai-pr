import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { CommonResponse } from '@model/common/CommonResponse';

const baseService = {
  async get<T>(endpoint: string, params?: URLSearchParams): Promise<CommonResponse<T>> {
    const response: AxiosResponse<CommonResponse<T>> = await axiosInstance.get(endpoint, {
      params: params,
    });
    return response.data;
  },

  async post<T, D>(endpoint: string, data: D): Promise<CommonResponse<T>> {
    const response: AxiosResponse<CommonResponse<T>> = await axiosInstance.post(endpoint, data);
    return response.data;
  },

  async put<T, D>(endpoint: string, data: D): Promise<CommonResponse<T>> {
    const response: AxiosResponse<CommonResponse<T>> = await axiosInstance.put(endpoint, data);
    return response.data;
  },
};

export default baseService;

import axiosInstance from '../axios';
import { CommonResponse } from '@model/common/CommonResponse';

const apiTestService = {
  async getCcaTest(): Promise<CommonResponse<string>> {
    const response = await axiosInstance.get<CommonResponse<string>>('/cca-be/v1/test');
    return response.data;
  },

  async getStgTest(): Promise<CommonResponse<string>> {
    const response = await axiosInstance.get<CommonResponse<string>>('/stg-be/v1/test');
    return response.data;
  },
};

export default apiTestService;

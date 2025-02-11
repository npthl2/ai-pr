import axiosInstance from '../axios';

const apiTestService = {
  async getCcaTest(): Promise<string> {
    const response = await axiosInstance.get<string>('/cca-be/test');
    return response.data;
  },

  async getStgTest(): Promise<string> {
    const response = await axiosInstance.get<string>('/stg-be/test');
    return response.data;
  },
};

export default apiTestService;

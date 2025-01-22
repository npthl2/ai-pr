export interface CommonResponse<T> {
  isSuccess: boolean;
  status: number;
  data: T;
  message: string;
}

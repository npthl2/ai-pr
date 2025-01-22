export default interface CommonResponse<T> {
  isSuccess: boolean;
  status: number;
  data: T;
}

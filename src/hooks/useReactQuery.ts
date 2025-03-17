import {
  DefaultError,
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import useToastStore from '@stores/ToastStore';
import { CommonResponse } from '@model/common/CommonResponse';

const handleErrorMessage = (
  error: unknown,
  openToast: (message: string, type: 'error') => void,
) => {
  const displayMessage: string =
    (error as { response: { data: { data: string } } }).response?.data?.data ||
    '서버에 연결할 수 없습니다.';
  openToast(displayMessage, 'error');
};

const handleBusinessError = (
  data: unknown,
  openToast: (message: string, type: 'error') => void,
) => {
  if ((data as CommonResponse<unknown>)?.successOrNot === 'N') {
    const displayMessage: string =
      (data as CommonResponse<string>).data || '서버에 연결할 수 없습니다.';
    openToast(displayMessage, 'error');
    return true;
  }
  return false;
};

// React Query Custom Hook으로 전역으로 설정할 옵션을 정의 한다.
export const useReactQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
  isErrorToast = true,
): UseQueryResult<TData, TError> => {
  const openToast = useToastStore((state) => state.openToast);
  const result = useQuery({ ...options }, queryClient);

  const { error, isError, isSuccess, data } = result;

  if (isError && isErrorToast) {
    const errorStatus = (error as { response: { status: number } }).response?.status;
    if (errorStatus !== 401) {
      handleErrorMessage(error, openToast);
    }
  } else if (isSuccess && isErrorToast) {
    handleBusinessError(data, openToast);
  }

  return result;
};

export const useReactMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient,
  isErrorToast = true,
) => {
  const openToast = useToastStore((state) => state.openToast);

  return useMutation(
    {
      ...options,
      onSuccess: (data, variables, context) => {
        if (isErrorToast) {
          handleBusinessError(data, openToast);
        }
        options.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        if (isErrorToast) {
          handleErrorMessage(error, openToast);
        }
        options.onError?.(error, variables, context);
      },
    },
    queryClient,
  );
};

import { useMutation } from '@tanstack/react-query';
import memoService from '@api/services/memoService';
import { MemoRequestParams } from '@model/Memo';

export const useMemosMutation = () => {
  return useMutation({
    mutationFn: (data: MemoRequestParams) => memoService.createMemo(data),
  });
};

import { CommonResponse } from './common/CommonResponse';

export enum MemoType {
  SYSTEM = 'SYSTEM',
  MEMBER = 'MEMBER',
}

export interface MemoRequestParams {
  customerId: string;
  memoType: MemoType;
  contents: string;
  authorName: string;
  loginMemberId: string;
}

export interface Memo {
  memoId: string;
  memoType: MemoType;
  contents: string;
  authorName: string;
  firstCreateDatetime: string;
}

export interface GetMemosResponse extends CommonResponse<Memo[]> {}

export function isMemo(value: unknown): value is Memo {
  return (
    typeof value === 'object' &&
    value !== null &&
    ['memoId', 'memoType', 'contents', 'authorName', 'firstCreateDatetime'].every(
      (key) => key in value,
    )
  );
}

export function isMemosResponse(value: unknown): value is Memo[] {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray(value as Memo[]) &&
    (value as Memo[]).every((item) => isMemo(item))
  );
}

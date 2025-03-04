import { CommonResponse } from './common/CommonResponse';

export enum MemoType {
  SYSTEM = 'SYSTEM',
  MEMBER = 'MEMBER',
}

export interface MemoRequestParams {
  customerId: string;
  memoType: MemoType;
  content: string;
  authorName: string;
}

export interface Memo {
  memoId: string;
  memoType: MemoType;
  content: string;
  authorName: string;
  firstCreateDatetime: string;
}

export interface MemoResponse {
  memos: Memo[];
  isLast: boolean;
}

export interface GetMemosResponse extends CommonResponse<MemoResponse> {}

export function isMemo(value: unknown): value is Memo {
  return (
    typeof value === 'object' &&
    value !== null &&
    ['memoId', 'memoType', 'content', 'authorName', 'firstCreateDatetime'].every(
      (key) => key in value,
    )
  );
}

export function isMemosResponse(value: unknown): value is MemoResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    ['memos', 'isLast'].every((key) => key in value) &&
    Array.isArray((value as MemoResponse).memos) &&
    (value as MemoResponse).memos.every((item) => isMemo(item))
  );
}

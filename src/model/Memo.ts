import { CommonResponse } from './common/CommonResponse';

export enum MemoType {
  SYSTEM = 'SYSTEM',
  MEMBER = 'MEMBER',
}

export interface MemoRequestParams {
  customerId: number;
  memoType: MemoType;
  contents: string;
  authorName: string;
  loginMemberId: number;
}

export interface Memo {
  memoId: number;
  memoType: MemoType;
  contents: string;
  authorName: string;
  createdDatetime: string;
  createMemberId: number;
}

export interface GetMemosResponse extends CommonResponse<Memo[]> {}

export function isMemo(value: unknown): value is Memo {
  return (
    typeof value === 'object' &&
    value !== null &&
    'memoId' in value &&
    typeof (value as Memo).memoId === 'number'
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

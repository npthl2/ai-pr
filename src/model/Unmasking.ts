// pages/unmasking/types.ts copy
export interface UnmaskingRequestDto {
  requestUnmaskingDatetime: string;
  requestMemberId: string;
  requestMemberConnectedIp: string;
  customerId: string;
  itemTypeCode: string;
  encryptedItem: string;
  requestUnmaskingReason: string;
}

export interface UnmaskingResponseDto<T> {
  resultMessage: string;
  unmaskedItem: string;
  param?: T;
}

export interface Unmasking<T> {
  param?: T;
  encryptedItem: string;
  itemTypeCode: string;
}

export interface UnmaskingProps<T> {
  onClose: () => void;
  onUnmask: (unmaskedItem: string, param: T) => void;
  requestData: Unmasking<T>;
}
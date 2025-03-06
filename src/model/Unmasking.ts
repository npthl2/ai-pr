// pages/unmasking/types.ts copy
export interface UnmaskingRequestDto {
  requestUnmaskingReason: string;
  requestUnmaskingDatetime: string;
  requestMemberId: string;
  requestMemberConnectedIp: string;
  customerId: string;
  itemTypeCode: string;
  encryptedItem: string;
}

export interface UnmaskingResponseDto {
  resultMessage: string;
  unmaskedItem: string;
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

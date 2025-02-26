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

export interface UnmaskingResponseDto {
  resultMessage: string;
  unmaskedItem: string;
}

export interface Unmasking {
  itemTypeCode: string;
  encryptedItem: string;
}

export interface UnmaskingProps {
  onClose: () => void;
  onUnmask: (unmaskedItem: string) => void;
  requestData: Unmasking;
}

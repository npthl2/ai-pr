import { Gender } from '@model/Customer';

export interface CustomerSearchProps {
  authority: string[] | undefined; // 권한 목록
  open: boolean;
  onCloseModal: () => void;
}

export interface Validation {
  name: FieldValidation;
  birthDate: FieldValidation;
  phoneNumber: FieldValidation;
}

export interface FieldValidation {
  error: boolean;
  state: 'inactive' | 'error';
  helperText: string;
}

export interface CustomerSearchForm {
  name: string;
  birthDate: string;
  gender: Gender;
  phoneNumber: string;
}

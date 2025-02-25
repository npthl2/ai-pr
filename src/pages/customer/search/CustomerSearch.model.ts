import { Gender } from '@model/Customer';

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

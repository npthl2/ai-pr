import { Service, PhoneNumber } from './types';

export interface ValidationField {
  state: 'error' | 'active';
  helperText: string;
}

export interface ValidationState {
  salesType: ValidationField;
  phoneNumber: ValidationField;
  simNumber: ValidationField;
  imeiNumber: ValidationField;
  servicePlan: ValidationField;
}

export const initialValidationState: ValidationState = {
  salesType: { state: 'active', helperText: '' },
  phoneNumber: { state: 'active', helperText: '' },
  simNumber: { state: 'active', helperText: '' },
  imeiNumber: { state: 'active', helperText: '' },
  servicePlan: { state: 'active', helperText: '' },
};

interface ContractFormData {
  salesType: string;
  selectedPhoneNumber: PhoneNumber | null;
  simNumber: string;
  imeiNumber: string;
  deviceModelName: string;
  selectedService: Service | null;
}

export const validateField = (
  field: keyof ValidationState,
  value: any,
  formData: ContractFormData,
): ValidationField => {
  switch (field) {
    case 'salesType':
      return !value
        ? { state: 'error', helperText: '선택필수' }
        : { state: 'active', helperText: '' };

    case 'phoneNumber':
      return !formData.selectedPhoneNumber?.phoneNumber ||
        formData.selectedPhoneNumber.phoneNumber.length < 4
        ? { state: 'error', helperText: '4자리를 입력해주세요' }
        : { state: 'active', helperText: '' };

    case 'simNumber':
      return !value || value === ''
        ? { state: 'error', helperText: '필수' }
        : { state: 'active', helperText: '' };

    case 'imeiNumber':
      return !value || value === ''
        ? { state: 'error', helperText: '필수' }
        : { state: 'active', helperText: '' };

    case 'servicePlan':
      return !formData.selectedService?.serviceId || formData.selectedService.serviceId === ''
        ? { state: 'error', helperText: '필수' }
        : { state: 'active', helperText: '' };

    default:
      return { state: 'active', helperText: '' };
  }
};

export const validateForm = (formData: ContractFormData): ValidationState => {
  return {
    salesType: validateField('salesType', formData.salesType, formData),
    phoneNumber: validateField('phoneNumber', formData.selectedPhoneNumber?.phoneNumber, formData),
    simNumber: validateField('simNumber', formData.simNumber, formData),
    imeiNumber: validateField('imeiNumber', formData.imeiNumber, formData),
    servicePlan: validateField('servicePlan', formData.selectedService?.serviceId, formData),
  };
};

export const isFormValid = (validationState: ValidationState): boolean => {
  return Object.values(validationState).every((field) => field.state === 'active');
};

export const areAllRequiredFieldsFilled = (formData: ContractFormData): boolean => {
  return (
    !!formData.salesType &&
    formData.salesType !== '' &&
    !!formData.selectedPhoneNumber?.phoneNumber &&
    formData.selectedPhoneNumber.phoneNumber !== '' &&
    !!formData.simNumber &&
    formData.simNumber !== '' &&
    !!formData.deviceModelName &&
    formData.deviceModelName !== '' &&
    !!formData.selectedService?.serviceId &&
    formData.selectedService.serviceId !== ''
  );
};

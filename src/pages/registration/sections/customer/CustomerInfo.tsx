import { Typography } from '@mui/material';
import TextField from '@components/TextField';
import { FormWrapper } from '../common/SectionCommon.styled';

import { RegistrationCustomerInfo } from '@stores/registration/RegistrationCustomerStore';
import {
  LeftSection,
  FieldContainer,
  NameLabel,
  RrnoLabel,
  PersonalInfoLabel,
  StyledFormControlLabel,
  StyledCheckbox,
  RightSection,
  VerificationButton,
  ReadOnlyLabel,
} from './CustomerInfo.styled';
import { useState, useMemo, useRef, useEffect } from 'react';
import { isValid, parse } from 'date-fns';

interface CustomerInfoProps {
  isDialogOpen: boolean;
  customer: RegistrationCustomerInfo;
  setCustomer: (customer: RegistrationCustomerInfo) => void;
  isVerificationCompleted: boolean;
  isNameVerified: boolean;
  handleOnClick: () => void;
}

const CustomerInfo = ({
  isDialogOpen,
  customer,
  setCustomer,
  isVerificationCompleted,
  isNameVerified,

  handleOnClick,
}: CustomerInfoProps) => {
  const [nameError, setNameError] = useState<string>('');
  const [rrnoError, setRrnoError] = useState<string>('');
  const rrnoInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const isVerificationEnabled = useMemo(() => {
    return (
      customer.name?.trim() !== '' &&
      !nameError &&
      customer.rrno?.length === 13 &&
      !rrnoError &&
      customer.isConsentPersonalInfo
    );
  }, [customer, nameError, rrnoError]);

  const handleChange = (name: string) => (value: string) => {
    if (name === 'name') {
      setNameError('');
    }

    if (name === 'rrno') {
      const cursorPosition = rrnoInputRef.current?.selectionStart || 0;
      const cleanValue = value.replace(/[^0-9]/g, '');

      if (cleanValue.length > 13) {
        return;
      }

      const error = validateRrno(cleanValue);
      setRrnoError(error);
      setCustomer({
        ...customer,
        [name]: cleanValue,
      });

      requestAnimationFrame(() => {
        if (rrnoInputRef.current) {
          let newPosition = cursorPosition;
          if (cursorPosition > 6) {
            newPosition =
              cursorPosition === 7 && cleanValue.length === 7 ? cursorPosition + 1 : cursorPosition;
          }

          rrnoInputRef.current.setSelectionRange(newPosition, newPosition);
        }
      });
      return;
    }

    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleBlur = (name: string) => () => {
    if (name === 'name' && !customer.name?.trim()) {
      setNameError('이름을 입력해주세요.');
    } else if (name === 'rrno') {
      const error = validateRrno(customer.rrno || '');
      setRrnoError(error);
    }
  };

  const handleCheckboxChange = (name: string) => (_: React.SyntheticEvent, checked: boolean) => {
    setCustomer({
      ...customer,
      [name]: checked,
    });
  };

  const validateRrno = (rrno: string) => {
    if (!rrno.trim()) {
      return '주민번호를 입력해주세요.';
    }

    if (rrno.length > 6) {
      const year = parseInt(rrno.substring(0, 2));
      const month = parseInt(rrno.substring(2, 4));
      const day = parseInt(rrno.substring(4, 6));
      const genderDigit = parseInt(rrno.charAt(6));
      const fullYear = genderDigit <= 2 ? 1900 + year : 2000 + year;

      const birthDate = parse(`${fullYear}-${month}-${day}`, 'yyyy-MM-dd', new Date());

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!isValid(birthDate) || birthDate > today) {
        return '생년월일을 확인해주세요.';
      }

      if (![1, 2, 3, 4].includes(genderDigit)) {
        return '성별을 확인해주세요.';
      }
    }

    if (rrno.length < 13) {
      return '주민번호를 확인해주세요.';
    }

    return '';
  };

  const formatRrno = (value: string) => {
    if (value.length > 6) {
      return `${value.slice(0, 6)}-${value.slice(6)}`;
    }
    return value;
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <FormWrapper>
      <LeftSection>
        <FieldContainer readOnly={isNameVerified}>
          <NameLabel>
            <Typography variant='h6' color='text.secondary'>
              이름
              <Typography component='span' color='error'>
                *
              </Typography>
            </Typography>
          </NameLabel>
          {customer.verificationResult === undefined || !isNameVerified || isDialogOpen ? (
            <TextField
              sx={{ width: '168px' }}
              required
              size='small'
              value={customer.name || ''}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={!!nameError}
              state={nameError ? 'error' : 'inactive'}
              helperText={nameError}
              data-testid='name-field'
              inputRef={nameInputRef}
            />
          ) : (
            <ReadOnlyLabel>{customer.name}</ReadOnlyLabel>
          )}
        </FieldContainer>

        <FieldContainer readOnly={isNameVerified}>
          <RrnoLabel>
            <Typography variant='h6' color='text.secondary'>
              주민번호
              <Typography component='span' color='error'>
                *
              </Typography>
            </Typography>
          </RrnoLabel>
          {customer.verificationResult === undefined || !isNameVerified || isDialogOpen ? (
            <TextField
              required
              sx={{ width: '168px' }}
              size='small'
              value={formatRrno(customer.rrno || '')}
              onChange={handleChange('rrno')}
              onBlur={handleBlur('rrno')}
              error={!!rrnoError}
              placeholder='13자리의 숫자만 입력 가능'
              state={rrnoError ? 'error' : 'inactive'}
              helperText={rrnoError}
              data-testid='rrno-field'
              inputRef={rrnoInputRef}
            />
          ) : (
            <ReadOnlyLabel>{formatRrno(customer.rrno || '')}</ReadOnlyLabel>
          )}
        </FieldContainer>

        <FieldContainer last readOnly={isNameVerified}>
          <PersonalInfoLabel>
            <Typography variant='h6' color='text.secondary'>
              개인정보 활용
              <Typography component='span' color='error'>
                *
              </Typography>
            </Typography>
          </PersonalInfoLabel>
          <StyledFormControlLabel
            control={
              <StyledCheckbox
                size='small'
                disabled={isVerificationCompleted && isNameVerified && !isDialogOpen}
                data-testid='personal-info-consent'
              />
            }
            label='필수동의'
            checked={customer.isConsentPersonalInfo}
            onChange={handleCheckboxChange('isConsentPersonalInfo')}
          />
        </FieldContainer>
      </LeftSection>

      <RightSection>
        <VerificationButton
          variant='outlined'
          size='small'
          onClick={handleOnClick}
          disabled={!isVerificationEnabled || customer.verificationResult || isDialogOpen}
          data-testid='verification-button'
        >
          실명인증
        </VerificationButton>
      </RightSection>
    </FormWrapper>
  );
};

export default CustomerInfo;

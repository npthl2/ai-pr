import { Typography } from '@mui/material';
import TextField from '@components/TextField';
import { FormWrapper } from '../common/SectionCommon.styled';

import { RegistrationCustomerInfo } from '@stores/registration/RegistrationCustomerStore';
import {
  LeftSection,
  FieldContainer,
  FieldLabel,
  PersonalInfoLabel,
  StyledFormControlLabel,
  StyledCheckbox,
  RightSection,
  VerificationButton,
} from '../CustomerSection.styled';
import { useState, useMemo, useRef } from 'react';
import { isValid, parse } from 'date-fns';

interface CustomerInfoProps {
  customer: RegistrationCustomerInfo;
  setCustomer: (customer: RegistrationCustomerInfo) => void;
  isVerificationCompleted: boolean;
  isNameVerified: boolean;
  handleOnClick: () => void;
}

const CustomerInfo = ({
  customer,
  setCustomer,
  isVerificationCompleted,
  isNameVerified,

  handleOnClick,
}: CustomerInfoProps) => {
  const [nameError, setNameError] = useState<string>('');
  const [rrnoError, setRrnoError] = useState<string>('');
  const rrnoInputRef = useRef<HTMLInputElement>(null);

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

      setRrnoError('');
      setCustomer({
        ...customer,
        [name]: cleanValue,
      });

      requestAnimationFrame(() => {
        if (rrnoInputRef.current) {
          let newPosition = cursorPosition;
          if (cursorPosition > 6) {
            newPosition = cursorPosition;
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
      if (!customer.rrno || customer.rrno.length < 13) {
        setRrnoError('주민번호 13자리를 입력해주세요.');
      } else {
        setRrnoError(error);
      }
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
        return '생년월일을 확인해 주세요.';
      }

      if (![1, 2, 3, 4].includes(genderDigit)) {
        return '성별을 확인해주세요.';
      }
    }

    return '';
  };

  const formatRrno = (value: string) => {
    if (value.length > 6) {
      return `${value.slice(0, 6)}-${value.slice(6)}`;
    }
    return value;
  };

  return (
    <FormWrapper>
      <LeftSection>
        <FieldContainer>
          <FieldLabel>
            이름
            <Typography component='span' className='required'>
              *
            </Typography>
          </FieldLabel>
          {customer.verificationResult === undefined || !isNameVerified ? (
            <TextField
              required
              size='small'
              value={customer.name || ''}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={!!nameError}
              state={nameError ? 'error' : 'inactive'}
              helperText={nameError}
              data-testid='name-field'
            />
          ) : (
            <Typography>{customer.name}</Typography>
          )}
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>
            주민번호
            <Typography component='span' className='required'>
              *
            </Typography>
          </FieldLabel>
          {customer.verificationResult === undefined || !isNameVerified ? (
            <TextField
              required
              size='small'
              value={formatRrno(customer.rrno || '')}
              onChange={handleChange('rrno')}
              onBlur={handleBlur('rrno')}
              error={!!rrnoError}
              state={rrnoError ? 'error' : 'inactive'}
              helperText={rrnoError}
              data-testid='rrno-field'
              inputRef={rrnoInputRef}
            />
          ) : (
            <Typography>{formatRrno(customer.rrno || '')}</Typography>
          )}
        </FieldContainer>

        <FieldContainer>
          <PersonalInfoLabel>
            개인정보 활용
            <Typography component='span' className='required'>
              *
            </Typography>
          </PersonalInfoLabel>
          <StyledFormControlLabel
            control={
              <StyledCheckbox
                size='small'
                disabled={isVerificationCompleted && isNameVerified}
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
          disabled={!isVerificationEnabled || customer.verificationResult}
          data-testid='verification-button'
        >
          실명인증
        </VerificationButton>
      </RightSection>
    </FormWrapper>
  );
};

export default CustomerInfo;

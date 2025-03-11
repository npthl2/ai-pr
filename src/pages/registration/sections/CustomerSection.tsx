import TextField from '@components/TextField';
import { Typography, Box } from '@mui/material';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';
import {
  LeftSection,
  RightSection,
  FieldContainer,
  FieldLabel,
  VerificationButton,
  DialogContent,
  DialogResultLabel,
  DialogResultContainer,
  DialogResultValue,
  PersonalInfoLabel,
} from './CustomerSection.styled';
import Dialog from '@components/Dialog';
import Radio from '@components/Radio';
import { useState, useMemo, useEffect } from 'react';
import useRegistrationCustomerStore, {
  RegistrationCustomerInfo,
} from '@stores/registration/RegistrationCustomerStore';
import { useCreateCustomerMutation } from '@api/queries/customer/useCreateCustomerMutation';
import { useCustomerNameVerificationMutation } from '@api/queries/customer/useCustomerNameVerificationMutation';
import {
  CreateCustomerRequestParams,
  CreateCustomerResponse,
  CustomerNameVerificationRequestParams,
  CustomerNameVerificationResponse,
} from '@model/Customer';
import { CommonResponse } from '@model/common/CommonResponse';
import {
  DialogTitle,
  DialogLabel,
  DialogTextField,
  RadioGroup,
  StyledRadioLabel,
  StyledRadioLabelSecond,
  AuthButton,
  DialogResultGrid,
} from './CustomerSection.styled';
import {
  VerificationContainer,
  VerificationContent,
  VerificationTitle,
  VerificationLabel,
  VerificationStatus,
  VerificationCheckButton,
} from './CustomerSection.styled';
import { StyledCheckbox, StyledFormControlLabel } from './CustomerSection.styled';
import { useAvailableCustomerContractQuery } from '@api/queries/contract/useAvailableCustomerContractQuery';
import CheckIcon from '@mui/icons-material/Check';

interface CustomerSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const CustomerSection = ({ contractTabId, onComplete, completed }: CustomerSectionProps) => {
  const { getRegistrationCustomerInfo, setRegistrationCustomerInfo } =
    useRegistrationCustomerStore();
  const [customer, setCustomer] = useState<RegistrationCustomerInfo>(
    getRegistrationCustomerInfo(contractTabId) || {
      name: '이영희',
      rrno: '9001011234567',
      isConsentPersonalInfo: true,
      rrnoIssueDate: '20240101',
      isConsentIdentityVerification: true,
    },
  );

  const [nameError, setNameError] = useState<string>('');
  const [rrnoError, setRrnoError] = useState<string>('');
  const [rrnoIssueDateError, setRrnoIssueDateError] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNameVerified, setIsNameVerified] = useState(false);

  const createCustomerMutation = useCreateCustomerMutation();
  const verifyCustomerNameMutation = useCustomerNameVerificationMutation();

  const [callAvailableContract, setCallAvailableContract] = useState(false);
  const { data: availableContractCount, refetch: refetchAvailableContract } =
    useAvailableCustomerContractQuery(customer.customerId || '', {
      enabled: !!customer.customerId && callAvailableContract,
    });

  useEffect(() => {
    if (availableContractCount) {
      setCustomer({
        ...customer,
        availableContractCount: availableContractCount,
      });

      setRegistrationCustomerInfo(contractTabId, customer);
      if (availableContractCount > 0 && callAvailableContract) {
        onComplete();
      }
    }
  }, [availableContractCount]);

  const validateRrno = (rrno: string) => {
    if (!rrno.trim()) {
      return '주민번호를 입력해주세요.';
    }

    if (rrno.length > 5) {
      const year = parseInt(rrno.substring(0, 2));
      const month = parseInt(rrno.substring(2, 4));
      const day = parseInt(rrno.substring(4, 6));
      const genderDigit = parseInt(rrno.charAt(6));
      const fullYear = genderDigit <= 2 ? 1900 + year : 2000 + year;

      const birthDate = new Date(fullYear, month - 1, day);
      birthDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (birthDate > today) {
        return '생년월일을 확인해 주세요.';
      }

      if (rrno.length > 6 && ![1, 2, 3, 4].includes(genderDigit)) {
        return '성별을 확인해주세요.';
      }
    }

    return '';
  };

  const validateRrnoIssueDate = (rrnoIssueDate: string) => {
    if (rrnoIssueDate.length === 8) {
      const month = parseInt(rrnoIssueDate.substring(4, 6));
      const day = parseInt(rrnoIssueDate.substring(6, 8));

      if (month < 1 || month > 12 || day < 1 || day > 31) {
        return '주민등록증 발급일자를 확인해주세요.';
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

  const handleChange = (name: string) => (value: string) => {
    if (name === 'name') {
      setNameError('');
      if (!value.trim()) {
        setNameError('이름을 입력해주세요.');
      }
    } else if (name === 'rrno') {
      const numericValue = value.replace(/-/g, '');
      if (!/^\d*$/.test(numericValue)) return;
      if (numericValue.length > 13) return;

      setRrnoError('');
      const error = validateRrno(numericValue);
      setRrnoError(error);
      value = numericValue;
    } else if (name === 'rrnoIssueDate') {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 8) return;

      setRrnoIssueDateError('');
      const error = validateRrnoIssueDate(value);
      setRrnoIssueDateError(error);
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
    } else if (name === 'rrnoIssueDate') {
      if (!customer.rrnoIssueDate || customer.rrnoIssueDate.length < 8) {
        setRrnoIssueDateError('주민등록증 발급일자를 입력해주세요.');
      }
    }
  };

  const handleCheckboxChange = (name: string) => (_: React.SyntheticEvent, checked: boolean) => {
    setCustomer({
      ...customer,
      [name]: checked,
    });
  };

  const handleRadioChange = (value: boolean) => {
    setCustomer({
      ...customer,
      isConsentIdentityVerification: value,
    });
  };

  const handleOnClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setCustomer({
      ...customer,
      customerId: undefined,
      customerNameVerificationHistoryId: undefined,
      verificationResult: undefined,
      organization: undefined,
    });

    setIsDialogOpen(false);
  };

  const handleVerificationComplete = () => {
    setIsNameVerified(true);
    setIsDialogOpen(false);
  };

  const handleNameVerification = () => {
    const customerNameVerificationParams: CustomerNameVerificationRequestParams = {
      customerName: customer.name,
      rrno: customer.rrno,
      rrnoIssueDate: customer.rrnoIssueDate,
    };

    verifyCustomerNameMutation.mutate(customerNameVerificationParams, {
      onSuccess: (data: CommonResponse<CustomerNameVerificationResponse>) => {
        const authResponse = data.data as CustomerNameVerificationResponse;
        if (authResponse.checkResult === 'Y' && authResponse.nameVerificationResult === 'Y') {
          const createCustomerParams: CreateCustomerRequestParams = {
            customerName: customer.name,
            rrno: customer.rrno,
            customerNameVerificationHistoryId: authResponse.customerNameVerificationHistoryId,
          };

          createCustomerMutation.mutate(createCustomerParams, {
            onSuccess: (data: CommonResponse<CreateCustomerResponse>) => {
              const createCustomerResponse = data.data as CreateCustomerResponse;
              setCustomer({
                ...customer,
                customerId: createCustomerResponse.customerId,
                customerNameVerificationHistoryId: authResponse.customerNameVerificationHistoryId,
                verificationResult: true,
                organization: authResponse.organization,
              });
            },
            onError: (error) => {
              console.error(error);
              setCustomer({
                ...customer,
                verificationResult: false,
                organization: authResponse.organization,
              });
            },
          });
        } else {
          setCustomer({
            ...customer,
            verificationResult: false,
            organization: authResponse.organization,
          });
        }
      },
    });
  };

  const handleCheckAvailableContract = () => {
    if (customer.customerId) {
      setCallAvailableContract(true);
      if (callAvailableContract) {
        refetchAvailableContract();
      }
    }
  };

  const isVerificationEnabled = useMemo(() => {
    return (
      customer.name?.trim() !== '' &&
      !nameError &&
      customer.rrno?.length === 13 &&
      !rrnoError &&
      customer.isConsentPersonalInfo
    );
  }, [customer, nameError, rrnoError]);

  const isVerificationCompleted = useMemo(() => {
    return customer.verificationResult !== undefined;
  }, [customer.verificationResult]);

  const renderCustomerInfo = () => {
    return (
      <FormWrapper>
        <LeftSection>
          <FieldContainer>
            <FieldLabel>
              이름
              <Typography color='error' component='span' className='required'>
                *
              </Typography>
            </FieldLabel>
            {!isVerificationCompleted || !isNameVerified ? (
              <TextField
                required
                size='small'
                value={customer.name || ''}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                error={!!nameError}
                state={nameError ? 'error' : 'inactive'}
                helperText={nameError}
              />
            ) : (
              <Typography sx={{ ml: -3 }}>{customer.name}</Typography>
            )}
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>
              주민번호
              <Typography color='error' component='span' className='required'>
                *
              </Typography>
            </FieldLabel>
            {!isVerificationCompleted || !isNameVerified ? (
              <TextField
                required
                size='small'
                placeholder='13자리의 숫자만 입력 가능'
                value={formatRrno(customer.rrno || '')}
                onChange={handleChange('rrno')}
                onBlur={handleBlur('rrno')}
                error={!!rrnoError}
                state={rrnoError ? 'error' : 'inactive'}
                helperText={rrnoError}
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
                <StyledCheckbox size='small' disabled={isVerificationCompleted && isNameVerified} />
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
          >
            실명인증
          </VerificationButton>
        </RightSection>
      </FormWrapper>
    );
  };

  const renderCustomerVerification = () => {
    return (
      <VerificationContainer>
        <VerificationContent>
          <VerificationTitle>고객검증</VerificationTitle>
          <VerificationLabel>실명확인결과</VerificationLabel>
          {customer.verificationResult ? (
            <>
              <VerificationStatus success>정상</VerificationStatus>
              <VerificationCheckButton
                variant='outlined'
                size='small'
                color='primary'
                onClick={handleCheckAvailableContract}
                disabled={availableContractCount !== undefined && availableContractCount > 0}
              >
                고객정보사전체크
              </VerificationCheckButton>
              {availableContractCount !== undefined && (
                <>
                  {availableContractCount !== 0 ? (
                    <VerificationStatus success>통과</VerificationStatus>
                  ) : (
                    <VerificationStatus>미통과</VerificationStatus>
                  )}
                  <VerificationLabel>가입가능회선</VerificationLabel>
                  <Typography>{availableContractCount}</Typography>
                </>
              )}
            </>
          ) : (
            <VerificationStatus>실패</VerificationStatus>
          )}
        </VerificationContent>
      </VerificationContainer>
    );
  };

  const renderCustomerAuthDialog = () => {
    return (
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        title='부정가입확인 - 실명인증'
        size='small'
        content={
          <Box>
            <DialogTitle variant='h3'>실명확인</DialogTitle>
            <DialogContent>
              <DialogLabel variant='h6'>증명자료 구분</DialogLabel>
              <Typography>주민등록증</Typography>

              <DialogLabel variant='h6'>
                주민등록증 발급일자
                <Typography component='span' color='error'>
                  *
                </Typography>
              </DialogLabel>
              <DialogTextField
                size='small'
                placeholder='YYYYMMDD'
                error={!!rrnoIssueDateError}
                state={rrnoIssueDateError ? 'error' : 'inactive'}
                helperText={rrnoIssueDateError}
                value={customer.rrnoIssueDate || ''}
                onBlur={handleBlur('rrnoIssueDate')}
                onChange={handleChange('rrnoIssueDate')}
              />
            </DialogContent>

            <DialogContent>
              <DialogLabel variant='h6'>본인조회동의</DialogLabel>
              <RadioGroup>
                <StyledRadioLabel
                  control={<Radio checked={customer.isConsentIdentityVerification} />}
                  label='동의'
                  onChange={() => handleRadioChange(true)}
                />
                <StyledRadioLabelSecond
                  control={<Radio checked={!customer.isConsentIdentityVerification} />}
                  label='미동의'
                  onChange={() => handleRadioChange(false)}
                />
                <AuthButton
                  variant='outlined'
                  color='grey'
                  size='small'
                  disabled={
                    !customer.isConsentIdentityVerification ||
                    !customer.rrnoIssueDate ||
                    rrnoIssueDateError !== ''
                  }
                  onClick={handleNameVerification}
                >
                  실명인증
                </AuthButton>
              </RadioGroup>
            </DialogContent>

            <Box>
              <DialogTitle variant='h3'>실명확인결과</DialogTitle>
              <DialogResultContainer>
                <DialogResultGrid>
                  <DialogResultLabel variant='h6'>실명확인결과</DialogResultLabel>
                  <DialogResultValue variant='h6' success={customer.verificationResult}>
                    {!isVerificationCompleted ? '' : customer.verificationResult ? '성공' : '실패'}
                  </DialogResultValue>

                  <DialogResultLabel variant='h6'>실명인증기관</DialogResultLabel>
                  <DialogResultValue variant='h6'>{customer.organization}</DialogResultValue>

                  <DialogResultLabel variant='h6'>실명인증결과</DialogResultLabel>
                  <DialogResultValue variant='h6' success={customer.verificationResult}>
                    {!isVerificationCompleted ? '' : customer.verificationResult ? '정상' : '실패'}
                  </DialogResultValue>
                </DialogResultGrid>
              </DialogResultContainer>
            </Box>
          </Box>
        }
        closeLabel='취소'
        confirmLabel='확인'
        confirmIcon={<CheckIcon sx={{ mr: 1, fontSize: '16px' }} />}
        onConfirm={handleVerificationComplete}
      />
    );
  };

  return (
    <FormContainer completed={completed}>
      {renderCustomerInfo()}
      {isNameVerified && isVerificationCompleted && renderCustomerVerification()}
      {renderCustomerAuthDialog()}
    </FormContainer>
  );
};

export default CustomerSection;

import { Box, Typography } from '@mui/material';
import Dialog from '@components/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import {
  DialogTitle,
  DialogContent,
  DialogLabel,
  DialogTextField,
  RadioGroup,
  StyledRadioLabel,
  StyledRadioLabelSecond,
  AuthButton,
  DialogResultContainer,
  DialogResultGrid,
  DialogResultLabel,
  DialogResultValue,
} from './CustomerDialog.styled';
import Radio from '@components/Radio';
import { RegistrationCustomerInfo } from '@stores/registration/RegistrationCustomerStore';
import { useState } from 'react';
import { useCreateCustomerMutation } from '@api/queries/customer/useCreateCustomerMutation';
import { useCustomerNameVerificationMutation } from '@api/queries/customer/useCustomerNameVerificationMutation';
import { CommonResponse } from '@model/common/CommonResponse';
import {
  CustomerNameVerificationRequestParams,
  CustomerNameVerificationResponse,
  CreateCustomerRequestParams,
  CreateCustomerResponse,
} from '@model/Customer';
import { isValid, parse } from 'date-fns';

interface CustomerDialogProps {
  isOpen: boolean;
  customer: RegistrationCustomerInfo;
  isVerificationCompleted: boolean;
  setCustomer: (customer: RegistrationCustomerInfo) => void;
  handleClose: () => void;
  handleVerificationComplete: () => void;
}

const CustomerDialog = ({
  isOpen,
  customer,
  isVerificationCompleted,
  setCustomer,
  handleClose,
  handleVerificationComplete,
}: CustomerDialogProps) => {
  const [rrnoIssueDateError, setRrnoIssueDateError] = useState<string>('');

  const createCustomerMutation = useCreateCustomerMutation();
  const verifyCustomerNameMutation = useCustomerNameVerificationMutation();

  const handleChange = (name: string) => (value: string) => {
    if (name === 'rrnoIssueDate') {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 8) return;

      const error = validateRrnoIssueDate(value);
      setRrnoIssueDateError(error);
    }

    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleBlur = (name: string) => () => {
    if (name === 'rrnoIssueDate') {
      const error = validateRrnoIssueDate(customer.rrnoIssueDate || '');
      setRrnoIssueDateError(error);
    }
  };

  const handleRadioChange = (value: boolean) => {
    setCustomer({
      ...customer,
      isConsentIdentityVerification: value,
    });
  };

  const validateRrnoIssueDate = (rrnoIssueDate: string) => {
    if (!rrnoIssueDate.trim()) {
      return '주민등록증 발급일자를 입력해주세요.';
    }

    if (rrnoIssueDate.length === 8) {
      const year = parseInt(rrnoIssueDate.substring(0, 4));
      const month = parseInt(rrnoIssueDate.substring(4, 6));
      const day = parseInt(rrnoIssueDate.substring(6, 8));

      const issueDate = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!isValid(issueDate) || issueDate > today) {
        return '주민등록증 발급일자를 확인해주세요.';
      }
    }

    if (rrnoIssueDate.length < 8) {
      return '주민등록증 발급일자 확인해주세요.';
    }

    return '';
  };

  const handleNameVerification = () => {
    const customerNameVerificationParams: CustomerNameVerificationRequestParams = {
      customerName: customer.name,
      rrno: customer.rrno,
      rrnoIssueDate: customer.rrnoIssueDate,
    };

    const initCustomer = {
      ...customer,
      verificationResult: false,
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
              if (data.successOrNot === 'Y') {
                setCustomer({
                  ...initCustomer,
                  organization: authResponse.organization,
                  customerId: createCustomerResponse.customerId,
                  customerNameVerificationHistoryId: authResponse.customerNameVerificationHistoryId,
                  verificationResult: true,
                });
              } else {
                setCustomer({
                  ...initCustomer,
                  organization: authResponse.organization,
                });
              }
            },
            onError: (error) => {
              console.error(error);
              setCustomer({
                ...initCustomer,
                organization: authResponse.organization,
              });
            },
          });
        } else {
          setCustomer({
            ...initCustomer,
            organization: authResponse.organization,
          });
        }
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      title='부정가입확인 - 실명인증'
      size='small'
      content={
        <Box data-testid='verification-modal'>
          <DialogTitle variant='h3'>실명확인</DialogTitle>
          <DialogContent>
            <DialogLabel variant='h6'>증명자료 구분</DialogLabel>
            <Typography>주민등록증</Typography>

            <DialogLabel variant='h6' alignItems='inherit'>
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
              data-testid='rrno-issue-date-field'
            />
          </DialogContent>

          <DialogContent>
            <DialogLabel variant='h6'>
              본인조회동의
              <Typography component='span' color='error'>
                *
              </Typography>
            </DialogLabel>

            <RadioGroup>
              <StyledRadioLabel
                control={
                  <Radio
                    checked={customer.isConsentIdentityVerification}
                    data-testid='identity-verification-consent'
                  />
                }
                label='동의'
                onChange={() => handleRadioChange(true)}
              />
              <StyledRadioLabelSecond
                control={
                  <Radio
                    checked={!customer.isConsentIdentityVerification}
                    data-testid='identity-verification-consent-no'
                  />
                }
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
                data-testid='verification-auth-button'
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
                <DialogResultValue
                  variant='h6'
                  success={customer.verificationResult}
                  data-testid='verification-result'
                >
                  {!isVerificationCompleted ? '' : customer.verificationResult ? '성공' : '실패'}
                </DialogResultValue>

                <DialogResultLabel variant='h6'>실명인증기관</DialogResultLabel>
                <DialogResultValue variant='h6'>{customer.organization}</DialogResultValue>

                <DialogResultLabel variant='h6'>실명인증결과</DialogResultLabel>
                <DialogResultValue
                  variant='h6'
                  success={customer.verificationResult}
                  data-testid='verification-status'
                >
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

export default CustomerDialog;

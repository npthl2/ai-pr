import { useState } from 'react';
import { Box, Switch, FormControlLabel } from '@mui/material';
import useRegistrationStore from '@stores/registration/RegistrationStore';
import {
  RegistrationRequestContainer,
  ContentContainer,
  PageTitle,
  SectionContainer,
} from './RegistrationRequest.styled';
import StatusMessage from './components/StatusMessage';
import SummaryInfo from './components/SummaryInfo';
import EmailForm from './components/EmailForm';
import ActionButtons from './components/ActionButtons';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';
import { useEmailSendMutation } from '@api/queries/email/useEmailSendMutation';
import { EmailSendRequest } from '@model/Email';
import useToastStore from '@stores/ToastStore';
import { Toast } from '@components/Toast';
import useMenuStore from '@stores/MenuStore';
import useCustomerStore from '@stores/CustomerStore';
import { MainMenu, TabInfo } from '@constants/CommonConstant';
import customerService from '@api/services/customerService';
import { Gender } from '@model/Customer';
import { useRegistration } from '@hooks/useRegistration';
import { useRegistrationStatusQuery } from '@api/queries/registration/useRegistrationStatusQuery';
import { useRegistrationInfo } from '@hooks/useRegistrationInfo';

interface RegistrationRequestProps {
  contractTabId: string;
}

const RegistrationRequest = ({ contractTabId }: RegistrationRequestProps) => {
  const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>(false);

  // Toast 스토어 접근
  const openToast = useToastStore((state) => state.openToast);

  // 이메일 발송 mutation 훅 사용
  const { mutate: sendEmail, isPending: isEmailSending } = useEmailSendMutation();

  const registrationInfo = useRegistrationInfo(contractTabId);
  const invoiceInfo = registrationInfo.invoice;
  const salesInfo = registrationInfo.sales;
  const contractInfo = registrationInfo.contract;
  const deviceInfo = registrationInfo.device;
  const customerInfo = registrationInfo.customer;

  const businessProcessId = useRegistrationStore(
    (state) => state.registrationInfo[contractTabId]?.businessProcessId,
  );

  const { data } = useRegistrationStatusQuery({
    refetchInterval: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  const registrationData = data?.registrations.find(
    (registration) => registration.businessProcessId === businessProcessId,
  );

  // 이메일 발송 처리
  const handleSendEmail = (email: string) => {
    if (!contractTabId || !customerInfo?.customerId) {
      openToast('계약 정보 또는 고객 정보가 없습니다.');
      return;
    }

    // 저장된 계약 ID 사용
    const contractId = registrationData?.contractId;

    const emailRequest: EmailSendRequest = {
      customerId: customerInfo.customerId,
      ...(contractId && { contractId }), // contractId가 있을 때만 포함
      emailAddress: email,
    };

    sendEmail(emailRequest, {
      onSuccess: (response) => {
        if (response.successOrNot === 'Y') {
          openToast('이메일 발송이 완료되었습니다.');
        } else {
          openToast('이메일 발송에 실패했습니다. 다시 시도해 주세요.');
        }
      },
      onError: () => {
        openToast('이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      },
    });
  };

  // 필요한 스토어 접근
  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const selectCustomer = useCustomerStore((state) => state.selectCustomer);
  const { handleRemoveAllRegistrationInfo } = useRegistration();
  const { customerTabs, setCustomerTabs, addCustomer, setActiveTab, reset } = useCustomerStore();

  // 홈으로 이동
  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');

    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);

    // 현재 고객 ID가 있는 경우 해당 고객의 모든 등록 정보 제거
    if (contractTabId) {
      handleRemoveAllRegistrationInfo(contractTabId);
    }

    // 모든 고객 탭 닫기 (CustomerStore의 reset 함수 호출)
    reset();
  };

  // 고객조회로 이동
  const handleGoCustomerSearch = async () => {
    // 1. 필요한 정보 확인
    if (!contractInfo?.phoneNumber || !customerInfo?.customerId) {
      openToast('고객 정보 또는 전화번호가 없습니다.');
      return;
    }

    try {
      // 전화번호에서 대시 제거
      const formattedPhoneNumber = contractInfo.phoneNumber.replace(/-/g, '');

      // 2. 전화번호로 고객 정보 조회
      const response = await customerService.fetchCustomer({
        phoneNumber: formattedPhoneNumber, // 대시가 제거된 전화번호 사용
      });

      // 3. 응답 처리
      if (response.successOrNot === 'Y' && response.data && typeof response.data !== 'string') {
        const data = response.data;

        // 4. 신규가입 탭 닫기 (contractTabId가 있는 경우)
        if (contractTabId) {
          // 등록 정보 정리
          handleRemoveAllRegistrationInfo(contractTabId);

          // 탭 닫기 로직 (탭 배열에서 제거)
          const currentTabs = customerTabs[customerInfo.customerId]?.tabs || [];
          const newTabs = currentTabs.filter((tab) => tab.id !== TabInfo.NEW_SUBSCRIPTION.id);

          // 수정된 부분: 두 함수를 순차적으로 호출
          setCustomerTabs(customerInfo.customerId, newTabs);
          setActiveTab(customerInfo.customerId, TabInfo.CUSTOMER_SEARCH.id);
        }

        // 5. 고객 추가 또는 선택
        const result = addCustomer({
          id: data.customerId,
          name: data.customerName,
          encryptedName: data.encryptedCustomerName,
          unmaskingName: '',
          rrno: data.rrno,
          encryptedRrno: data.encryptedRrno,
          unmaskingRrno: '',
          age: data.age,
          gender: data.gender === 'M' ? Gender.MALE : Gender.FEMALE,
          contractId: data.contractId,
        });

        // 6. 메뉴 상태 변경 및 탭 활성화
        if (result) {
          setSelectedMainMenu(MainMenu.CUSTOMERS);
          setActiveTab(data.customerId, TabInfo.CUSTOMER_SEARCH.id);
        } else {
          openToast('고객은 최대 10명까지 조회할 수 있습니다.');
        }
      } else {
        openToast('고객 정보 조회에 실패했습니다.');
      }
    } catch (error) {
      console.error('고객 조회 중 오류 발생:', error);
      openToast('고객 조회 중 오류가 발생했습니다.');
    }
  };

  // 이메일 토글 변경 처리
  const handleEmailToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailEnabled(event.target.checked);
  };

  return (
    <RegistrationRequestContainer>
      <ContentContainer>
        <StatusMessage
          status={registrationData?.status as RegistrationStatusType}
          customerName={registrationData?.customerName || ''}
        />

        <SectionContainer>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              mb: 2,
              backgroundColor: (theme) => theme.palette.common.white,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
              }}
            >
              <PageTitle>가입정보 요약</PageTitle>
            </Box>

            <Box
              sx={{
                p: 3,
                backgroundColor: (theme) => theme.palette.grey[50],
              }}
            >
              {invoiceInfo && deviceInfo && contractInfo && (
                <SummaryInfo
                  invoiceInfo={invoiceInfo}
                  deviceInfo={deviceInfo}
                  contractInfo={contractInfo}
                  salesInfo={salesInfo}
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: (theme) => theme.palette.background.paper,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
                display: 'flex',
                alignItems: 'center', // 세로 중앙 정렬
                gap: 2, // 요소 간 간격 추가
              }}
            >
              <PageTitle>가입내역서</PageTitle>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEmailEnabled}
                    onChange={handleEmailToggleChange}
                    disabled={
                      (registrationData?.status as RegistrationStatusType) !==
                      REGISTRATION_STATUS.COMPLETED
                    }
                    size='small'
                    data-testid='email-toggle'
                  />
                }
                label='이메일 발송'
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color:
                      (registrationData?.status as RegistrationStatusType) ===
                      REGISTRATION_STATUS.COMPLETED
                        ? 'text.primary'
                        : 'text.disabled',
                    fontSize: '0.875rem',
                  },
                }}
              />
            </Box>

            {/* 하단: 이메일 입력 폼 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start', // 왼쪽 정렬
                width: '100%',
                minHeight: '80px', // 최소 높이 설정 (오류 메시지 공간 확보)
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: '0 0 4px 4px', // 하단 모서리 둥글게
              }}
            >
              <EmailForm
                status={registrationData?.status as RegistrationStatusType}
                onSendEmail={handleSendEmail}
                isEnabled={isEmailEnabled}
                isLoading={isEmailSending}
              />
            </Box>
          </Box>

          <ActionButtons
            status={registrationData?.status as RegistrationStatusType}
            onGoHome={handleGoHome}
            onGoCustomerSearch={handleGoCustomerSearch}
          />
        </SectionContainer>
      </ContentContainer>
      <Toast />
    </RegistrationRequestContainer>
  );
};

export default RegistrationRequest;

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Box, Switch, FormControlLabel } from '@mui/material';
import registrationService from '@api/services/registrationService';
import useRegistrationStore from '@stores/registration/RegistrationStore';
import {
  RegistrationRequestContainer,
  ContentContainer,
  PageTitle,
  SectionContainer
} from './RegistrationRequest.styled';
import StatusMessage from './registration/StatusMessage';
import SummaryInfo from './registration/SummaryInfo';
import EmailForm from './registration/EmailForm';
import ActionButtons from './registration/ActionButtons';
import { InvoiceInfo, DeviceInfo, ContractInfo, RegistrationStatus, RegistrationInfo } from '@model/RegistrationInfo';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';
import { useEmailSendMutation } from '@api/queries/email/useEmailSendMutation';
import { EmailSendRequest } from '@model/Email';
import useToastStore from '@stores/ToastStore';
import { Toast } from '@components/Toast';

interface RegistrationRequestProps {
  contractTabId?: string;
}

const RegistrationRequest = ({ contractTabId }: RegistrationRequestProps) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<RegistrationStatusType>('PENDING');
  const [failReason, setFailReason] = useState<string>('');
  const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>(false);
  
  // Toast 스토어 접근
  const openToast = useToastStore((state) => state.openToast);
  
  // 이메일 발송 mutation 훅 사용
  const { mutate: sendEmail, isPending: isEmailSending } = useEmailSendMutation();
  
  // 스토어 접근
  const updateRegistrationStatus = useRegistrationStore((state) => state.updateRegistrationStatus);
  const getRegistrationInfo = useRegistrationStore((state) => state.getRegistrationInfo);
  
  // RegistrationStore에서 데이터 가져오기
  const registrationData = contractTabId ? getRegistrationInfo(contractTabId) : undefined;
  
  // 각 정보 추출
  const customerInfo = registrationData?.customer;
  const invoiceInfo = registrationData?.invoice as InvoiceInfo;
  const deviceInfo = registrationData?.device as DeviceInfo;
  const contractInfo = registrationData?.contract as ContractInfo;
  const salesInfo = registrationData?.sales;
  
  // 저장 상태를 폴링하는 쿼리
  const { data, isError, refetch } = useQuery({
    queryKey: ['registrationStatus', contractTabId],
    queryFn: () => {
      console.log('폴링 쿼리 실행:', contractTabId);
      if (!contractTabId) return Promise.resolve({ status: REGISTRATION_STATUS.PENDING } as RegistrationStatus);
      
      // business_process_id가 있으면 사용, 없으면 contractTabId 사용
      const business_process_id = registrationData?.business_process_id || contractTabId;
      console.log('상태 조회 ID:', business_process_id);
      return registrationService.getRegistrationStatus(business_process_id);
    },
    refetchInterval: status === REGISTRATION_STATUS.PENDING ? 2000 : false, // PENDING 상태일 때만 2초마다 폴링
    enabled: !!contractTabId && status === REGISTRATION_STATUS.PENDING,
    staleTime: 0, // 항상 최신 데이터 사용
    gcTime: 0, // 캐시 사용하지 않음
    retry: 3, // 실패 시 3번까지 재시도
    refetchOnWindowFocus: false, // 창 포커스 시 다시 가져오지 않음
  });

  // 컴포넌트 마운트 시 초기 상태 설정
  useEffect(() => {
    if (contractTabId && status === REGISTRATION_STATUS.PENDING) {
      console.log('초기 상태 설정 및 폴링 시작');
      // 현재 저장된 정보 확인
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);
      
      // 즉시 첫 번째 폴링 실행
      refetch();
    }
  }, [contractTabId, refetch, status]);

  useEffect(() => {
    console.log('폴링 결과:', data);
    if (data?.status) {
      // 타입 안전성을 위해 status 값을 검증
      const newStatus = data.status === REGISTRATION_STATUS.COMPLETED ? REGISTRATION_STATUS.COMPLETED : 
                        data.status === REGISTRATION_STATUS.FAILED ? REGISTRATION_STATUS.FAILED : REGISTRATION_STATUS.PENDING;
      
      console.log('상태 업데이트:', status, '->', newStatus);
      
      // 상태가 변경된 경우에만 업데이트
      if (status !== newStatus) {
        console.log('상태 변경 감지, 업데이트 실행');
        setStatus(newStatus);
        if (contractTabId) {
          // 상태 업데이트 및 contract_id가 있으면 함께 저장
          updateRegistrationStatus(contractTabId, newStatus);
          
          // contract_id가 있고 상태가 COMPLETED인 경우 RegistrationStore에 저장
          if (data.contract_id && newStatus === REGISTRATION_STATUS.COMPLETED && registrationData) {
            console.log('계약 ID 발견, 저장 실행:', data.contract_id);
            // 기존 정보 복사 후 contract_id 추가
            const updatedInfo: RegistrationInfo = {
              ...registrationData,
              contract_id: data.contract_id,
              status: newStatus // 상태도 함께 업데이트
            };
            useRegistrationStore.getState().setRegistrationInfo(contractTabId, updatedInfo);
            console.log('계약 ID 저장 완료:', data.contract_id);
            console.log('업데이트된 정보:', updatedInfo);
          }
        }
      } else {
        console.log('상태 변경 없음, 업데이트 생략');
      }
      
      // 실패 시 사유 설정
      if (data.status === REGISTRATION_STATUS.FAILED && 'reason' in data) {
        setFailReason(data.reason as string || '');
      }
    }
    
    if (isError) {
      console.log('폴링 오류 발생');
      setStatus(REGISTRATION_STATUS.FAILED);
      setFailReason('서버 연결 오류가 발생했습니다.');
      if (contractTabId) {
        updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
      }
    }
  }, [data, isError, contractTabId, updateRegistrationStatus, registrationData, status]);

  // 이메일 발송 처리
  const handleSendEmail = (email: string) => {
    if (!contractTabId || !customerInfo?.customerId) {
      console.log('customerInfo', customerInfo);
      openToast('계약 정보 또는 고객 정보가 없습니다.');
      return;
    }

    // 저장된 계약 ID 사용
    const contractId = registrationData?.contract_id;
    
    const emailRequest: EmailSendRequest = {
      customerId: customerInfo.customerId,
      ...(contractId && { contractId }), // contractId가 있을 때만 포함
      emailAddress: email
    };

    sendEmail(emailRequest, {
      onSuccess: (response) => {
        if (response.successOrNot === 'Y') {
          openToast('이메일이 성공적으로 발송되었습니다.');
        } else {
          openToast('이메일 발송에 실패했습니다. 다시 시도해 주세요.');
        }
      },
      onError: () => {
        openToast('이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    });
  };
  
  // 홈으로 이동
  const handleGoHome = () => {
    navigate('/');
  };

  // 고객조회로 이동
  const handleGoCustomerSearch = () => {
    // 고객조회 페이지로 이동하는 로직 추가
  };

  // 이메일 토글 변경 처리
  const handleEmailToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailEnabled(event.target.checked);
  };

  return (
    <RegistrationRequestContainer>
      <ContentContainer>
        <StatusMessage 
          status={status} 
          customerName={customerInfo?.name || ''} 
          failReason={failReason} 
        />

        <SectionContainer>
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            mb: 4,
            backgroundColor: (theme) => theme.palette.common.white,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              backgroundColor: (theme) => theme.palette.common.white
            }}>
              <PageTitle>가입정보 요약</PageTitle>
            </Box>
            
            <Box sx={{ 
              p: 3,
              backgroundColor: (theme) => theme.palette.grey[50]
            }}>
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
          
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: (theme) => theme.palette.background.paper,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              backgroundColor: (theme) => theme.palette.common.white,
              display: 'flex',
              alignItems: 'center', // 세로 중앙 정렬
              gap: 2, // 요소 간 간격 추가
            }}>
              <PageTitle>가입내역서</PageTitle>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEmailEnabled}
                    onChange={handleEmailToggleChange}
                    disabled={status !== 'COMPLETED'}
                    size="small"
                  />
                }
                label="이메일 발송"
                sx={{ 
                  '& .MuiFormControlLabel-label': { 
                    color: status === 'COMPLETED' ? 'text.primary' : 'text.disabled',
                    fontSize: '0.875rem'
                  } 
                }}
              />
            </Box>

            {/* 하단: 이메일 입력 폼 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start', // 왼쪽 정렬
              width: '100%',
            }}>
              <EmailForm 
                status={status} 
                onSendEmail={handleSendEmail}
                isEnabled={isEmailEnabled}
                isLoading={isEmailSending}
              />
            </Box>
          </Box>
          
          <ActionButtons 
            status={status} 
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

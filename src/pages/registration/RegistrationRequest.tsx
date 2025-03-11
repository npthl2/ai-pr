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
import { RegistrationStatusType, InvoiceInfo, DeviceInfo, ContractInfo } from '@model/RegistrationInfo';
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
  
  // 컴포넌트 마운트 시 RegistrationStore 상태 확인
  useEffect(() => {
    if (contractTabId) {
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);
    }
  }, [contractTabId]);
  
  // 저장 상태를 폴링하는 쿼리
  const { data, isError } = useQuery({
    queryKey: ['registrationStatus', contractTabId],
    queryFn: () => {
      if (!contractTabId) return Promise.resolve({ status: 'PENDING' as const });
      return registrationService.getRegistrationStatus(contractTabId);
    },
    refetchInterval: 3000, // 3초마다 폴링
    enabled: !!contractTabId && status === 'PENDING',
  });

  useEffect(() => {
    if (data?.status) {
      // 타입 안전성을 위해 status 값을 검증
      const newStatus = data.status === 'COMPLETED' ? 'COMPLETED' : 
                        data.status === 'FAILED' ? 'FAILED' : 'PENDING';
      
      setStatus(newStatus);
      if (contractTabId) {
        updateRegistrationStatus(contractTabId, newStatus);
      }
      
      // 실패 시 사유 설정
      if (data.status === 'FAILED' && 'reason' in data) {
        setFailReason(data.reason as string || '');
      }
    }
    
    if (isError) {
      setStatus('FAILED');
      setFailReason('서버 연결 오류가 발생했습니다.');
      if (contractTabId) {
        updateRegistrationStatus(contractTabId, 'FAILED');
      }
    }
  }, [data, isError, contractTabId, updateRegistrationStatus]);

  // 개발 단계에서는 실제 백엔드 연동 전까지 5초 후 완료 상태로 변경하는 임시 로직 추가
  useEffect(() => {
    if (status === 'PENDING') {
      const timer = setTimeout(() => {
        setStatus('COMPLETED');
        if (contractTabId) {
          updateRegistrationStatus(contractTabId, 'COMPLETED');
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [status, contractTabId, updateRegistrationStatus]);

  // 이메일 발송 처리
  const handleSendEmail = (email: string) => {
    if (!contractTabId || !customerInfo?.customerId) {
      console.log('customerInfo', customerInfo);
      openToast('계약 정보 또는 고객 정보가 없습니다.');
      return;
    }

    const emailRequest: EmailSendRequest = {
      customerId: customerInfo.customerId,
      // contractId: contractTabId,
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

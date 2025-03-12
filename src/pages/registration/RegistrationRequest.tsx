import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import useMenuStore from '@stores/MenuStore';
import useCustomerStore from '@stores/CustomerStore';
import { MainMenu, TabInfo } from '@constants/CommonConstant';
import customerService from '@api/services/customerService';
import { Gender } from '@model/Customer';
import { useRegistration } from '@hooks/useRegistration';

interface RegistrationRequestProps {
  contractTabId?: string;
}

const RegistrationRequest = ({ contractTabId }: RegistrationRequestProps) => {
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
    queryKey: ['registrationStatus', contractTabId, registrationData?.business_process_id],
    queryFn: async () => {
      console.log('폴링 쿼리 실행:', contractTabId);
      console.log('폴링 쿼리 키:', ['registrationStatus', contractTabId, registrationData?.business_process_id]);
      
      if (!contractTabId) return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
      
      // business_process_id가 있는 경우에만 폴링 실행
      // business_process_id가 없으면 아직 저장되지 않은 상태이므로 PENDING 반환
      const business_process_id = registrationData?.business_process_id;
      
      if (!business_process_id) {
        console.log('business_process_id 없음, 저장 전 상태로 간주');
        return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
      }
      
      console.log('상태 조회 ID:', business_process_id);
      try {
        const response = await registrationService.getRegistrationStatus(business_process_id);
        console.log('상태 조회 응답:', response);
        
        // 응답 데이터 변환
        if (response.data && typeof response.data === 'object') {
          const statusData = response.data;
          console.log('상태 데이터:', statusData);
          
          return {
            status: statusData.status === 'COMPLETED' ? REGISTRATION_STATUS.COMPLETED :
                   statusData.status === 'FAILED' ? REGISTRATION_STATUS.FAILED :
                   REGISTRATION_STATUS.PENDING,
            ...(statusData.contractId ? { contract_id: statusData.contractId } : {}),
            ...(statusData.reason ? { reason: statusData.reason } : {})
          } as RegistrationStatus;
        }
        
        return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
      } catch (error) {
        console.error('상태 조회 중 오류 발생:', error);
        return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
      }
    },
    refetchInterval: status === REGISTRATION_STATUS.PENDING ? 2000 : false, // PENDING 상태일 때만 2초마다 폴링
    enabled: !!contractTabId && status === REGISTRATION_STATUS.PENDING && !!registrationData?.business_process_id, // business_process_id가 있을 때만 활성화
    staleTime: 0, // 항상 최신 데이터 사용
    gcTime: 0, // 캐시 사용하지 않음
    retry: 3, // 실패 시 3번까지 재시도
    refetchOnWindowFocus: false, // 창 포커스 시 다시 가져오지 않음
  });

  // 컴포넌트 마운트 시 초기 상태 설정
  useEffect(() => {
    if (contractTabId) {
      console.log('초기 상태 설정');
      console.log('의존성 배열 값:', { contractTabId, status, 'registrationData?.business_process_id': registrationData?.business_process_id });
      
      // 현재 저장된 정보 확인
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);
      
      // business_process_id 확인
      if (savedInfo?.business_process_id) {
        console.log('저장된 business_process_id 발견:', savedInfo.business_process_id);
        // business_process_id가 있고 상태가 PENDING인 경우에만 폴링 시작
        if (status === REGISTRATION_STATUS.PENDING) {
          console.log('폴링 시작');
          refetch();
        } else {
          console.log('상태가 PENDING이 아니므로 폴링 시작하지 않음:', status);
        }
      } else {
        console.log('저장된 business_process_id 없음, 폴링 대기');
      }
    } else {
      console.log('contractTabId가 없음, 초기 상태 설정 생략');
    }
  }, [contractTabId, refetch, status, registrationData?.business_process_id]);
// 개발 환경에서만 동작하는 테스트용 business_process_id 생성 로직
  // useEffect(() => {
  //   // 개발 환경에서만 동작
  //   if (process.env.NODE_ENV !== 'development') return;
    
  //   // contractTabId가 있고, 저장된 정보가 있지만 business_process_id가 없는 경우에만 실행
  //   if (contractTabId && registrationData && !registrationData.business_process_id) {
  //     console.log('개발 환경 테스트: business_process_id 자동 생성 준비');
      
  //     const timer = setTimeout(() => {
  //       console.log('개발 환경 테스트: business_process_id 자동 생성 시작');
        
  //       // 현재 저장된 정보 다시 확인 (타이머 실행 시점에 변경되었을 수 있음)
  //       const currentInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
        
  //       // 여전히 business_process_id가 없는 경우에만 생성
  //       if (currentInfo && !currentInfo.business_process_id) {
  //         // 임의의 business_process_id 생성
  //         const business_process_id = `BP_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
  //         console.log('개발 환경 테스트: 생성된 business_process_id:', business_process_id);
          
  //         // business_process_id 추가하여 저장
  //         const updatedInfo = {
  //           ...currentInfo,
  //           business_process_id,
  //           status: REGISTRATION_STATUS.PENDING
  //         };
          
  //         // 저장소에 업데이트
  //         useRegistrationStore.getState().setRegistrationInfo(contractTabId, updatedInfo);
  //         console.log('개발 환경 테스트: business_process_id 저장됨');
          
  //         // 폴링 시작을 위해 refetch 호출
  //         refetch();
  //       }
  //     }, 3000); // 3초 후 실행
      
  //     return () => clearTimeout(timer);
  //   }
  // }, [contractTabId, registrationData, refetch]);
  // 

  useEffect(() => {
    console.log('폴링 결과:', data);
    console.log('의존성 배열 값 (폴링 결과):', { data, isError, contractTabId, status });
    
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
        console.log('실패 사유 설정:', data.reason);
      }
    } else {
      console.log('폴링 결과에 status가 없음');
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
          openToast('이메일 발송이 완료되었습니다.');
        } else {
          openToast('이메일 발송에 실패했습니다. 다시 시도해 주세요.');
        }
      },
      onError: () => {
        openToast('이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    });
  };
  
  // 필요한 스토어 접근
  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const selectCustomer = useCustomerStore((state) => state.selectCustomer);
  const { handleRemoveAllRegistrationInfo } = useRegistration();
  const { customerTabs, setCustomerTabs, addCustomer, setActiveTab } = useCustomerStore();

  // 홈으로 이동
  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');
    
    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);
    
    // 필요한 경우 추가 정리 작업 수행
    // 예: 등록 정보 초기화, 탭 닫기 등
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
          const newTabs = currentTabs.filter(tab => tab.id !== TabInfo.NEW_SUBSCRIPTION.id);
          
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
          status={status} 
          customerName={customerInfo?.name || ''} 
          failReason={failReason} 
        />

        <SectionContainer>
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            mb: 2,
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
                    disabled={status !== REGISTRATION_STATUS.COMPLETED}
                    size="small"
                  />
                }
                label="이메일 발송"
                sx={{ 
                  '& .MuiFormControlLabel-label': { 
                    color: status === REGISTRATION_STATUS.COMPLETED ? 'text.primary' : 'text.disabled',
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
              minHeight: '80px', // 최소 높이 설정 (오류 메시지 공간 확보)
              backgroundColor: (theme) => theme.palette.common.white,
              borderRadius: '0 0 4px 4px' // 하단 모서리 둥글게
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

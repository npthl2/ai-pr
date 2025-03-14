import { Typography, Divider, Box } from '@mui/material';
import Button from '@components/Button';
import {
  SummaryContainer,
  SummarySection,
  SummaryContents,
  SummaryItem,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
  ItemLabel,
  ItemValue,
} from './RegistrationSummary.styled';
import { SECTION_IDS, SECTION_TITLES, REGISTRATION_STATUS } from '@constants/RegistrationConstants';
// import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import { useState, useEffect } from 'react';
import { useRegistrationInfo } from '@hooks/useRegistrationInfo';
import useRegistrationStore from '@stores/registration/RegistrationStore';
import { useRegistrationMutation } from '@api/queries/registration/useRegistrationMutation';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';
import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';

interface ContractSummaryProps {
  contractTabId: string;
  setIsSaveRequested: (isSaveRequested: boolean) => void;
}

const ContractSummary = ({ contractTabId, setIsSaveRequested }: ContractSummaryProps) => {
  // const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  // const customerInfo = getRegistrationCustomerInfo(contractTabId);
  const { getRegistrationInvoiceInfo } = useRegistrationInvoiceStore();
  const registrationInvoiceInfo = getRegistrationInvoiceInfo(contractTabId);


  // 모든 계약 관련 데이터 가져오기
  const { setRegistrationInfo, updateRegistrationStatus } = useRegistrationStore();
  const [loading, setLoading] = useState(false);
  const registrationMutation = useRegistrationMutation();

  // 저장 버튼 활성화 상태 관리
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 각 스토어를 구독하여 변경 사항을 감지
  useEffect(() => {
    // 각 스토어의 상태를 확인하는 함수
    const checkValidation = () => {
      try {
        const contractStore = useRegistrationContractStore.getState() as any;
        // const deviceStore = useRegistrationDeviceStore.getState() as any;
        const salesStore = useRegistrationSalesStore.getState() as any;
        // const invoiceStore = useRegistrationInvoiceStore.getState() as any;

        // 개발 환경인 경우 useRegistrationInfo의 모킹 데이터 사용
        //TODO : 개발환경 삭제, const 추가 필요
        let contractInfo: any;
        // let deviceInfo: any;
        let salesInfo: any;
        // let invoiceInfo: any;
        if (process.env.NODE_ENV === 'development') {
          contractInfo = { isValidated: true };
          salesInfo = { isValidated: true };
        } else {
          // 각 스토어에서 데이터 가져오기
          //TODO : 개발환경 삭제, const 추가 필요
          contractInfo = contractStore.getRegistrationContractInfo?.(contractTabId);
          // deviceInfo = deviceStore.getRegistrationDeviceInfo?.(contractTabId);
          salesInfo = salesStore.getRegistrationSalesInfo?.(contractTabId);
          // invoiceInfo = invoiceStore.getRegistrationInvoiceInfo?.(contractTabId);
        }
        // 모든 스토어의 isValidated 값 확인
        const isAllValidated =
          (contractInfo?.isValidated || false) &&
          // (deviceInfo?.isValidated || false) &&
          (salesInfo?.isValidated || false);

        setIsButtonEnabled(isAllValidated);
      } catch (error) {
        console.error('검증 상태 확인 중 오류 발생:', error);
        setIsButtonEnabled(false);
      }
    };

    // 초기 검증 상태 확인
    checkValidation();

    // 각 스토어 구독
    const unsubscribeContract = useRegistrationContractStore.subscribe(checkValidation);
    const unsubscribeDevice = useRegistrationDeviceStore.subscribe(checkValidation);
    const unsubscribeSales = useRegistrationSalesStore.subscribe(checkValidation);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeContract();
      unsubscribeDevice();
      unsubscribeSales();
    };
  }, [contractTabId]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // 1. 모든 데이터 가져오기
      const registrationInfo = useRegistrationInfo(contractTabId);

      // 2. zustand에 저장하고 상태를 PENDING으로 설정
      const updatedInfo = {
        ...registrationInfo,
        status: REGISTRATION_STATUS.PENDING,
      };

      // 저장 전 RegistrationStore 상태 확인
      setRegistrationInfo(contractTabId, updatedInfo);
      updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.PENDING);

      // 저장된 데이터 확인
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);

      // 3. 백엔드 API 호출 (개발 단계에서는 임시 응답 사용)
      // Promise를 반환하도록 수정하여 API 응답을 기다림
      await new Promise((resolve, reject) => {
        registrationMutation.mutate(updatedInfo, {
          onSuccess: (response) => {
            // business_process_id 저장 (폴링에 사용)
            if (
              response.data &&
              typeof response.data === 'object' &&
              'businessProcessId' in response.data
            ) {
              const businessProcessId = response.data.businessProcessId;

              // business_process_id를 저장소에 업데이트
              const updatedInfoWithId = {
                ...updatedInfo,
                businessProcessId: businessProcessId,
                status: REGISTRATION_STATUS.PENDING, // 상태 명시적으로 설정
              };

              // 저장소에 업데이트
              setRegistrationInfo(contractTabId, updatedInfoWithId);

              // Promise 해결
              resolve(businessProcessId);
            } else {
              // 오류 처리
              updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
              reject(new Error('백엔드에서 business_process_id가 반환되지 않음'));
            }

            // 성공 응답 처리는 RegistrationRequest 컴포넌트에서 폴링으로 처리
          },
          onError: (error) => {
            updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
            reject(error);
          },
        });
      });

      // 4. 저장 완료 화면으로 이동 (결과와 상관없이)
      setIsSaveRequested(true);
    } catch (error) {
      console.error('저장 처리 중 오류 발생:', error);
      updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SummaryContainer>
      <SummarySection>
        <Typography variant='h3' sx={{ mb: 2 }}>
          가입정보 요약
        </Typography>

        <SummaryContents>
          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.INVOICE]}</Typography>
            <SummaryItem>
              <ItemLabel>납부고객명</ItemLabel>
              <ItemValue>{registrationInvoiceInfo?.recipient}</ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>납부방법</ItemLabel>
              <ItemValue>{registrationInvoiceInfo?.paymentMethod}</ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.SALES]}</Typography>
            <SummaryItem>
              <ItemLabel>판매채널정보</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.CONTRACT]}</Typography>
            <SummaryItem>
              <ItemLabel>개통요금제</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.DEVICE]}</Typography>
            <SummaryItem>
              <ItemLabel>스폰서정책</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>스폰서 옵션</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <ItemLabel>출고가</ItemLabel>
              <ItemValue sx={{ fontWeight: 900 }}></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>공시지원금</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>선납금</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <ItemLabel>할부원금</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>총 할부수수료</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>총금액</ItemLabel>
              <ItemValue></ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>월 할부금</ItemLabel>
              <ItemValue sx={{ fontWeight: 900 }}></ItemValue>
            </SummaryItem>
          </Box>
        </SummaryContents>
      </SummarySection>

      <ButtonContainer>
        <LeftButtonGroup>
          <Button
              variant='outlined'
              color='grey'
              size='large'
              disabled={!registrationInvoiceInfo}
              data-testid='temporary-save-button'
            >
            임시저장
          </Button>
          <Button variant='outlined' color='grey' size='large'>
            임시저장 불러오기
          </Button>
        </LeftButtonGroup>
        <RightButtonGroup>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={handleSave}
            disabled={loading || !isButtonEnabled}
            data-testid='save-button'
          >
            {loading ? '저장 중...' : '저장'}
          </Button>
        </RightButtonGroup>
      </ButtonContainer>
    </SummaryContainer>
  );
};

export default ContractSummary;

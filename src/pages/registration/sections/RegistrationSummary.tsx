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
} from './RegistrationSummary.styled';
import { SECTION_IDS, SECTION_TITLES, REGISTRATION_STATUS } from '@constants/RegistrationConstants';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import { useState } from 'react';
import { useRegistrationInfo } from '@hooks/useRegistrationInfo';
import useRegistrationStore from '@stores/registration/RegistrationStore';
import { useRegistrationMutation } from '@api/queries/registration/useRegistrationMutation';

interface ContractSummaryProps {
  contractTabId: string;
  setIsSaveRequested: (isSaveRequested: boolean) => void;
}

const ContractSummary = ({ contractTabId, setIsSaveRequested }: ContractSummaryProps) => {
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const customerInfo = getRegistrationCustomerInfo(contractTabId);

  // 모든 계약 관련 데이터 가져오기
  const { setRegistrationInfo, updateRegistrationStatus } = useRegistrationStore();
  const [loading, setLoading] = useState(false);
  const registrationMutation = useRegistrationMutation();

  const handleSave = async () => {
    try {
      setLoading(true);

      // 1. 모든 데이터 가져오기 (현재는 customerStore만 구현됨)
      const registrationInfo = useRegistrationInfo(contractTabId);
      console.log('데이터 수집 확인:', registrationInfo);

      // 2. zustand에 저장하고 상태를 PENDING으로 설정
      const updatedInfo = {
        ...registrationInfo,
        status: REGISTRATION_STATUS.PENDING
      };
      
      // 저장 전 RegistrationStore 상태 확인
      console.log('저장 전 RegistrationStore:', useRegistrationStore.getState());
      
      setRegistrationInfo(contractTabId, updatedInfo);
      updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.PENDING);
      
      // 저장 후 RegistrationStore 상태 확인
      console.log('저장 후 RegistrationStore:', useRegistrationStore.getState());
      
      // 저장된 데이터 확인
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);

      // 3. 백엔드 API 호출 (개발 단계에서는 임시 응답 사용)
      registrationMutation.mutate(updatedInfo, {
        onSuccess: (response) => {
          console.log('저장 요청 성공:', response);
          
          // business_process_id 저장 (폴링에 사용)
          if (response.data && typeof response.data === 'object' && 'businessProcessId' in response.data) {
            const businessProcessId = response.data.businessProcessId;
            console.log('백엔드에서 반환된 businessProcessId:', businessProcessId);
            
            // business_process_id를 저장소에 업데이트
            const updatedInfoWithId = {
              ...updatedInfo,
              business_process_id: businessProcessId,
              status: REGISTRATION_STATUS.PENDING // 상태 명시적으로 설정
            };
            
            // 저장소에 업데이트
            setRegistrationInfo(contractTabId, updatedInfoWithId);
            console.log('business_process_id 저장됨:', businessProcessId);
            
            // 저장 후 RegistrationStore 상태 확인
            const updatedSavedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
            console.log('business_process_id 저장 후 RegistrationInfo:', updatedSavedInfo);
            
            // 이 시점에서 RegistrationRequest 컴포넌트의 폴링이 시작됨
          } else {
            console.warn('백엔드에서 business_process_id가 반환되지 않음');
            // 오류 처리
            updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
          }
          
          // 성공 응답 처리는 RegistrationRequest 컴포넌트에서 폴링으로 처리
        },
        onError: (error) => {
          console.error('저장 요청 실패:', error);
          updateRegistrationStatus(contractTabId, REGISTRATION_STATUS.FAILED);
        },
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
              <Typography variant='body2'>납부자명</Typography>
              <Typography variant='body2' color='text.secondary'>
                {customerInfo?.name || '-'}
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>납부방법</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.SALES]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>판매채널정보</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.CONTRACT]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>개통요금제</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.DEVICE]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>스폰서정책</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>스폰서 옵션</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>출고가</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>공시지원금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>선납금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>할부원금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>총 할부수수료</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>총금액</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>월 할부금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
        </SummaryContents>
      </SummarySection>

      <ButtonContainer>
        <LeftButtonGroup>
          <Button variant='outlined' color='grey' size='large'>
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
            disabled={loading}
          >
            {loading ? '저장 중...' : '저장'}
          </Button>
        </RightButtonGroup>
      </ButtonContainer>
    </SummaryContainer>
  );
};

export default ContractSummary;

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
} from './ContractSummary.styled';
import { SECTION_IDS, SECTION_TITLES } from '@constants/RegistrationConstants';
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
        status: 'PENDING' as const
      };
      
      // 저장 전 RegistrationStore 상태 확인
      console.log('저장 전 RegistrationStore:', useRegistrationStore.getState());
      
      setRegistrationInfo(contractTabId, updatedInfo);
      updateRegistrationStatus(contractTabId, 'PENDING');
      
      // 저장 후 RegistrationStore 상태 확인
      console.log('저장 후 RegistrationStore:', useRegistrationStore.getState());
      
      // 저장된 데이터 확인
      const savedInfo = useRegistrationStore.getState().getRegistrationInfo(contractTabId);
      console.log('저장된 RegistrationInfo:', savedInfo);

      // 3. 백엔드 API 호출 (개발 단계에서는 임시 응답 사용)
      registrationMutation.mutate(updatedInfo, {
        onSuccess: (response) => {
          console.log('저장 요청 성공:', response);
          // 성공 응답 처리는 ContractRequest 컴포넌트에서 폴링으로 처리
        },
        onError: (error) => {
          console.error('저장 요청 실패:', error);
          updateRegistrationStatus(contractTabId, 'FAILED');
        },
      });

      // 4. 저장 완료 화면으로 이동 (결과와 상관없이)
      setIsSaveRequested(true);
    } catch (error) {
      console.error('저장 처리 중 오류 발생:', error);
      updateRegistrationStatus(contractTabId, 'FAILED');
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

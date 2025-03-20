// src/pages/modifyService/modification/ServiceModify.tsx
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectService from './components/ModifiedServiceSelect';
import AdditionalServiceList from './components/AdditionalServiceList';
import SelectedServiceList from './components/SelectedAdditionalServiceList';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { useAdditionalServicesQuery } from '@api/queries/modifyService/useModifyServiceQuery';

// 스타일 컴포넌트
const Container = styled(Box)({
  padding: '20px',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',

  flex: 1,
});

const Section = styled(Box)({
  marginBottom: '24px',
});

const ServiceHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '16px',
});

interface ServiceModifyProps {
  // props 정의
}

const ServiceModify: React.FC<ServiceModifyProps> = () => {
  // 스토어에서 선택된 서비스와 총액 계산 함수 가져오기
  const { selectedService, selectedAdditionalServices, getTotalPrice } = useModifyServiceStore();

  // 부가서비스 목록 조회
  const { data: additionalServices = [] } = useAdditionalServicesQuery();

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = () => {
    // 여기에 실제 저장 로직 구현
    console.log('선택된 요금제:', selectedService);
    console.log('선택된 부가서비스:', selectedAdditionalServices);
    console.log('총 금액:', getTotalPrice());

    // TODO: API 호출하여 저장 처리
    alert('요금제 변경이 저장되었습니다.');
  };

  return (
    <Container>
      {/* 1. 요금제 선택 영역 모양 확인*/}
      <Section>
        <SelectService />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <ServiceHeader>
          <Typography variant='subtitle1'>부가서비스 목록</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{additionalServices.length}</Typography>
          </Box>
        </ServiceHeader>
        <AdditionalServiceList />
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <ServiceHeader>
          <Typography variant='subtitle1'>선택된 부가서비스</Typography>
          <Typography>{selectedAdditionalServices.length}</Typography>
        </ServiceHeader>
        <SelectedServiceList />
        <Box sx={{ backgroundColor: '#f5f6f8', padding: '16px', borderRadius: '4px' }}>
          <Typography variant='subtitle2'>합계</Typography>
          <Typography variant='h6'>{getTotalPrice().toLocaleString()}원</Typography>
        </Box>
      </Section>

      {/* 4. 버튼 영역 */}
      <ButtonGroup>
        <Button variant='outlined'>조회</Button>
        <Button variant='contained' onClick={handleSave}>
          저장
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ServiceModify;

// src/pages/modifyService/modification/ModifyService.tsx
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectService from './components/SelectService';

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

const SearchBox = styled(Box)({
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

interface NewServiceSelectionProps {
  // props 정의
}

const ModifyService: React.FC<NewServiceSelectionProps> = () => {
  return (
    <Container>
      {/* 1. 요금제 선택 영역 */}
      <Section>
        <SelectService onSelect={() => {}} />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <ServiceHeader>
          <Typography variant='subtitle1'>부가서비스 목록</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='caption' sx={{ color: '#ff4d4f' }}>
              3-6
            </Typography>
            <Typography>100</Typography>
          </Box>
        </ServiceHeader>
        <SearchBox>{/* TODO: ServiceSearch 컴포넌트 */}</SearchBox>
        {/* TODO: AdditionalServiceList 컴포넌트 */}
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <ServiceHeader>
          <Typography variant='subtitle1'>선택된 부가서비스</Typography>
          <Typography>4</Typography>
        </ServiceHeader>
        {/* TODO: SelectedServiceList 컴포넌트 */}
        <Box sx={{ backgroundColor: '#f5f6f8', padding: '16px', borderRadius: '4px' }}>
          <Typography variant='subtitle2'>합계</Typography>
          <Typography variant='h6'>40,000원</Typography>
        </Box>
      </Section>

      {/* 4. 버튼 영역 */}
      <ButtonGroup>
        <Button variant='outlined'>조회</Button>
        <Button variant='contained'>저장</Button>
      </ButtonGroup>
    </Container>
  );
};

export default ModifyService;

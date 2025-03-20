import { Box, Typography } from '@mui/material';
import ServiceModify from '@pages/modifyService/modification/ServiceModify';

const ServiceModification = () => {
  return (
    <Box>
      {/* 1. 헤더 정보 영역 */}
      <Box
        sx={{
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        {/* TODO: CustomerInfoHeader 컴포넌트 
          - 회원 기본 정보 표시
          - 서비스번호, 번호 신택, 요금제, 기기정보 등
        */}
        <Typography>회원 기본 정보 표시</Typography>
      </Box>

      {/* 2. 현재/변경 요금제 비교 영역 */}
      <Box
        display='full'
        borderRadius='8px'
        sx={{
          padding: '20px',
        }}
      >
        <Box
          display='flex'
          borderRadius='8px'
          border='1px solid #e0e0e0'
          sx={{
            padding: '20px',
          }}
        >
          {/* 2-1. 왼쪽: 현재 요금제 정보 */}
          <Box
            flex={1}
            sx={{
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              padding: '20px',
            }}
          >
            {/* TODO: CurrentServiceInfo 컴포넌트 
            - 현재 요금제명과 금액
            - 현재 부가서비스 목록
            - 합계 금액
          */}
            <Typography>현재 요금제 정보</Typography>
          </Box>

          {/* 2-2. 오른쪽: 변경할 요금제 정보 */}
          <ServiceModify>
            {/* TODO: NewServiceSelection 컴포넌트
            - 요금제 선택 드롭다운
            - 부가서비스 목록 (검색 가능)
            - 선택된 부가서비스 목록
            - 합계 금액
            - 조회/저장 버튼
          */}
          </ServiceModify>
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceModification;

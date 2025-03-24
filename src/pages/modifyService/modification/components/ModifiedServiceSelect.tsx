// src/pages/modifyService/modification/components/ServicePlanSelect.tsx
// 이 컴포넌트는 사용자가 변경할 서비스(요금제)를 선택할 수 있는 드롭다운 UI를 제공합니다.
// API에서 서비스 목록을 가져와 최신 출시 순으로 정렬하여 보여주고, 선택된 서비스 정보를 상위 컴포넌트로 전달합니다.
import { Box, Typography, TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { useServicesQuery, Service } from '@api/queries/modifyService/useModifyServiceQuery';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import Button from '@components/Button';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import Tooltip from '@components/Tooltip';

// 루트 컨테이너 스타일 - 전체 컴포넌트 레이아웃
const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// 한 줄에 모든 요소를 배치하는 컨테이너
const ServiceRowContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between', // 요소들 사이에 공간을 균등하게 분배
});

// 왼쪽 영역 스타일 (제목과 드롭다운을 담는 컨테이너)
const LeftSectionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

// 타이틀 텍스트 스타일
const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '16px',
  minWidth: '120px',
});

// Autocomplete를 감싸는 컨테이너
const AutocompleteContainer = styled(Box)({
  flex: 0.5, // 크기를 줄임
  maxWidth: '400px', // 최대 너비 설정
  marginLeft: '8px',
  marginRight: '16px',
});

// 가격 영역 컨테이너
const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// 가격 텍스트 스타일
const PriceTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  fontWeight: 500,
  minWidth: '80px',
  textAlign: 'right',
});

// 이전 요금제로 되돌리기 버튼 스타일
const RevertButton = styled(Button)({
  whiteSpace: 'nowrap',
  minHeight: '32px',
  fontSize: '12px',
});

// 툴팁 아이콘 스타일
const InfoIcon = styled(InfoOutlinedIcon)({
  fontSize: 16,
  color: '#9e9e9e',
  marginLeft: '4px',
  cursor: 'help',
});

// 타입 정의: 서비스 플랜(요금제) 데이터 구조
// 선택 가능한 서비스 항목의 데이터 형식을 정의합니다.
export interface ServicePlan {
  id: string; // 서비스 ID
  name: string; // 서비스 이름 (표시용)
  price: number; // 서비스 가격
  releaseDate: string; // 출시일 (최신출시순 정렬을 위한 필드)
}

/**
 * 서비스 선택 컴포넌트
 * 요금제 목록을 조회하고 사용자가 선택한 요금제를 Zustand 스토어에 저장합니다.
 */
const SelectService = () => {
  // Zustand 스토어에서 서비스 선택 관련 상태와 액션 가져오기
  const {
    selectedService,
    setSelectedService,
    isServiceModifiable,
    previousService,
    isChangedToday,
    revertToPreviousService,
  } = useModifyServiceStore();

  // API에서 서비스 목록을 가져옵니다 (useServicesQuery 훅 사용)
  const { data: services = [] } = useServicesQuery();

  // 서비스 데이터를 ServicePlan 형식으로 변환
  // API 응답 데이터를 컴포넌트에서 사용하기 적합한 형태로 매핑합니다.
  const servicePlans: ServicePlan[] = services.map((service: Service) => ({
    id: service.serviceId,
    name: service.serviceName,
    price: service.serviceValue,
    releaseDate: service.releaseDate,
  }));

  // 사용자가 서비스를 선택했을 때 실행되는 핸들러
  // 선택된 서비스 정보를 Zustand 스토어에 저장합니다.
  const handlePlanChange = (_: any, newValue: ServicePlan | null) => {
    if (newValue) {
      // 선택된 요금제의 ID로 원본 서비스 객체를 찾아 스토어에 저장
      const selectedServiceData =
        services.find((service: Service) => service.serviceId === newValue.id) || null;

      setSelectedService(selectedServiceData);
    } else {
      setSelectedService(null);
    }
  };

  // 이전 요금제로 되돌리기 핸들러
  const handleRevertToPreviousService = () => {
    revertToPreviousService();
  };

  // 최신출시순으로 정렬
  // 서비스 목록을 출시일 기준 내림차순으로 정렬하여 최신 서비스가 상단에 표시되도록 합니다.
  const sortedServicePlans = [...servicePlans].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );

  // 선택된 서비스가 있을 경우 해당 서비스 플랜 찾기
  const selectedPlan = selectedService
    ? servicePlans.find((plan) => plan.id === selectedService.serviceId) || null
    : null;

  // 요금제 변경 불가 시 표시할 툴팁 메시지
  const disabledTooltipMessage = '요금제 변경은 월 1회만 가능합니다. 다음 달에 다시 시도해 주세요.';

  // 이전 요금제가 있고, 당일 변경되었으며, 요금제 변경이 불가능한 상태인 경우에만 되돌리기 버튼 표시
  const showRevertButton = previousService && isChangedToday && !isServiceModifiable;

  return (
    <RootContainer>
      <ServiceRowContainer>
        <LeftSectionContainer>
          {/* 제목 */}
          <TitleTypography variant='subtitle1'>
            변경할 요금제
            {!isServiceModifiable && (
              <Tooltip title={disabledTooltipMessage} placement='right'>
                <InfoIcon />
              </Tooltip>
            )}
          </TitleTypography>

          {/* Autocomplete 컴포넌트: 검색 가능한 드롭다운 선택 UI */}
          <AutocompleteContainer>
            <MuiAutocomplete<ServicePlan>
              fullWidth
              value={selectedPlan}
              options={sortedServicePlans} // 정렬된 서비스 목록을 옵션으로 제공
              getOptionLabel={(option) => option.name} // 표시할 레이블 지정 (서비스 이름)
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={!isServiceModifiable} // 요금제 변경 불가능한 경우 비활성화
              renderOption={(props, option) => (
                // 각 옵션 항목의 커스텀 렌더링: 서비스 이름과 가격을 함께 표시
                <Box component='li' {...props}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>{option.name}</Typography>
                    <Typography>{option.price.toLocaleString()}원</Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                // 입력 필드의 커스텀 렌더링: 검색 및 선택 입력창
                <MuiTextField
                  {...params}
                  placeholder={isServiceModifiable ? '요금제 선택' : '요금제 변경 불가'}
                  size='small'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      opacity: isServiceModifiable ? 1 : 0.7,
                    },
                  }}
                />
              )}
              onChange={handlePlanChange} // 선택 변경 시 이벤트 핸들러
              size='small'
            />
          </AutocompleteContainer>
        </LeftSectionContainer>

        {/* 선택한 요금제의 요금 및 되돌리기 버튼 */}
        <PriceContainer>
          <PriceTypography>
            {selectedService ? `${selectedService.serviceValue.toLocaleString()}원` : '0원'}
          </PriceTypography>

          {showRevertButton && (
            <RevertButton
              variant='outlined'
              color='primary'
              size='small'
              iconComponent={<RestoreIcon />}
              iconPosition='left'
              onClick={handleRevertToPreviousService}
            >
              이전 요금제로 되돌리기
            </RevertButton>
          )}
        </PriceContainer>
      </ServiceRowContainer>
    </RootContainer>
  );
};

export default SelectService;

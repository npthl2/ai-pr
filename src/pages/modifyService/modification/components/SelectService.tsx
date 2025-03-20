// src/pages/modifyService/modification/components/ServicePlanSelect.tsx
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useServicesQuery, Service } from '@api/queries/modifyService/useModifyServiceQuery';
import PropTypes from 'prop-types';

// 스타일 컴포넌트
const SelectContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
});

const ServiceHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

// 타입 정의
export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  releaseDate: string; // 최신출시순 정렬을 위한 필드
}

interface ServicePlanSelectProps {
  onSelect: (plan: ServicePlan | null) => void;
}

const SelectService: React.FC<ServicePlanSelectProps> = ({ onSelect }) => {
  const { data: services = [] } = useServicesQuery();

  // 서비스 데이터를 ServicePlan 형식으로 변환
  const servicePlans: ServicePlan[] = services.map((service: Service) => ({
    id: service.serviceId,
    name: service.serviceName,
    price: service.serviceValue,
    releaseDate: service.releaseDate,
  }));

  const handlePlanChange = (event: any, newValue: ServicePlan | null) => {
    onSelect(newValue);
  };

  // 최신출시순으로 정렬
  const sortedServicePlans = [...servicePlans].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );

  return (
    <SelectContainer>
      <ServiceHeader>
        <Typography variant='subtitle1'>변경할 요금제</Typography>
      </ServiceHeader>
      <Autocomplete
        fullWidth
        options={sortedServicePlans}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography>{option.name}</Typography>
              <Typography>{option.price.toLocaleString()}원</Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='요금제 선택'
            size='small'
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#ffffff',
              },
            }}
          />
        )}
        onChange={handlePlanChange}
      />
      <Typography>0원</Typography>
    </SelectContainer>
  );
};

SelectService.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SelectService;

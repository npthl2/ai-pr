import { ServiceItem } from './types';
import { StyledTreeItem } from './StyledTreeItem';
import { Box, Typography } from '@mui/material';
import {
  CONTRACT_SERVICE_TYPE_CODE,
  CONTRACT_SERVICE_END_DATE,
} from '@pages/customer/detail/CustomerDetailConstant';

interface ServiceTreeItemProps {
  item: ServiceItem;
  contractId: string;
  onPhoneSelect: (contractId: string) => void;
}

// ISO 날짜 문자열에서 날짜 부분만 추출
const formatDate = (isoDate: string | null | undefined): string => {
  try {
    return isoDate?.split('T')[0] || '';
  } catch {
    return '';
  }
};

// 시작일과 종료일을 포맷팅. 시작일or종료일이 없으면 빈 문자열, 종료일이 계약중인 경우 종료일만 빈 문자열 반환
const getDateDisplay = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): string => {
  if (!startDate || !endDate) return '';

  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate) === CONTRACT_SERVICE_END_DATE ? '' : formatDate(endDate);

  if (!formattedStart && !formattedEnd) return '';
  return `${formattedStart} - ${formattedEnd}`;
};

export const ServiceTreeItem = ({ item, contractId, onPhoneSelect }: ServiceTreeItemProps) => {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case CONTRACT_SERVICE_TYPE_CODE:
        return '#ff0000';
      default:
        return '#666';
    }
  };

  const typeColor = getTypeColor(item.serviceType);

  const boxStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const colorBoxStyles = {
    width: '3px',
    height: '21px',
    backgroundColor: typeColor,
  };

  const textStyles = {
    color: typeColor,
  };

  return (
    <StyledTreeItem
      key={item.id}
      itemId={item.id}
      onClick={() => onPhoneSelect(contractId)}
      data-group-testid='tree-item'
      label={
        <Box sx={boxStyles}>
          <Box sx={colorBoxStyles} />
          <Typography sx={textStyles} variant='body2'>
            {item.serviceType}
          </Typography>
          <Typography component='span' variant='body1'>
            {item.serviceName}
          </Typography>
          <Typography component='span' variant='body2' color='text.secondary'>
            {getDateDisplay(item.validStartDatetime, item.validEndDatetime)}
          </Typography>
        </Box>
      }
    />
  );
};

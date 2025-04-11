import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customer/detail/CustomerDetailConstant';
import {
  CardWrapper,
  CardContent,
  ServiceName,
  DetailButton,
  CustomerInfo,
  CustomerName,
  PhoneNumber,
  DetailInfo,
  StyledDivider,
} from './ContractCard.styled';
import { ContractDataWithCustomer } from '@model/CustomerContract';
import { useState } from 'react';

interface ContractCardProps {
  contract: ContractDataWithCustomer;
  onDetailClick: (contractId: string) => void;
}

const ContractCard = ({ contract, onDetailClick }: ContractCardProps) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <CardWrapper
      key={contract.contractId}
      className={hoveredCardId === contract.contractId ? 'hover-active' : ''}
      onMouseEnter={() => setHoveredCardId(contract.contractId)}
      onMouseLeave={() => setHoveredCardId(null)}
      onClick={() => onDetailClick(contract.contractId)}
    >
      <CardContent data-testid={`card-content-${contract.contractId}`}>
        <CustomerInfo>
          <CustomerName variant='h3'>{contract.customerDetail.customerName}</CustomerName>
          <PhoneNumber variant='h3'>{contract.contractDetail.phoneNumber}</PhoneNumber>
          <StyledDivider />
          <ServiceName variant='h4'>
            {contract.contractDetail.serviceList.find(
              (service) => service.serviceType === CONTRACT_SERVICE_TYPE_CODE,
            )?.serviceName ?? '요금제 없음'}
          </ServiceName>
        </CustomerInfo>
        <DetailInfo>
          <DetailButton variant='h5' data-testid={`card-detail-info-${contract.contractId}`}>
            상세 정보 보기 →
          </DetailButton>
        </DetailInfo>
      </CardContent>
    </CardWrapper>
  );
};

export default ContractCard;

import { ContentContainer, StyledDialog } from './TodayContractsModal.styled';
import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';
import TodayContractsDetailInfo from './TodayContractsDetailInfo';
import { mapToInfo } from '@api/queries/customerDetail/useCustomerDetail';

interface TodayContractsModalProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
}

const TodayContractsModal = ({ open, onClose, contractId }: TodayContractsModalProps) => {
  const { data: todayContracts } = useTodayContracts();
  const selectedContract = todayContracts?.find((contract) => contract.contractId === contractId);
  const contractData = selectedContract ? mapToInfo(selectedContract) : null;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      closeLabel='확인'
      title='고객 상세 정보'
      maxWidth={false}
      content={
        <ContentContainer>
          <TodayContractsDetailInfo contractData={contractData} />
        </ContentContainer>
      }
      data-testid='today-contracts-detail-dialog'
    />
  );
};

export default TodayContractsModal;

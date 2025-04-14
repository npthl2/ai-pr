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
  ItemLabel,
  ItemValue,
} from './RegistrationSummary.styled';
import { SECTION_IDS, SECTION_TITLES, SectionId } from '@constants/RegistrationConstants';
import { useState, useEffect } from 'react';
import useRegistrationStore from '@stores/registration/RegistrationStore';
import { useRegistrationMutation } from '@api/queries/registration/useRegistrationMutation';
import useRegistrationDeviceStore, {
  RegistrationDeviceInfo,
} from '@stores/registration/RegistrationDeviceStore';
import useRegistrationContractStore, {
  Contract,
} from '@stores/registration/RegistrationContractStore';
import useRegistrationSalesStore, { Sales } from '@stores/registration/RegistrationSalesStore';
import useRegistrationInvoiceStore, {
  RegistrationInvoiceInfo,
} from '@stores/registration/RegistrationInvoiceStore';
import useRegistrationCustomerStore, {
  RegistrationCustomerInfo,
} from '@stores/registration/RegistrationCustomerStore';
import { RegistrationInfo, RegistrationResponseData } from '@model/RegistrationInfo';
import { CommonResponse } from '@model/common/CommonResponse';

interface ContractSummaryProps {
  contractTabId: string;
  setIsSaveRequested: (isSaveRequested: boolean) => void;
  completedSections: SectionId[];
}

const ContractSummary = ({
  contractTabId,
  setIsSaveRequested,
  completedSections,
}: ContractSummaryProps) => {
  const customerInfo = useRegistrationCustomerStore((state) =>
    state.getRegistrationCustomerInfo(contractTabId),
  );

  const invoiceInfo = useRegistrationInvoiceStore((state) =>
    state.getRegistrationInvoiceInfo(contractTabId),
  );

  const deviceInfo = useRegistrationDeviceStore((state) =>
    state.getRegistrationDeviceInfo(contractTabId),
  );

  const contractInfo = useRegistrationContractStore((state) =>
    state.getRegistrationContractInfo(contractTabId),
  );

  const salesInfo = useRegistrationSalesStore((state) =>
    state.getRegistrationSalesInfo(contractTabId),
  );

  const { setRegistrationBusinessProcessId } = useRegistrationStore();

  // 모든 계약 관련 데이터 가져오기
  const registrationMutation = useRegistrationMutation();

  // 저장 버튼 활성화 상태 관리
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(
      (contractInfo?.isValidated || false) &&
        (deviceInfo?.isValidated || false) &&
        (salesInfo?.isValidated || false),
    );
  }, [contractInfo?.isValidated, deviceInfo?.isValidated, salesInfo?.isValidated]);

  const handleSave = async () => {
    const registrationInfo: RegistrationInfo = {
      customer: customerInfo as RegistrationCustomerInfo,
      invoice: invoiceInfo as RegistrationInvoiceInfo,
      device: deviceInfo as RegistrationDeviceInfo,
      contract: contractInfo as Contract,
      sales: salesInfo as Sales,
    };

    registrationMutation.mutate(registrationInfo, {
      onSuccess: (response: CommonResponse<RegistrationResponseData>) => {
        if (
          response.data &&
          typeof response.data === 'object' &&
          'businessProcessId' in response.data
        ) {
          const businessProcessId = response.data.businessProcessId;
          setRegistrationBusinessProcessId(contractTabId, businessProcessId);

          setIsSaveRequested(true);
        }
      },
    });
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
              <ItemLabel>납부고객명</ItemLabel>
              <ItemValue data-testid='invoice-summary-recipient-input'>
                {invoiceInfo?.paymentName}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>납부방법</ItemLabel>
              <ItemValue data-testid='invoice-summary-payment-method-input'>
                {invoiceInfo?.paymentMethod}
              </ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.SALES]}</Typography>
            <SummaryItem>
              <ItemLabel>판매채널정보</ItemLabel>
              <ItemValue data-testid='sales-summary-sales-department-input'>
                {completedSections.includes(SECTION_IDS.SALES) ? salesInfo?.salesDepartment : ''}
              </ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.CONTRACT]}</Typography>
            <SummaryItem>
              <ItemLabel>개통요금제</ItemLabel>
              <ItemValue data-testid='contract-summary-service-input'>
                {completedSections.includes(SECTION_IDS.CONTRACT)
                  ? contractInfo?.service?.serviceName
                  : ''}
              </ItemValue>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.DEVICE]}</Typography>
            <SummaryItem>
              <ItemLabel>스폰서정책</ItemLabel>
              <ItemValue>{deviceInfo?.isValidated ? '통합스폰서' : ''}</ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>스폰서 옵션</ItemLabel>
              <ItemValue>
                {deviceInfo?.isValidated ? deviceInfo?.deviceEngagementName : ''}
                {deviceInfo?.deviceEngagementPeriod
                  ? ` (${deviceInfo.deviceEngagementPeriod}개월)`
                  : ''}
              </ItemValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <ItemLabel>출고가</ItemLabel>
              <ItemValue sx={{ fontWeight: 900 }} data-testid='device-summary-sales-price'>
                {deviceInfo?.deviceSalesPrice
                  ? `${deviceInfo.deviceSalesPrice.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>공시지원금</ItemLabel>
              <ItemValue data-testid='device-summary-discount-price'>
                {deviceInfo?.deviceDiscountPrice
                  ? `${deviceInfo.deviceDiscountPrice.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>선납금</ItemLabel>
              <ItemValue>
                {deviceInfo?.devicePrepaidPrice
                  ? `${deviceInfo.devicePrepaidPrice.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <Divider />
            <SummaryItem>
              <ItemLabel>할부원금</ItemLabel>
              <ItemValue data-testid='device-summary-installment-price'>
                {deviceInfo?.deviceInstallmentAmount
                  ? `${deviceInfo.deviceInstallmentAmount.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>총 할부수수료</ItemLabel>
              <ItemValue data-testid='device-summary-installment-fee'>
                {deviceInfo?.deviceInstallmentFee
                  ? `${deviceInfo.deviceInstallmentFee.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>총금액</ItemLabel>
              <ItemValue data-testid='device-summary-total-price'>
                {deviceInfo?.deviceTotalPrice
                  ? `${deviceInfo.deviceTotalPrice.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
            <SummaryItem>
              <ItemLabel>월 할부금</ItemLabel>
              <ItemValue
                sx={{ fontWeight: 900 }}
                data-testid='device-summary-monthly-payment-price'
              >
                {deviceInfo?.monthlyInstallmentPrice
                  ? `${deviceInfo.monthlyInstallmentPrice.toLocaleString()}원`
                  : '-'}
              </ItemValue>
            </SummaryItem>
          </Box>
        </SummaryContents>
      </SummarySection>

      <ButtonContainer>
        <LeftButtonGroup>
          <Button
            variant='outlined'
            color='grey'
            size='large'
            disabled={!invoiceInfo}
            data-testid='temporary-save-button'
          >
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
            disabled={!isButtonEnabled}
            data-testid='save-button'
          >
            {'저장'}
          </Button>
        </RightButtonGroup>
      </ButtonContainer>
    </SummaryContainer>
  );
};

export default ContractSummary;

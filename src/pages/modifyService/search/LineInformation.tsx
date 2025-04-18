import Button from '@components/Button';
import { Box, Typography } from '@mui/material';
import { LineInfoDetailsContainer, ServiceLabel, ServiceValue } from './LineInformation.styled';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import ContractServiceList from './ContractServiceList';
import ContractServiceDialog from './ContractServiceDialog';
import { useCustomerContractQuery } from '@api/queries/contract/useCustomerContractQuery';
import { ROLE_UNMASKING, MASKING_ITEM_CODE, TabInfo } from '@constants/CommonConstant';
import { CustomerContract } from '@model/Contract';
import Unmasking from '@pages/unmasking/Unmasking';
import useMemberStore from '@stores/MemberStore';
import { Customer } from '@model/Customer';
import { useCheckModifiable } from '@hooks/modifyService/useCheckModifiable';

interface MaskedTarget {
  maskingType: string;
}

interface UnmaskingData {
  itemTypeCode: string;
  encryptedItem: string;
  maskingType: string;
}

const transformContractToStoreFormat = (contract: CustomerContract) => ({
  contractId: contract.contractId,
  statusCode: contract.statusCode,
  customerId: contract.customerId,
  serviceId: contract.serviceId,
  serviceName: contract.serviceName,
  serviceType: contract.serviceType,
  phoneNumber: '',
  maskingPhoneNumber: contract.maskingPhoneNumber,
  encryptedPhoneNumber: contract.encryptedPhoneNumber,
  imei: '',
  maskingImei: contract.maskingImei,
  encryptedImei: contract.encryptedImei,
  deviceModelName: contract.deviceModelName,
  deviceModelNameAlias: contract.deviceModelNameAlias,
});

const LineInformation = () => {
  const customerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedCustomer = useCustomerStore(
    (state) => state.customers.find((c) => c.id === customerId) as Customer,
  );
  const selectedCustomerId = useRef(customerId).current;
  const isCustomer = useCustomerStore((state) => state.isCustomer(selectedCustomer));

  const [isServiceListOpen, setIsServiceListOpen] = useState(false);
  const [showNoContractDialog, setShowNoContractDialog] = useState(false);
  const [showChangeBlockedDialog, setShowChangeBlockedDialog] = useState(false);
  const [isUnmaskPopupOpen, setIsUnmaskPopupOpen] = useState(false);
  const [unmaskingData, setUnmaskingData] = useState<UnmaskingData | null>(null);

  const memberInfo = useMemberStore((state) => state.memberInfo);
  const isUnmaskable = memberInfo?.authorities.includes(ROLE_UNMASKING);

  const {
    setCustomerContract,
    getCustomerContracts,
    setCustomerContracts,
    getSelectedContractId,
    setSelectedContractId,
  } = useCurrentServiceStore();
  const customerContract = useCurrentServiceStore(
    (state) =>
      state.customerContracts[selectedCustomerId]?.find(
        (contract) => contract.contractId === state.selectedContractIds[selectedCustomerId],
      ) || null,
  );

  // 현재 활성화된 탭 정보 가져오기
  const customerTabs = useCustomerStore(
    (state) => state.customerTabs[selectedCustomerId] || { activeTab: -1, tabs: [] },
  );

  // 현재 SERVICE_MODIFICATION 탭이 활성화되었는지 확인
  const isServiceModificationTabActive = customerTabs.tabs.some(
    (tab) => tab.id === customerTabs.activeTab && tab.label === TabInfo.SERVICE_MODIFICATION.label,
  );

  // 고객 계약 정보 조회
  const { data: customerContractData } = useCustomerContractQuery(selectedCustomerId, {
    enabled: isServiceModificationTabActive && !!selectedCustomerId,
  });

  useEffect(() => {
    if (
      !customerContractData ||
      !isServiceModificationTabActive ||
      selectedCustomerId !== customerId
    )
      return;

    // 계약번호가 없고 기존 계약 목록 확인
    // 새로 탭이 생긴 경우가 아닌 기존에 조회한 데이터 있으면 기존 데이터 활용
    const selectedContractId = getSelectedContractId(customerId);
    const alreadyContracts = getCustomerContracts(customerId);
    if (selectedContractId && alreadyContracts.length > 0) return;

    const contracts = customerContractData.contracts;
    const transformedContracts = contracts.map(transformContractToStoreFormat);

    // 전화번호로 조회한 고객이면 조회한 고객 store에 contractId 존재
    if (isCustomer && selectedCustomer?.serviceContractId) {
      setSelectedContractId(selectedCustomerId, selectedCustomer.serviceContractId);
      setCustomerContracts(selectedCustomerId, transformedContracts);
      return;
    }

    if (contracts.length === 1) {
      // 서비스 번호가 1개인 경우: 선택된 계약 ID를 설정하고 계약을 저장
      const contract = contracts[0];
      setSelectedContractId(selectedCustomerId, contract.contractId);
      setCustomerContracts(selectedCustomerId, transformedContracts);
    } else if (contracts.length > 1) {
      // 서비스 번호가 2개 이상인 경우: 변환된 계약 목록을 저장
      setCustomerContracts(selectedCustomerId, transformedContracts);
      // 선택된 서비스 번호가 없으면 오픈
      if (!selectedContractId) {
        setIsServiceListOpen(true);
      }
    } else if (contracts.length === 0) {
      // 계약이 없는 경우
      setShowNoContractDialog(true);
    }
  }, [customerContractData, customerId]);

  const handleContextMenu = (event: React.MouseEvent, data: UnmaskingData) => {
    event.preventDefault();
    if (isUnmaskable) {
      setUnmaskingData(data);
      setIsUnmaskPopupOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setShowNoContractDialog(false);
    // Dialog가 닫힐 때 focus를 body로 이동
    document.body.focus();
  };

  const updateMaskingValue = (unmaskedItem: string, param: MaskedTarget) => {
    if (customerContract) {
      setCustomerContract(selectedCustomerId, {
        ...customerContract,
        phoneNumber:
          param.maskingType === 'phoneNumber' ? unmaskedItem : customerContract.phoneNumber,
        imei: param.maskingType === 'imei' ? unmaskedItem : customerContract.imei,
      });
    }
  };

  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  const handleBlocked = useCallback(() => {
    setShowChangeBlockedDialog(true);
  }, []);

  // 커스텀 훅 호출
  useCheckModifiable(
    selectedCustomerId,
    selectedContractId,
    isServiceModificationTabActive,
    handleBlocked,
  );

  return (
    <>
      <ContractServiceDialog
        open={showNoContractDialog}
        title='상품 변경 불가 알림'
        content='사용중인 회선이 없으므로, 상품변경이 불가합니다.'
        onClose={handleCloseDialog}
        data-testid='service-search-no-contract-dialog'
      />
      <ContractServiceDialog
        open={showChangeBlockedDialog}
        title='요금제변경 불가 알림'
        content={
          '요금제 변경은 월 1회만 가능합니다. \n 현재 당월에는 변경이 불가능하니, 다음 달에 다시 시도해 주세요.'
        }
        onClose={() => setShowChangeBlockedDialog(false)}
      />

      <Typography variant='h3' sx={{ mr: 2, fontWeight: 700, fontSize: '1.1rem' }}>
        회선정보
      </Typography>
      <LineInfoDetailsContainer>
        <Box display='flex' alignItems='center' sx={{ minWidth: '200px', flexGrow: 0 }}>
          <ServiceLabel sx={{ mr: 1 }}>전화번호</ServiceLabel>
          {customerContract?.maskingPhoneNumber && (
            <div
              onContextMenu={(e) =>
                handleContextMenu(e, {
                  itemTypeCode: MASKING_ITEM_CODE.CUSTOMER_PHONENUMBER,
                  encryptedItem: customerContract.encryptedPhoneNumber,
                  maskingType: 'phoneNumber',
                })
              }
              style={{ cursor: isUnmaskable ? 'pointer' : 'default' }}
            >
              <Typography data-testid='line-information-phone-number'>
                {customerContract?.phoneNumber
                  ? customerContract?.phoneNumber
                  : customerContract?.maskingPhoneNumber}
              </Typography>
            </div>
          )}
          <Button
            size='small'
            variant='outlined'
            color='grey'
            disabled={getCustomerContracts(selectedCustomerId).length < 2}
            sx={{ ml: 1, minWidth: 'auto', height: 22, px: 1, fontSize: '0.75rem' }}
            onClick={() => setIsServiceListOpen(true)}
            data-testid='line-information-phone-number-select-button'
          >
            번호 선택
          </Button>
        </Box>
        <Box display='flex' alignItems='center' sx={{ minWidth: '180px', flexGrow: 0 }}>
          <ServiceLabel sx={{ mr: 1 }}>요금제</ServiceLabel>
          {customerContract?.serviceName && (
            <ServiceValue>{customerContract?.serviceName}</ServiceValue>
          )}
        </Box>
        <Box display='flex' alignItems='center' sx={{ minWidth: '160px', flexGrow: 0 }}>
          <ServiceLabel sx={{ mr: 1 }}>기기정보</ServiceLabel>
          {customerContract?.deviceModelNameAlias && (
            <ServiceValue>{customerContract?.deviceModelNameAlias}</ServiceValue>
          )}
          {customerContract?.maskingImei && <ServiceValue sx={{ ml: 1, mr: 1 }}>/</ServiceValue>}

          {customerContract?.maskingImei && (
            <div
              onContextMenu={(e) =>
                handleContextMenu(e, {
                  itemTypeCode: MASKING_ITEM_CODE.CUSTOMER_PASSPORTNUMBER,
                  encryptedItem: customerContract.encryptedImei,
                  maskingType: 'imei',
                })
              }
              style={{ cursor: isUnmaskable ? 'pointer' : 'default' }}
            >
              <ServiceValue>
                {customerContract?.imei ? customerContract?.imei : '고객정보보호'}
              </ServiceValue>
            </div>
          )}
        </Box>
      </LineInfoDetailsContainer>

      <ContractServiceList
        open={isServiceListOpen}
        onClose={() => setIsServiceListOpen(false)}
        contracts={customerContractData?.contracts || []}
      />

      {isUnmaskPopupOpen && customerContract && unmaskingData && (
        <Unmasking
          onClose={() => {
            setIsUnmaskPopupOpen(false);
            setUnmaskingData(null);
          }}
          onUnmask={updateMaskingValue}
          requestData={{
            itemTypeCode: unmaskingData.itemTypeCode,
            encryptedItem: unmaskingData.encryptedItem,
            param: {
              maskingType: unmaskingData.maskingType,
            },
          }}
          data-testid='service-search-unmasking-popup'
        />
      )}
    </>
  );
};

export default LineInformation;

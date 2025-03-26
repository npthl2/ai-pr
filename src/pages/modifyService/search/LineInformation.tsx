import Button from '@components/Button';
import { Box, Typography } from '@mui/material';
import { LineInfoDetailsContainer, ServiceLabel, ServiceValue } from './LineInformation.styled';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import { useEffect, useState } from 'react';
import ContractServiceList from './ContractServiceList';
import { useCustomerContractQuery } from '@api/queries/contract/useCustomerContractQuery';
import { ROLE_UNMASKING, MASKING_ITEM_CODE, TabInfo } from '@constants/CommonConstant';
import Dialog from '@components/Dialog';
import { CustomerContract } from '@model/Contract';
import Unmasking from '@pages/unmasking/Unmasking';
import useMemberStore from '@stores/MemberStore';

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
});

const LineInformation = () => {
  const [isServiceListOpen, setIsServiceListOpen] = useState(false);
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const [showNoContractDialog, setShowNoContractDialog] = useState(false);
  const [isUnmaskPopupOpen, setIsUnmaskPopupOpen] = useState(false);
  const [unmaskingData, setUnmaskingData] = useState<UnmaskingData | null>(null);

  const memberInfo = useMemberStore((state) => state.memberInfo);
  const isUnmaskable = memberInfo?.authorities.includes(ROLE_UNMASKING);

  const { setCustomerContract, setCustomerContracts, setSelectedContractId } =
    useCurrentServiceStore();
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
  const { data: customerContractdata } = useCustomerContractQuery(selectedCustomerId, {
    enabled: isServiceModificationTabActive && !!selectedCustomerId,
  });

  useEffect(() => {
    if (!customerContractdata || !isServiceModificationTabActive) return;

    const contracts = customerContractdata.contracts;

    if (contracts.length === 1) {
      const contract = contracts[0];
      setSelectedContractId(selectedCustomerId, contract.contractId);
      setCustomerContracts(selectedCustomerId, [transformContractToStoreFormat(contract)]);
    } else if (contracts.length > 1) {
      const transformedContracts = contracts.map(transformContractToStoreFormat);
      setCustomerContracts(selectedCustomerId, transformedContracts);
      setIsServiceListOpen(true);
    } else if (contracts.length === 0) {
      setShowNoContractDialog(true);
    }
  }, [customerContractdata]);

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

  return (
    <>
      <Dialog
        open={showNoContractDialog}
        closeLabel='확인'
        title='상품 변경 불가 알림'
        content='사용중인 회선이 없으므로, 상품변경이 불가합니다.'
        onClose={handleCloseDialog}
        size='small'
        disableRestoreFocus
        sx={{
          '& .MuiDialog-paper': {
            height: '169px',
            width: '400px',
          },
          '& [data-testid="component-dialog-close-button"]': {
            backgroundColor: 'primary.main',
            borderColor: 'primary.main',
            '& .MuiTypography-root': {
              color: 'primary.contrastText',
            },
          },
        }}
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
              <Typography>
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
            sx={{ ml: 1, minWidth: 'auto', height: 22, px: 1, fontSize: '0.75rem' }}
            onClick={() => setIsServiceListOpen(true)}
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
                {customerContract?.imei ? customerContract?.imei : customerContract?.maskingImei}
              </ServiceValue>
            </div>
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
              <ServiceValue>고객정보보호</ServiceValue>
            </div>
          )}
        </Box>
      </LineInfoDetailsContainer>

      <ContractServiceList
        open={isServiceListOpen}
        onClose={() => setIsServiceListOpen(false)}
        contracts={customerContractdata?.contracts || []}
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

import { LobTreeItem } from './LobTreeItem';
import StyledTreeView from './StyledTreeView';
import { Box, Typography } from '@mui/material';
import { customerContractsTreeData } from '@api/queries/customerDetail/useCustomerDetail';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { CONTRACT_STATUS_CODE_CANCEL } from '@pages/customerDetail/CustomerDetailConstant';

interface TreeComponentProps {
  customerId: string;
  selectedContractId: string | null;
  includeCancelled: boolean;
  filteredContractId: string | null;
  onPhoneSelect: (contractId: string) => void;
}

const Tree = ({
  customerId,
  selectedContractId,
  includeCancelled,
  filteredContractId,
  onPhoneSelect,
}: TreeComponentProps) => {
  // 계약 트리 데이터 로드 및 필터링
  const treeData = customerContractsTreeData(customerId);
  const data = treeData
    ?.map((item) => ({
      ...item,
      children:
        filteredContractId === ''
          ? [] // 빈 배열로 설정하여 children을 제거
          : filteredContractId
            ? item.children?.filter((child) => filteredContractId === child.contractId)
            : item.children,
    }))
    .map((item) => ({
      ...item,
      children: item.children?.filter(
        (child) => includeCancelled || child.status !== CONTRACT_STATUS_CODE_CANCEL,
      ), // 해당하지 않는 child를 제외
    }))
    .filter((item) => item.children?.length > 0);
  data?.push(...makeDummyData());
  // 계약 총 개수 계산
  const countractCount = data?.reduce((acc, item) => acc + item.children?.length, 0);

  // 트리 확장 관리
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isInitialExpansionDone = useRef<boolean>(false);

  // 초기 트리 확장 처리
  useEffect(() => {
    console.debug('[Tree]initial useEffect', selectedContractId);
    const shouldInitializeExpansion =
      selectedContractId && !isInitialExpansionDone.current && expandedItems.length === 0;

    if (shouldInitializeExpansion) {
      setExpandedItems(['Mobile', selectedContractId]);
      isInitialExpansionDone.current = true;
    }
  }, [selectedContractId, expandedItems]);
  const handleExpandedItems = (scid: string) => {
    const shouldCollapse =
      expandedItems.includes(scid) && (scid === 'Mobile' || selectedContractId === scid);
    setExpandedItems(
      shouldCollapse ? expandedItems.filter((item) => item !== scid) : [...expandedItems, scid],
    );
  };

  // Filter 트리 확장 처리
  useEffect(() => {
    console.debug('[Tree]filter useEffect', filteredContractId);
    if (filteredContractId) {
      handleExpandedItemsForFilter(filteredContractId);
    }
  }, [filteredContractId]);
  const handleExpandedItemsForFilter = (scid: string) => {
    setExpandedItems(['Mobile', scid]);
  };

  return (
    <div style={{ border: '1px solid #D1D6DA', borderRadius: '4px' }}>
      <Box
        sx={{
          paddingTop: '8px',
          paddingRight: '24px',
          paddingBottom: '8px',
          paddingLeft: '24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {filteredContractId !== '' && (
          <Typography variant='body1'>전체 - {countractCount}</Typography>
        )}
      </Box>
      <StyledTreeView
        selectedItems={selectedContractId ? [selectedContractId] : []}
        expandedItems={expandedItems ? expandedItems : []}
        data-testid='tree'
      >
        {filteredContractId !== '' ? (
          data?.map((item) => (
            <LobTreeItem
              key={item.id}
              item={item}
              onPhoneSelect={(s) => {
                onPhoneSelect(s);
                handleExpandedItems(s);
              }}
              onLobSelect={(s) => {
                handleExpandedItems(s);
              }}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '550px', // 최소 높이 설정 (조절 가능)
            }}
          >
            <Typography sx={{ textAlign: 'center', padding: 2, color: 'gray' }}>
              조회 결과가 없습니다.
              <br />
              전화번호를 다시 확인한 후 입력해 주세요.
            </Typography>
          </Box>
        )}
      </StyledTreeView>
    </div>
  );
};

// IPTV, SOIP, PSTN 더미 데이터 추가
const makeDummyData = () => {
  return [
    {
      id: 'Internet',
      lobType: 'Internet',
      children: [],
    },
    {
      id: 'IP TV',
      lobType: 'IP TV',
      children: [],
    },
    {
      id: 'SOIP',
      lobType: 'SOIP',
      children: [],
    },
    {
      id: 'PSTN',
      lobType: 'PSTN',
      children: [],
    },
  ];
};

export default Tree;

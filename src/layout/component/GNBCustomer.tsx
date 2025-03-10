import { useState } from 'react';
import { Typography } from '@mui/material';
import { Navigation, UserSection } from './GNBCustomer.styled';
import Button from '@components/Button';
import useAuthStore from '@stores/AuthStore';
import { useHistoryPanelStore } from '@stores/HistoryPanelStore';
import useCustomerStore from '@stores/CustomerStore';
import { ROLE_UNMASKING } from '@constants/CommonConstant';
import Unmasking from '@pages/unmasking/Unmasking';
import unmaskingService from '@api/services/unmaskingService';
import { format } from 'date-fns';
import { Customer } from '@model/Customer';

interface GNBCustomerProps {
  name: string; // 이름
  rrno: string; // 주민번호
  gender: string; // 성별
  age: number; // 나이
}

const GNBCustomer = ({ name, rrno, gender, age }: GNBCustomerProps) => {
  const [unmasking, setUnmasking] = useState<boolean>(false);
  const toggleOpen = useHistoryPanelStore((state) => state.toggleOpen);

  const { updateCustomer } = useCustomerStore();

  const memberInfo = useAuthStore((state) => state.memberInfo);
  const selectedCustomer = useCustomerStore((state) =>
    state.customers.find((c) => c.id === state.selectedCustomerId),
  ) as Customer;

  const openUnmasking = () => {
    setUnmasking(true);
  };

  const onClose = () => {
    setUnmasking(false);
  };

  const onUnmask = async (unmaskedItem: string, param: object , reason: string ) => {
    // 마스킹은 한번에 하나만 마스킹 된다고 정의되어 있는데, GNB에서는 한번에 2개가 다 마스킹 해제되어야해서 한번 더 호출함.
    // 추후 여러 건을 한번에 호출해서 마스킹해제하는 API 및 함수 필요
    const response = await unmaskingService.unmasking({
      encryptedItem: selectedCustomer?.encryptedRrno || '',
      itemTypeCode: 'CUSTOMER_RRNO',
      requestUnmaskingDatetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      requestMemberId: memberInfo?.memberId || '',
      requestMemberConnectedIp: '10.231.58.61', // common 에서 X-Authorization-Id 사용하는 걸로 변경 예정.. 나중에.....
      customerId: selectedCustomer?.id || '',
      requestUnmaskingReason: reason,
    });

    if (response?.data && typeof response.data === 'object' && 'unmaskedItem' in response.data) {
      updateCustomer(selectedCustomer?.id || '', {
        unmaskingRrno: response.data.unmaskedItem,
        unmaskingName: unmaskedItem,
      });
    } else {
      //throw new Error('마스킹 해제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <UserSection data-testid='gnb-customer-area'>
        <Typography variant='h1' data-testid='gnb-customer-name'>
          {selectedCustomer?.unmaskingName ? selectedCustomer?.unmaskingName : name}
        </Typography>
        <Typography variant='caption' color='textSecondary' data-testid='gnb-customer-rrno'>
          주민번호 {selectedCustomer?.unmaskingRrno ? selectedCustomer?.unmaskingRrno : rrno}
        </Typography>
        <Typography variant='caption' color='textSecondary' data-testid='gnb-customer-age'>
          (만 {age}세)
        </Typography>
        <Typography variant='caption' color='textSecondary' data-testid='gnb-customer-gender'>
          {gender}
        </Typography>
      </UserSection>

      <Navigation>
        {memberInfo?.authorities.includes(ROLE_UNMASKING) && (
          <Button
            variant='outlined'
            size='small'
            color='grey'
            onClick={openUnmasking}
            data-testid='gnb-unmasking-button'
          >
            마스킹 해제
          </Button>
        )}
        <Button
          data-testid='memoOpenButton'
          variant='outlined'
          size='small'
          color='grey'
          onClick={toggleOpen}
        >
          메모 및 발송이력
        </Button>
      </Navigation>

      {unmasking && (
        <Unmasking
          onUnmask={onUnmask}
          onClose={onClose}
          requestData={{
            encryptedItem: selectedCustomer?.encryptedName || '',
            itemTypeCode: 'CUSTOMER_NAME',
          }}
        />
      )}
    </>
  );
};

export default GNBCustomer;

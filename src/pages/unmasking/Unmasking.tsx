// pages/unmasking/Unmasking.tsx
import { useState, useEffect, useRef } from 'react';
import Dialog from '@components/Dialog';
import TextField from '@components/TextField'; // 커스텀 TextField 컴포넌트 임포트
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnmaskingRequestDto, UnmaskingProps } from '@model/Unmasking';
import unmaskingService from '@api/services/unmaskingService';
import useCustomerStore from '@stores/CustomerStore';
import useMemberStore from '@stores/MemberStore';
import { format } from 'date-fns';

const CharCount = styled(Typography)({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  fontSize: '12px',
});

const Unmasking = <T,>({ onClose, onUnmask, requestData }: UnmaskingProps<T>) => {
  const [reason, setReason] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const inputTextRef = useRef<HTMLTextAreaElement>(null); // multi line 일 경우
  // const inputTextRef = useRef<HTMLInputElement>(null); // single line 일 경우

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputTextRef.current) {
        inputTextRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  const handleReasonChange = (value: string) => {
    if (value.length <= 50) {
      setReason(value);
      setIsButtonEnabled(value.trim().length > 0);
    }
  };

  const handleUnmask = async () => {
    const selectedCustomerId = useCustomerStore.getState().selectedCustomerId;
    const memberId = useMemberStore.getState().memberInfo?.memberId;

    if (!selectedCustomerId || !memberId) {
      console.error('고객 ID 또는 회원 ID가 없습니다.');
      return;
    }
    // console.log(requestData);

    const unmaskingRequestDto: UnmaskingRequestDto = {
      requestUnmaskingReason: reason, // key in 사유
      requestUnmaskingDatetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      requestMemberId: memberId, // MemberStore에서 memberId -> common 에서 X-Authorization-Id 사용하는 걸로 변경 예정.. 나중에.....
      requestMemberConnectedIp: '10.231.58.61', // common 에서 X-Authorization-Id 사용하는 걸로 변경 예정.. 나중에.....
      customerId: selectedCustomerId, // CustomerStore에서 selectedCustomerId
      itemTypeCode: requestData.itemTypeCode,
      encryptedItem: requestData.encryptedItem,
    };

    try {
      const response = await unmaskingService
        .unmasking(unmaskingRequestDto)
        .then((response) => response.data);

      if (response && typeof response === 'object' && 'unmaskedItem' in response) {
        onUnmask(response.unmaskedItem, requestData.param as T, reason);
        onClose();
      } else {
        throw new Error('마스킹 해제 중 오류가 발생했습니다.');
      }
    } catch (error: unknown) {
      console.error('마스킹 해제 중 오류가 발생했습니다.', error);
    }
  };

  const customContent = (
    <div style={{ position: 'relative' }}>
      <Typography variant='body1' sx={{ mb: 2, lineHeight: 1.2 }}>
        마스킹을 해제하시겠습니까?
        <br />
        마스킹 해제 사유를 입력해주세요. (최대 50자 입력 가능)
      </Typography>
      <TextField
        inputRef={inputTextRef}
        value={reason}
        onChange={handleReasonChange}
        state={reason.length > 50 ? 'error' : 'inactive'}
        size='medium'
        multiline
        rows={2}
        autoFocus
        suffix={
          <CharCount variant='caption' color='textSecondary'>
            {reason.length}/50
          </CharCount>
        }
        // inputProps={{ maxLength: 50 }}
      />
    </div>
  );

  return (
    <Dialog
      open={true}
      size='small'
      title='마스킹 해제'
      content={customContent}
      closeLabel='취소'
      confirmLabel='마스킹 해제'
      onClose={onClose}
      onConfirm={handleUnmask}
      isConfirmDisabled={!isButtonEnabled}
    />
  );
};

export default Unmasking;

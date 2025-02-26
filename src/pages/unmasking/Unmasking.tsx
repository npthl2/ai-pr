// pages/unmasking/Unmasking.tsx
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@components/Dialog';
import TextField from '@components/TextField';  // 커스텀 TextField 컴포넌트 임포트
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnmaskingRequestDto, UnmaskingResponseDto, UnmaskingProps } from '@model/Unmasking';
import unmaskingService from '@api/services/unmaskingService';
import useCustomerStore from '@stores/CustomerStore';
import useMemberStore from '@stores/Member';

const CharCount = styled(Typography)({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  fontSize: '12px',
});

const Unmasking: React.FC<UnmaskingProps> = ({ onClose, onUnmask, requestData }) => {
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
  /*
  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.focus();
    }
  }, []);
  TextField의 포커스가 작동하지 않는 문제는 Dialog가 열린 후에 포커스를 설정해야 하기 때문일 수 있습니다. useEffect에 약간의 지연을 추가해보겠습니다:
  setTimeout을 사용하여 Dialog가 완전히 렌더링된 후에 포커스를 설정합니다.
cleanup 함수를 추가하여 컴포넌트가 언마운트될 때 타이머를 정리합니다.
기존의 autoFocus 속성은 유지합니다.
이렇게 하면 Dialog가 열린 후 TextField에 자동으로 포커스가 될 것입니다.
  */

  const handleReasonChange = (value: string) => {
    if (value.length <= 50) {
      setReason(value);
      setIsButtonEnabled(value.trim().length > 0);
    }
  };

  const handleUnmask = async () => {
    const selectedCustomerId = useCustomerStore.getState().selectedCustomerId;
    const memberId = useMemberStore.getState().memberId;

    if (!selectedCustomerId || !memberId) {
      console.error('고객 ID 또는 회원 ID가 없습니다.');
      return;
    }

    const unmaskingRequestDto: UnmaskingRequestDto = {
      ...requestData,
      requestUnmaskingReason: reason, // key in 사유
      requestUnmaskingDatetime: new Date().toISOString(),//'2025-02-26 10:00:00', // 요청일시
      requestMemberId: memberId, // 로그인 ID -> kyle 님이 로그인 사용자 정보 저장한거를 꺼내오면 됨
      requestMemberConnectedIp: '10.231.58.61',// 이건 시간되면 local ip 가져와서 채우는 거 넣어보자
      customerId: selectedCustomerId, // 고객검색하면 현재 선택된 고객의 ID. CustomerStore에서 selectedCustomerId를 꺼내오면 됨
    };

    try {
      const response: UnmaskingResponseDto = await unmaskingService.unmasking(unmaskingRequestDto).then(response => response.data);
      
      console.log(response.unmaskedItem) ;
      onUnmask(response.unmaskedItem);
      onClose();
    } catch (error: unknown) {
      console.error('마스킹 해제 중 오류가 발생했습니다.', error);
    }
  };

  const customContent = (
    <div style={{ position: 'relative' }}>
      <Typography variant='body1' sx={{ mb: 2, lineHeight: 1.2 }}>
        마스킹을 해제하시겠습니까?<br/>
        마스킹 해제 사유를 입력해주세요. (최대 50자 입력 가능)
      </Typography>
      <TextField
        inputRef={inputTextRef}
        value={reason}
        onChange={handleReasonChange}
        state={reason.length > 50 ? 'error' : 'inactive'}
        size="medium"
        multiline
        rows={2}
        autoFocus
        suffix={
          <CharCount variant="caption" color="textSecondary">
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
      size="small"
      title="마스킹 해제"
      content={customContent}
      closeLabel="취소"
      confirmLabel="마스킹 해제"
      onClose={onClose}
      onConfirm={handleUnmask}
      isConfirmDisabled={!isButtonEnabled}
    />
  );
};

export default Unmasking;
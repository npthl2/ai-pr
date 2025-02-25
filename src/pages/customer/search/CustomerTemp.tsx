import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import CustomerSearch from './CustomerSearch'; // 기존 고객 검색 컴포넌트
import { ModalContainer } from './CustomerSearch.styled';

export default function CustomerTemp() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* 고객 검색 오버레이를 여는 버튼 */}
      <Button variant='contained' onClick={handleOpen}>
        고객 검색 열기
      </Button>

      {/* Modal을 통해 오버레이로 고객 검색 창 표시 */}
      {/* Modal: 현재 화면 위에 오버레이로 표시 */}
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'transparent' },
          },
        }}
      >
        <ModalContainer>
          <CustomerSearch />
        </ModalContainer>
      </Modal>
    </>
  );
}

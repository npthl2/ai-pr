import React, { useState, useEffect } from 'react';
import { DialogContent, Radio, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Table, TableHead, TableBody } from '@mui/material';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledTableContainer,
  StyledDialogActions,
  SelectButton,
  CancelButton,
} from './PhoneNumberSelectModal.style';

interface PhoneNumber {
  id: number;
  status: string;
  phoneNumber: string;
  provider: string;
  expirationDate: string;
}

interface PhoneNumberSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (phoneNumber: PhoneNumber) => void;
  lastFourDigits?: string;
}

const PhoneNumberSelectModal: React.FC<PhoneNumberSelectModalProps> = ({
  open,
  onClose,
  onSelect,
  lastFourDigits = '',
}) => {
  // 샘플 데이터
  const phoneNumbers: PhoneNumber[] = [
    {
      id: 1,
      status: '선점',
      phoneNumber: '010-6655-4567',
      provider: 'KT',
      expirationDate: '2025-02-20',
    },
    {
      id: 3,
      status: '사용가능',
      phoneNumber: '010-2934-1234',
      provider: 'KT',
      expirationDate: '2025-02-20',
    },
    {
      id: 4,
      status: '사용가능',
      phoneNumber: '010-8797-1234',
      provider: 'KT',
      expirationDate: '2025-02-20',
    },
    {
      id: 5,
      status: '사용가능',
      phoneNumber: '010-0239-1234',
      provider: 'KT',
      expirationDate: '2025-02-20',
    },
  ];

  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<PhoneNumber | null>(null);

  const handleSelect = () => {
    if (selectedPhoneNumber) {
      onSelect(selectedPhoneNumber);
      onClose();
    }
  };

  const handleRadioChange = (phoneNumber: PhoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
  };

  // 테이블 헤더 정의
  const headers = [
    { id: 'radio', label: '', width: '5%' },
    { id: 'status', label: '상태', width: '15%' },
    { id: 'phoneNumber', label: '전화번호', width: '30%' },
    { id: 'provider', label: '번호부여회사', width: '25%' },
    { id: 'expirationDate', label: '상태변경일', width: '25%' },
  ];

  // 예시: 컴포넌트가 마운트될 때 lastFourDigits가 있으면 해당 번호로 검색 초기화
  useEffect(() => {
    if (lastFourDigits && lastFourDigits.length > 0) {
      // 검색 로직 구현 (예: setSearchTerm(lastFourDigits) 등)
    }
  }, [lastFourDigits, open]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <StyledDialogTitle>
        <Typography variant='h6' component='div'>
          전화번호 선택
        </Typography>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' component='div'>
            전화번호 목록 {phoneNumbers.length}
          </Typography>
        </Box>

        <StyledTableContainer>
          {phoneNumbers.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header.id} width={header.width}>
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {phoneNumbers.map((phoneNumber) => (
                  <TableRow
                    key={phoneNumber.id}
                    onClick={() => handleRadioChange(phoneNumber)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor:
                        selectedPhoneNumber?.id === phoneNumber.id
                          ? 'rgba(0, 0, 0, 0.04)'
                          : 'inherit',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                    }}
                  >
                    <TableCell>
                      <Radio
                        checked={selectedPhoneNumber?.id === phoneNumber.id}
                        onChange={() => handleRadioChange(phoneNumber)}
                        value={phoneNumber.id}
                        name='phone-number-radio'
                        icon={
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              border: '1px solid #ccc',
                              borderRadius: '50%',
                            }}
                          />
                        }
                        checkedIcon={
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              backgroundColor: '#000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                              }}
                            />
                          </Box>
                        }
                      />
                    </TableCell>
                    <TableCell>{phoneNumber.status}</TableCell>
                    <TableCell>{phoneNumber.phoneNumber}</TableCell>
                    <TableCell>{phoneNumber.provider}</TableCell>
                    <TableCell>{phoneNumber.expirationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                width: '100%',
              }}
            >
              <Typography variant='body1'>사용가능한 전화번호가 없습니다.</Typography>
            </Box>
          )}
        </StyledTableContainer>
      </DialogContent>

      <StyledDialogActions>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <SelectButton
          onClick={handleSelect}
          disabled={!selectedPhoneNumber}
          startIcon={<CheckIcon />}
        >
          선택
        </SelectButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default PhoneNumberSelectModal;

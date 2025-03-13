import React, { useState, useEffect } from 'react';
import { DialogContent, Radio, IconButton, Typography, Box } from '@mui/material';
import { Table, TableHead, TableBody } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { format } from 'date-fns';

import registrationContractService from '@api/services/registrationContractService';

import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import Button from '@components/Button';

import {
  StyledDialog,
  StyledDialogTitle,
  StyledTableContainer,
  StyledDialogActions,
  RadioIcon,
  CheckedRadioIcon,
} from './PhoneNumberSelectModal.style';

interface PhoneNumber {
  id: number;
  statusCode: string;
  phoneNumber: string;
  phoneNumberProvider: string;
  lastUpdateStatusDatetime: string;
}

interface PhoneNumberSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (phoneNumber: PhoneNumber) => void;
  lastFourDigits?: string;
  customerId: string;
}

const PhoneNumberSelectModal: React.FC<PhoneNumberSelectModalProps> = ({
  open,
  onClose,
  onSelect,
  lastFourDigits,
  customerId,
}) => {
  // 상태관리
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<PhoneNumber | null>(null);

  useEffect(() => {
    if (open) {
      fetchPhoneNumbers(); // 창 열렸을 때 데이터 가져오기
    }
  }, [open]);

  // 이벤트 핸들러
  const handleClose = () => {
    setSelectedPhoneNumber(null);
    onClose();
  };

  const handleSelect = async () => {
    if (selectedPhoneNumber) {
      onSelect(selectedPhoneNumber);
      await claimPhoneNumber(selectedPhoneNumber.phoneNumber);
      handleClose();
    }
  };

  const handleRadioChange = (phoneNumber: PhoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
  };

  // API 호출 함수
  const fetchPhoneNumbers = async () => {
    setPhoneNumbers([]);
    if (lastFourDigits && lastFourDigits.length == 4 && customerId) {
      const response = await registrationContractService.getAvailablePhoneNumber(
        lastFourDigits,
        customerId,
      );
      // UI에 맞는 인터페이스로 전환
      const transformedPhoneNumbers: PhoneNumber[] = response.map((item, index) => ({
        id: index + 1,
        statusCode: item.statusCode,
        phoneNumber: item.phoneNumber,
        phoneNumberProvider: item.phoneNumberProvider,
        lastUpdateStatusDatetime: item.lastUpdateStatusDatetime,
      }));
      setPhoneNumbers(transformedPhoneNumbers);
    }
  };

  const claimPhoneNumber = async (phoneNumber: string) => {
    await registrationContractService.claimAvailablePhoneNumber({
      phoneNumber: phoneNumber.replace(/-/g, ''),
      customerId: customerId,
    });
  };

  return (
    <StyledDialog open={open} onClose={handleClose} data-testid='select-phone-number-modal'>
      <StyledDialogTitle>
        <Typography variant='h6' component='div'>
          전화번호 선택
        </Typography>
        <IconButton onClick={onClose} size='small'>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant='h3' component='div'>
            전화번호 목록
            <Typography variant='h4' component='span' sx={{ color: '#6E7782', ml: 1 }}>
              {phoneNumbers.length}
            </Typography>
          </Typography>
        </Box>

        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow variant='head'>
                <TableCell width='48px'></TableCell>
                <TableCell width='100px'>상태</TableCell>
                <TableCell width='134px'>전화번호</TableCell>
                <TableCell width='110px'>번호부여회사</TableCell>
                <TableCell width='160px'>상태변경일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phoneNumbers.length > 0 ? (
                phoneNumbers.map((phoneNumber, index) => (
                  <TableRow
                    disableEffect={true}
                    key={phoneNumber.id}
                    onClick={() => handleRadioChange(phoneNumber)}
                    data-testid='available-phone-number-list'
                  >
                    <TableCell>
                      <Radio
                        checked={selectedPhoneNumber?.id === phoneNumber.id}
                        onChange={() => handleRadioChange(phoneNumber)}
                        value={phoneNumber.id}
                        data-testid={`phone-number-radio-${index}`}
                        icon={<RadioIcon />}
                        checkedIcon={
                          <CheckedRadioIcon>
                            <Box />
                          </CheckedRadioIcon>
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{phoneNumber.statusCode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{phoneNumber.phoneNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{phoneNumber.phoneNumberProvider}</Typography>
                    </TableCell>
                    <TableCell>
                      {format(phoneNumber.lastUpdateStatusDatetime, 'yyyy-MM-dd')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 3 }}>
                    <Typography variant='body1'>사용 가능한 전화번호가 없습니다</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DialogContent>

      <StyledDialogActions>
        <Button onClick={handleClose} variant='outlined' color='grey' size='small'>
          취소
        </Button>
        <Button
          onClick={handleSelect}
          disabled={!selectedPhoneNumber}
          variant='contained'
          iconComponent={<CheckIcon />}
          iconPosition='left'
          size='small'
          data-testid='confirm-available-phone-number-button'
        >
          선택
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default PhoneNumberSelectModal;

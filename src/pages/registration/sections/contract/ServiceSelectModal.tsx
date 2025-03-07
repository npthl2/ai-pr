import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from './ServiceSelectModal.styles';

interface FeeItem {
  id: string;
  name: string;
  amount: number;
  additionalInfo?: string;
}

interface ServiceSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedFee: FeeItem) => void;
}

const ServiceSelectModal: React.FC<ServiceSelectModalProps> = ({ open, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const [feeList, setFeeList] = useState<FeeItem[]>([
    {
      id: '1',
      name: '넷플릭스 초이스 스페셜',
      amount: 100000,
    },
    {
      id: '2',
      name: '넷플릭스 초이스 일반',
      amount: 50000,
    },
    // 필요시 더 많은 요금제 추가
  ]);
  const [filteredFeeList, setFilteredFeeList] = useState<FeeItem[]>(feeList);

  useEffect(() => {
    setFilteredFeeList(feeList);
  }, [feeList]);

  const handleSearch = () => {
    if (searchText) {
      setFilteredFeeList(
        feeList.filter((fee) => fee.name.toLowerCase().includes(searchText.toLowerCase())),
      );
    } else {
      setFilteredFeeList(feeList);
    }
  };

  const handleSelect = () => {
    if (selectedFee) {
      onSelect(selectedFee);
      onClose();
    }
  };

  const handleServiceSelect = (service: FeeItem) => {
    onSelect(service);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='fee-select-modal-title'>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.modalHeader}>
          <Typography id='fee-select-modal-title' variant='h6' component='h2'>
            요금제 선택
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={styles.searchContainer}>
          <Typography sx={styles.searchLabel}>요금제명</Typography>
          <TextField
            placeholder='넷플릭스'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size='small'
            sx={styles.searchInput}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                e.preventDefault();
              }
            }}
          />
          <Button
            variant='contained'
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={styles.searchButton}
          >
            조회
          </Button>
        </Box>

        <Box sx={styles.tableContainer}>
          <Typography sx={styles.tableTitle}>요금제 목록 {filteredFeeList.length}</Typography>
          <TableContainer component={Paper} sx={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeaderCell} width='50px'></TableCell>
                  <TableCell sx={styles.tableHeaderCell}>요금제명</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>요금 (원)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFeeList.length > 0 ? (
                  filteredFeeList.map((fee) => (
                    <TableRow key={fee.id} sx={styles.tableRow}>
                      <TableCell>
                        <Radio
                          checked={selectedFee?.id === fee.id}
                          onChange={() => setSelectedFee(fee)}
                          size='small'
                        />
                      </TableCell>
                      <TableCell>{fee.name}</TableCell>
                      <TableCell>{fee.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align='center' sx={{ py: 3 }}>
                      <Typography variant='body1'>표시할 데이터가 없습니다</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={styles.modalFooter}>
          <Button onClick={onClose} sx={styles.cancelButton}>
            취소
          </Button>
          <Button
            variant='contained'
            onClick={handleSelect}
            disabled={!selectedFee}
            sx={styles.selectButton}
          >
            선택
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServiceSelectModal;

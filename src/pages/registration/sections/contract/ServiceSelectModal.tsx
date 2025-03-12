import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Modal, Box, TextField, Paper, Radio, Typography, IconButton } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import Button from '@components/Button';
import { styles } from './ServiceSelectModal.styles';
import { useServicesQuery } from '@api/queries/registration/useRegistrationContractQuery';

interface PlanItem {
  id: string;
  name: string;
  amount: number;
  additionalInfo?: string;
}

interface ServiceSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedFee: PlanItem) => void;
}

const ServiceSelectModal: React.FC<ServiceSelectModalProps> = ({ open, onClose, onSelect }) => {
  // 상태관리
  const [searchText, setSearchText] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const { data } = useServicesQuery();
  const planList = useMemo(() => {
    console.log('memo!!!!!!!!!!!!memo', data);
    return (
      data?.map((plan) => ({
        id: plan.serviceId,
        name: plan.serviceName,
        amount: plan.serviceValue,
      })) ?? []
    );
  }, [data]);
  const [filteredPlanList, setFilteredPlanList] = useState<PlanItem[]>(planList);

  useEffect(() => {
    console.log('planList!!!!!!!!!!!!planList', planList);
    setFilteredPlanList(planList);
  }, [planList]);

  // 이벤트 핸들러
  const handleSearch = () => {
    if (searchText) {
      setFilteredPlanList(
        planList.filter((plan) => plan.name.toLowerCase().includes(searchText.toLowerCase())),
      );
    } else {
      setFilteredPlanList(planList);
    }
  };

  const handleSelect = () => {
    if (selectedPlan) {
      onSelect(selectedPlan);
      onClose();
    }
  };

  const handleServiceSelect = (service: PlanItem) => {
    onSelect(service);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.modalHeader}>
          <Typography variant='h6' component='h2'>
            요금제 선택
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={styles.searchContainer}>
          <Box
            sx={{
              width: '419px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Typography sx={{ minWidth: '60px' }}>요금제명</Typography>
            <TextField
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
          </Box>
          <Button
            onClick={handleSearch}
            variant='contained'
            iconComponent={<SearchIcon />}
            iconPosition='left'
            size='small'
          >
            조회
          </Button>
        </Box>

        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant='h3' component='div'>
              요금제 목록
              <Typography variant='h4' component='span' sx={{ color: '#6E7782' }}>
                {filteredPlanList.length}
              </Typography>
            </Typography>
          </Box>
          <Box sx={styles.tableContainer}>
            <TableContainer component={Paper} sx={styles.table}>
              <Table>
                <TableHead>
                  <TableRow variant='head'>
                    <TableCell sx={styles.tableHeaderCell} width='48px'></TableCell>
                    <TableCell sx={styles.tableHeaderCell} width='250px'>
                      <Typography>요금제명</Typography>
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell} width='254px'>
                      <Typography>요금 (원)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPlanList.length > 0 ? (
                    filteredPlanList.map((plan) => (
                      <TableRow key={plan.id} sx={styles.tableRow}>
                        <TableCell>
                          <Radio
                            checked={selectedPlan?.id === plan.id}
                            onChange={() => setSelectedPlan(plan)}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>{plan.name}</TableCell>
                        <TableCell>{plan.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align='center' sx={{ py: 3 }} hideborder={true}>
                        <Typography variant='body1'>표시할 데이터가 없습니다</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box sx={styles.modalFooter}>
          <Button onClick={onClose} sx={styles.cancelButton}>
            취소
          </Button>
          <Button
            variant='contained'
            onClick={handleSelect}
            disabled={!selectedPlan}
            iconComponent={<CheckIcon />}
            iconPosition='left'
            size='small'
          >
            선택
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServiceSelectModal;

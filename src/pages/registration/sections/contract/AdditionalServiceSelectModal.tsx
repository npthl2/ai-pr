import React, { useState, useEffect, useMemo } from 'react';

import { Modal, Box, TextField, Paper, Checkbox, Typography, IconButton } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import Button from '@components/Button';
import { Chip } from '@components/Chip';
import Alert from '@components/Alert';
import registrationContractService from '@api/services/registrationContractService';
import { useAdditionalServicesQuery } from '@api/queries/registration/useRegistrationContractQuery';
import { styles } from './ServiceSelectModal.styles';

interface AdditionalService {
  serviceValueType: string;
  serviceName: string;
  serviceValue: number;
  serviceId: string;
  exclusiveServiceIds: string[];
}

interface AdditionalServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedServices: AdditionalService[]) => void;
  selectedServiceId: string;
  initialSelectedAdditionalServices?: AdditionalService[];
}

const AdditionalServiceSelectModal: React.FC<AdditionalServiceModalProps> = ({
  open,
  onClose,
  onSelect: onComplete,
  selectedServiceId: selectedServiceId,
  initialSelectedAdditionalServices: initialAdditionalSelectedServices = [],
}) => {
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<AdditionalService[]>(
    initialAdditionalSelectedServices,
  );
  const [filterText, setFilterText] = useState<string>('');
  const [unselectableAdditionalService, setUnselectableAdditionalService] =
    useState<AdditionalService | null>(null);

  const { data } = useAdditionalServicesQuery();
  const services = useMemo(() => {
    return (
      data?.map((additionalService) => ({
        serviceId: additionalService.serviceId,
        serviceName: additionalService.serviceName,
        serviceValue: additionalService.serviceValue,
        serviceValueType: additionalService.serviceValueType,
        exclusiveServiceIds: additionalService.exclusiveServiceIds,
      })) ?? []
    );
  }, [data]);

  const [filteredServices, setFilteredServices] = useState<AdditionalService[]>(services);

  useEffect(() => {
    setSelectedAdditionalServices([...initialAdditionalSelectedServices]);
  }, [initialAdditionalSelectedServices]);

  useEffect(() => {
    if (open) {
      setFilteredServices(services);
      setFilterText('');
    }
  }, [open]);

  // API 호출 함수
  const checkExclusiveService = async (serviceId: string, additionalServiceId: string) => {
    const response = await registrationContractService.checkExclusiveService({
      serviceId: serviceId,
      additionalServiceId: additionalServiceId,
    });

    return response.data;
  };

  const handleSelect = async (service: AdditionalService) => {
    console.log('selected additional service', service);
    console.log('selectedServiceId from plans', selectedServiceId);
    const hasConflict = await checkExclusiveService(selectedServiceId, service.serviceId);

    if (hasConflict) {
      setUnselectableAdditionalService(service);
      return;
    }

    setUnselectableAdditionalService(null);

    setSelectedAdditionalServices((prev) => {
      const isAlreadySelected = prev.some((s) => s.serviceId === service.serviceId);

      if (isAlreadySelected) {
        return prev.filter((s) => s.serviceId !== service.serviceId);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleFilter = () => {
    setFilteredServices(services.filter((service) => service.serviceName.includes(filterText)));
  };

  const handleComplete = () => {
    onComplete(selectedAdditionalServices);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} data-testid='additional-service-select-modal'>
      <Box sx={{ ...styles.modalContainer, width: '800px', minHeight: '800px' }}>
        <Box sx={styles.modalHeader}>
          <Typography variant='h6' component='h2'>
            부가서비스 선택
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box>
          <Box sx={{ ...styles.searchContainer, width: '100%' }}>
            <Box
              sx={{
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Typography sx={{ minWidth: '73px' }}>부가서비스명</Typography>
              <TextField
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                size='small'
                sx={styles.searchInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleFilter();
                    e.preventDefault();
                  }
                }}
              />
            </Box>
            <Button
              onClick={handleFilter}
              variant='contained'
              iconComponent={<SearchIcon />}
              iconPosition='left'
              size='small'
            >
              조회
            </Button>
          </Box>
          <Box sx={{ mb: 2, mt: 3 }}>
            <Typography variant='h3' component='div'>
              부가서비스 목록
              <Typography variant='h4' component='span' sx={{ color: '#6E7782', ml: 1 }}>
                {filteredServices.length}
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ ...styles.tableContainer, width: '100%', height: '363px' }}>
            <TableContainer component={Paper} sx={styles.table}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow variant='head'>
                    <TableCell width='48px'></TableCell>
                    <TableCell width='100px'>구분</TableCell>
                    <TableCell width='300px'>부가서비스명</TableCell>
                    <TableCell width='304px'>요금 (원)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, index) => (
                      <TableRow key={service.serviceId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedAdditionalServices.some(
                              (s) => s.serviceId === service.serviceId,
                            )}
                            onChange={() => handleSelect(service)}
                            data-testid={`additional-service-list-checkbox-${index}`}
                          />
                        </TableCell>
                        <TableCell>{service.serviceValueType}</TableCell>
                        <TableCell>{service.serviceName}</TableCell>
                        <TableCell>{service.serviceValue.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align='center' sx={{ py: 5 }} hideborder={true}>
                        <Typography variant='body1' color='text.secondary'>
                          표시할 데이터가 없습니다
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box sx={{ minHeight: '131px' }}>
          {unselectableAdditionalService && (
            <Alert severity='error' sx={{ mt: 2 }} data-testid='additional-service-exclusive-alert'>
              *
              {`${unselectableAdditionalService.serviceName}은(는) 선택이 불가능한 부가서비스 입니다.`}
            </Alert>
          )}
          <Box sx={{ mb: 2, mt: 3 }}>
            <Typography variant='h3' component='div'>
              선택된 부가서비스
              <Typography
                variant='h4'
                component='span'
                sx={{ color: '#6E7782', ml: 1 }}
              ></Typography>
              {selectedAdditionalServices.length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {selectedAdditionalServices.map((service) => (
              <Chip
                color='primary'
                variant='outlined'
                key={service.serviceId}
                label={`${service.serviceName} - ${service.serviceValue.toLocaleString()}원`}
                onDelete={() => handleSelect(service)}
              />
            ))}
          </Box>
        </Box>
        <Box sx={styles.modalFooter}>
          <Button onClick={onClose} sx={styles.cancelButton}>
            취소
          </Button>
          <Button
            variant='contained'
            onClick={handleComplete}
            iconComponent={<CheckIcon />}
            iconPosition='left'
            size='small'
            data-testid='confirm-additional-service-button'
          >
            완료
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdditionalServiceSelectModal;

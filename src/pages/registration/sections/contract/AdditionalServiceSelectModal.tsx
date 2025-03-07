import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AdditionalService {
  serviceValueType: string;
  serviceName: string;
  serviceValue: number;
  serviceId: string;
  selectable: boolean;
}

const services: AdditionalService[] = [
  {
    serviceValueType: '유료',
    serviceName: '부가서비스 1',
    serviceValue: 5000,
    serviceId: 'ABC-123',
    selectable: true,
  },
  {
    serviceValueType: '유료',
    serviceName: '부가서비스 2',
    serviceValue: 1000,
    serviceId: 'ABC-124',
    selectable: true,
  },
  {
    serviceValueType: '유료',
    serviceName: '부가서비스 3',
    serviceValue: 10000,
    serviceId: 'ABC-125',
    selectable: true,
  },
  {
    serviceValueType: '유료',
    serviceName: '부가서비스 4',
    serviceValue: 7000,
    serviceId: 'ABC-126',
    selectable: true,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 5',
    serviceValue: 0,
    serviceId: 'ABC-127',
    selectable: true,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 6',
    serviceValue: 0,
    serviceId: 'ABC-128',
    selectable: true,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 7',
    serviceValue: 0,
    serviceId: 'ABC-129',
    selectable: false,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 8',
    serviceValue: 0,
    serviceId: 'ABC-130',
    selectable: true,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 9',
    serviceValue: 0,
    serviceId: 'ABC-131',
    selectable: true,
  },
  {
    serviceValueType: '무료',
    serviceName: '부가서비스 10',
    serviceValue: 0,
    serviceId: 'ABC-132',
    selectable: false,
  },
];

interface AdditionalServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedServices: AdditionalService[]) => void;
  initialSelectedAdditionalServices?: AdditionalService[];
}

const AdditionalServiceSelectModal: React.FC<AdditionalServiceModalProps> = ({
  open,
  onClose,
  onSelect: onComplete,
  initialSelectedAdditionalServices: initialAdditionalSelectedServices = [],
}) => {
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<AdditionalService[]>(
    initialAdditionalSelectedServices,
  );
  const [filterText, setFilterText] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<AdditionalService[]>(services);
  const [unselectableAdditionalService, setUnselectableAdditionalService] =
    useState<AdditionalService | null>(null);

  useEffect(() => {
    setSelectedAdditionalServices([...initialAdditionalSelectedServices]);
  }, [initialAdditionalSelectedServices]);

  useEffect(() => {
    if (open) {
      setFilteredServices(services);
      setFilterText('');
    }
  }, [open]);

  const handleSelect = (service: AdditionalService) => {
    console.log(service);
    if (!service.selectable) {
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
    console.log('모달안쪽', selectedAdditionalServices);
    onComplete(selectedAdditionalServices);
    onClose();
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedAdditionalServices.some((s) => s.serviceId === serviceId);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          bgcolor: 'background.paper',
          p: 4,
          mx: 'auto',
          mt: 5,
          position: 'relative',
        }}
      >
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
        <Typography variant='h6' gutterBottom>
          부가서비스 선택
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label='부가서비스명'
            variant='outlined'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button
            variant='contained'
            onClick={handleFilter}
            sx={{
              minWidth: '80px',
              bgcolor: '#0f1a2c',
              '&:hover': {
                bgcolor: '#1a2a3c',
              },
            }}
          >
            조회
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 363, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>선택</TableCell>
                <TableCell>부가서비스명</TableCell>
                <TableCell>요금 (원)</TableCell>
                <TableCell>코드</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.serviceId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAdditionalServices.some(
                          (s) => s.serviceId === service.serviceId,
                        )}
                        onChange={() => handleSelect(service)}
                      />
                    </TableCell>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell>{service.serviceValue.toLocaleString()}</TableCell>
                    <TableCell>{service.serviceId}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ py: 5 }}>
                    <Typography variant='body1' color='text.secondary'>
                      표시할 데이터가 없습니다
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {unselectableAdditionalService && (
          <Alert severity='error' sx={{ mt: 2 }}>
            *
            {`${unselectableAdditionalService.serviceName}은(는) 선택이 불가능한 부가서비스 입니다.`}
          </Alert>
        )}

        <Typography variant='h6' sx={{ mt: 2 }}>
          선택된 부가서비스 {selectedAdditionalServices.length}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {selectedAdditionalServices.map((service) => (
            <Chip
              key={service.serviceId}
              label={`${service.serviceName} - ${service.serviceValue.toLocaleString()}원`}
              onDelete={() => handleSelect(service)}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            취소
          </Button>
          <Button variant='contained' onClick={handleComplete}>
            완료
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdditionalServiceSelectModal;

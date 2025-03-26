import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Divider, Paper } from '@mui/material';
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';

interface ModificationRequestProps {
  contractTabId: string;
}

const ModificationRequest: React.FC<ModificationRequestProps> = ({ contractTabId }) => {
  // 스토어에서 필요한 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);
  const modifyServiceInfo = useModifyServiceStore((state) => 
    state.getModifyServiceInfo(contractTabId)
  );
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const customers = useCustomerStore((state) => state.customers);
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  // 요청 정보 가져오기
  const selectedService = modifyServiceInfo?.selectedService;
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const removedCurrentAdditionalServices = modifyServiceInfo?.removedCurrentAdditionalServices || [];
  
  // 제거된 부가서비스를 제외한 유지할 현재 부가서비스
  const currentServicesToKeep = currentAdditionalServices.filter(currentService => 
    !removedCurrentAdditionalServices.some(removed => removed.serviceId === currentService.serviceId)
  );
  
  // 최종 부가서비스 목록 (제거된 항목 제외, 추가된 항목 포함)
  const additionalServices = [...currentServicesToKeep, ...selectedAdditionalServices];

  // 요금제 변경 요약 계산
  const totalAdditionalServicesValue = additionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0), 
    0
  );
  const planValue = selectedService?.serviceValue || 0;
  const totalValue = planValue + totalAdditionalServicesValue;

  // 화면 로드를 위한 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 화면 전환 애니메이션을 위한 타이머
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 변경사항이 있는지 확인
  const hasChanges = 
    selectedService !== null || 
    selectedAdditionalServices.length > 0 || 
    removedCurrentAdditionalServices.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          p: 3,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
          요금제/부가서비스 변경 요청
        </Typography>
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant='body1' sx={{ ml: 2 }}>
              처리 결과를 확인하는 중...
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant='h6' 
                sx={{ 
                  mb: 2, 
                  color: 'success.main', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {hasChanges 
                  ? '요청이 성공적으로 처리되었습니다' 
                  : '변경 사항이 없습니다'}
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                고객 정보
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant='body1' sx={{ width: 120, color: 'text.secondary' }}>
                    고객명
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {selectedCustomer?.name || '정보 없음'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant='body1' sx={{ width: 120, color: 'text.secondary' }}>
                    고객 ID
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {selectedCustomerId || '정보 없음'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant='body1' sx={{ width: 120, color: 'text.secondary' }}>
                    계약 ID
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {currentService?.contractId || '정보 없음'}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                변경된 서비스 정보
              </Typography>
              
              {selectedService ? (
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body1' sx={{ fontWeight: 'medium', mb: 1 }}>
                    요금제
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      bgcolor: 'grey.50',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant='body1'>
                      {selectedService.serviceName}
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {selectedService.serviceValue.toLocaleString()}원
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body1' sx={{ fontWeight: 'medium', mb: 1 }}>
                    요금제
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      p: 1,
                      bgcolor: 'grey.50',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      요금제 변경 없음
                    </Typography>
                  </Box>
                </Box>
              )}
              
              <Box sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontWeight: 'medium', mb: 1 }}>
                  부가서비스 {additionalServices.length > 0 ? `(${additionalServices.length}개)` : ''}
                </Typography>
                
                {additionalServices.length > 0 ? (
                  additionalServices.map((service) => (
                    <Box 
                      key={service.serviceId}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        p: 1,
                        mb: 0.5,
                        bgcolor: 'grey.50',
                        borderRadius: 1
                      }}
                    >
                      <Typography variant='body2'>
                        {service.serviceName}
                      </Typography>
                      <Typography variant='body2'>
                        {service.serviceValue.toLocaleString()}원
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      p: 1,
                      bgcolor: 'grey.50',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      {removedCurrentAdditionalServices.length > 0 
                        ? `모든 부가서비스가 제거되었습니다 (${removedCurrentAdditionalServices.length}개)` 
                        : '선택된 부가서비스 없음'}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  borderRadius: 1
                }}
              >
                <Typography variant='h6'>
                  총 금액
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {totalValue.toLocaleString()}원
                </Typography>
              </Box>
            </Box>
            
            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
              • 요금제/부가서비스 변경은 즉시 적용되며, 일할 계산됩니다.
              <br />
              • 변경된 서비스는 다음 달 청구서에 반영됩니다.
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ModificationRequest;

import { useEffect } from 'react';
import {
  useCheckServiceModifiableQuery,
  Service,
} from '@api/queries/modifyService/useModifyServiceQuery';
import useModifyServiceStore from '@stores/ModifyServiceStore';

export const useCheckModifiable = (
  customerId: string,
  contractId: string,
  isTabActive: boolean,
  onBlocked: () => void,
) => {
  const { data: modifiableData, isLoading } = useCheckServiceModifiableQuery(contractId);

  const { setServiceModifiable, setIsRollbackAvailable, setPreviousService, setInitialStates } =
    useModifyServiceStore();

  useEffect(() => {
    if (isLoading || !customerId || !contractId || !modifiableData || !isTabActive) {
      return;
    }

    // 1. 변경 가능 여부 store 설정
    setServiceModifiable(customerId, contractId, modifiableData.isModifiable);
    setIsRollbackAvailable(customerId, contractId, modifiableData.isRollbackAvailable || false);

    // 2. 이전 서비스 설정
    if (modifiableData.isRollbackAvailable && modifiableData.previousService) {
      const prevService: Service = {
        serviceId: modifiableData.previousService.serviceId,
        serviceName: modifiableData.previousService.serviceName || '이전 요금제',
        serviceValue: modifiableData.previousService.serviceValue || 0,
        serviceValueType: modifiableData.previousService.serviceValueType || '원정액',
        releaseDate: '',
      };

      setPreviousService(customerId, contractId, prevService);
      setInitialStates(customerId, contractId, true, modifiableData.isModifiable, prevService);
    } else {
      setPreviousService(customerId, contractId, null);
      setInitialStates(customerId, contractId, false, modifiableData.isModifiable, null);
    }

    // 3. 변경 불가 시 콜백 실행 (ex. 다이얼로그 열기)
    if (!modifiableData.isModifiable) {
      onBlocked();
    }
  }, [
    isLoading,
    modifiableData,
    customerId,
    contractId,
    isTabActive,
    setServiceModifiable,
    setIsRollbackAvailable,
    setPreviousService,
    setInitialStates,
    onBlocked,
  ]);
};

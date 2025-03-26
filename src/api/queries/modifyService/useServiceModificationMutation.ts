import { useReactMutation } from '@hooks/useReactQuery';
import serviceModificationService from '@api/services/serviceModificationService';
import { ServiceModificationRequest } from '@model/modifyService/ModifyServiceModel';
import { v4 as uuidv4 } from 'uuid';

interface ServiceModificationParams {
  customerId: string;
  contractId: string;
  service?: {
    serviceId: string;
  };
  additionalServices: {
    serviceId: string;
  }[];
}

export const useServiceModificationMutation = () => {
  return useReactMutation({
    mutationFn: (data: ServiceModificationParams) => {
      // 글로벌 트랜잭션 ID 생성 (프론트엔드에서 생성)
      const gTrId = `GTR_test_${uuidv4()}`;

      // 서비스 변경 요청 구성
      const request: ServiceModificationRequest = {
        gTrId,
        customerId: data.customerId,
        contractId: data.contractId,
        service: data.service,
        additionalServices: data.additionalServices.map((service) => ({
          serviceId: service.serviceId,
        })),
      };

      return serviceModificationService.saveServiceModification(request);
    },
  });
};

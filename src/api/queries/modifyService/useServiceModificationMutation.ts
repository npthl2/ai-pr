import { useReactMutation } from '@hooks/useReactQuery';
import serviceModificationService from '@api/services/serviceModificationService';
import { ServiceModificationRequest } from '@model/modifyService/ModifyServiceModel';
import { v4 as uuidv4 } from 'uuid';

// 서비스 변경 요청에 필요한 파라미터 타입 정의
interface ServiceModificationParams {
  customerId: string;
  contractId: string;
  service?: {
    serviceId: string;
  } | null;
  additionalServices: {
    serviceId: string;
  }[];
}

// 서비스 변경 API 호출
export const useServiceModificationMutation = () => {
  return useReactMutation({
    mutationFn: (data: ServiceModificationParams) => {
      // 글로벌 트랜잭션 ID 생성
      const gTrId = `GTR_${uuidv4()}`;

      // 서비스 변경 요청 데이터 구성
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

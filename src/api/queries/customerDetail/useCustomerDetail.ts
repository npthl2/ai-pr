import { useSuspenseQuery } from '@tanstack/react-query';
import customerContractService from '@api/services/cusotmerDetailService'; // Ensure this import is correct
import { CustomerContract } from '@model/CustomerContract'; // Ensure this module is correctly referenced
import { Info } from '@pages/customer/detail/components/information/types';
import { LobItem, PhoneItem } from '@pages/customer/detail/components/tree/types';
import { ContractData, ContractService } from '@model/Contract';
import { v4 as uuidv4 } from 'uuid';

export const useCustomerContractsQuery = (customerId: string) => {
  return useSuspenseQuery<CustomerContract, Error>({
    queryKey: ['customerContracts', customerId],
    queryFn: async (): Promise<CustomerContract> => {
      if (!customerId) {
        throw new Error('customerId is required');
      }
      const response = await customerContractService.getCustomerContracts(customerId);

      // Type Guard를 사용하여 CustomerContract만 반환
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response data');
      }
      return response.data as CustomerContract;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};

export const customerContractsTreeData = (customerId: string) => {
  const { data } = useCustomerContractsQuery(customerId);

  if (!data) return null;
  return mapToTree(data);
};

function mapToTree(data: CustomerContract) {
  const lobMap: Record<string, LobItem> = {};

  data.contracts.forEach((contract) => {
    const { contractDetail } = contract;
    if (!contractDetail) return;

    const { lobType, contractId, phoneNumber, contractStatus, contractDate, serviceList } =
      contractDetail;

    // LOB 그룹 생성
    if (!lobMap[lobType]) {
      lobMap[lobType] = {
        id: lobType,
        lobType,
        children: [],
      };
    }

    // 계약 정보 추가
    const contractNode: PhoneItem = {
      id: uuidv4(),
      phone: phoneNumber,
      status: contractStatus,
      date: `${contractDate} ~`,
      contractId,
      children: [],
    };

    // 서비스 목록 추가
    if (serviceList && Array.isArray(serviceList)) {
      contractNode.children = serviceList.map((service) => ({
        id: uuidv4(),
        serviceType: service.serviceType,
        serviceName: service.serviceName,
        date: getFirstPartOfEngagementDate(contractDetail.engagement.engagementDate),
      }));
    }

    lobMap[lobType].children.push(contractNode);
  });
  return Object.values(lobMap);
}

const getFirstPartOfEngagementDate = (str: string): string => {
  return str.split('~')[0] || '';
};

export const customerContractsInfoData = (customerId: string, contractId: string) => {
  const { data } = useCustomerContractsQuery(customerId);
  const selectedContract = data.contracts.find((contract) => contract.contractId === contractId);
  if (!selectedContract) return null;
  return mapToInfo(selectedContract);
  // FIXME: useMemo 이용 시 데이터 변경 시 렌더링 안됨
  // return useMemo(() => {
  //     if(!selectedContract) return null;
  //     return mapToInfo(selectedContract);
  // }, [customerId, contractId]);
};

export function mapToInfo(data: ContractData): Info {
  return {
    contractId: data.contractId,
    contract: {
      contractId: data.contractDetail.contractId,
      contractType: data.contractDetail.contractType,
      assignee: data.contractDetail.contractor.assignee,
      assigneeDepartment: data.contractDetail.contractor.assigneeDepartment,
      salesDepartment: data.contractDetail.contractor.salesDepartment,
      finalSeller: data.contractDetail.contractor.finalSeller,
      contractStatus: data.contractDetail.contractStatus,
    },
    invoice: {
      paymentId: data.invoiceDetail.paymentId,
      paymentName: data.invoiceDetail.paymentName,
      paymentNameEncrypted: data.invoiceDetail.paymentNameEncrypted,
      recipient: data.invoiceDetail.recipient,
      recipientEncrypted: data.invoiceDetail.recipientEncrypted,
      paymentMethod: data.invoiceDetail.paymentMethod,
      paymentDate: data.invoiceDetail.paymentDate,
      account: data.invoiceDetail.account,
      accountEncrypted: data.invoiceDetail.accountEncrypted,
      card: data.invoiceDetail.card,
      cardEncrypted: data.invoiceDetail.cardEncrypted,
      invoiceType: data.invoiceDetail.invoiceType,
      invoiceNumber: data.invoiceDetail.invoiceNumber,
      invoiceNumberEncrypted: data.invoiceDetail.invoiceNumberEncrypted,
      invoiceAddress: data.invoiceDetail.invoiceAddress,
      invoiceAddressEncrypted: data.invoiceDetail.invoiceAddressEncrypted,
    },
    service: {
      contractId: data.contractId,
      engagementType: data.contractDetail.engagement.engagementType,
      engagementDate: data.contractDetail.engagement.engagementDate,
      elapsedDays: data.contractDetail.engagement.elapsedDays,
      discountEndDate: data.contractDetail.engagement.discountEndDate,
      totalDiscountRefundAmount: data.contractDetail.engagement.totalDiscountRefundAmount,
      deviceModelName: data.contractDetail.device.deviceModelName,
      deviceModelNameAlias: data.contractDetail.device.deviceModelNameAlias,
      deviceSerialNumber: data.contractDetail.device.deviceSerialNumber,
      deviceSerialNumberEncrypted: data.contractDetail.device.deviceSerialNumberEncrypted,
      simModelName: data.contractDetail.device.simModelName,
      simSerialNumber: data.contractDetail.device.simSerialNumber,
      simSerialNumberEncrypted: data.contractDetail.device.simSerialNumberEncrypted,
      serviceList: data.contractDetail.serviceList.map((service: ContractService) => ({
        serviceType: service.serviceType,
        serviceName: service.serviceName,
        serviceValueType: service.serviceValueType,
        serviceValue: service.serviceValue,
      })),
      remainingPayment: data.billingDetail.remainingPayment,
      remainingInstallment: data.billingDetail.remainingInstallment,
    },
  };
}

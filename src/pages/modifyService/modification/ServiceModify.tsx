// src/pages/modifyService/modification/ServiceModify.tsx
import { Button } from '@mui/material';
import { useMemo } from 'react';
import SelectService from './components/ModifiedServiceSelect';
import AdditionalServiceList from './components/AdditionalServiceList';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { useAdditionalServicesQuery } from '@api/queries/modifyService/useModifyServiceQuery';
import SelectedAdditionalServiceList from './components/SelectedAdditionalServiceList';
import { Container, Section, ButtonGroup } from './ServiceModify.styled';

interface ServiceModifyProps {
  // props 정의
}

const ServiceModify: React.FC<ServiceModifyProps> = () => {
  // 스토어에서 필요한 정보 가져오기
  const { 
    isServiceModifiable, 
    hasAgeRestrictedServices, 
    resetAll,
    selectedService,
    serviceModificationMounted
  } = useModifyServiceStore();

  // CustomerStore에서 현재 선택된 고객 정보 가져오기
  const { customers, selectedCustomerId } = useCustomerStore();

  // CurrentServiceStore에서 초기 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // 현재 선택된 고객 찾기
  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => customer.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // 현재 고객의 나이
  const customerAge = useMemo(() => {
    if (!selectedCustomer) return null;
    return 'age' in selectedCustomer ? Number(selectedCustomer.age) : null;
  }, [selectedCustomer]);

  // 현재 사용할 서비스 ID (선택된 서비스 또는 현재 서비스)
  const currentServiceId = useMemo(() => {
    return selectedService?.serviceId || currentService?.serviceId || '';
  }, [selectedService, currentService]);

  // 부가서비스 목록 조회 API 호출
  const { data: additionalServices = [] } = useAdditionalServicesQuery(
    customerAge || 0,
    currentServiceId,
    serviceModificationMounted
  );

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = () => {
    // 여기에 실제 저장 로직 구현
    // TODO: API 호출하여 저장 처리
    alert('요금제 변경이 저장되었습니다.');
  };

  // 초기화 버튼 클릭 시 호출되는 핸들러
  const handleReset = () => {
    resetAll();
  };

  // 선택한 요금제가 없거나 변경 불가능한 경우 또는 나이 제한으로 인해 해지가 필요한 서비스가 있는 경우 저장 버튼 비활성화
  const isSaveDisabled = !isServiceModifiable || hasAgeRestrictedServices;

  return (
    <Container>
      {/* 1. 요금제 선택 영역 */}
      <Section>
        <SelectService />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <AdditionalServiceList additionalServices={additionalServices} />
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <SelectedAdditionalServiceList />
      </Section>

      {/* 4. 버튼 영역 */}
      <ButtonGroup>
        <Button variant='outlined' onClick={handleReset}>
          초기화
        </Button>
        <Button variant='contained' onClick={handleSave} disabled={isSaveDisabled}>
          저장
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ServiceModify;

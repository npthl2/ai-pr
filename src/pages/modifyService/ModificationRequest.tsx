
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import {
  ModificationRequestContainer,
  ContentContainer,
  SummaryContainer,
  PageTitle,
  TitleContainer,
  ButtonContainer,
} from './ModificationRequest.styled';
import { RegistrationStatusType } from '@constants/RegistrationConstants';
import ModificationStatusMessage from './modification/components/ModificationStatusMessage';
import { useRegistrationStatus } from '@hooks/useRegistrationStatus';
import Button from '@components/Button';
import useMenuStore from '@stores/MenuStore';
import { MainMenu } from '@constants/CommonConstant';
import { AdditionalServicesContainer } from './ModificationRequest.styled';
import AdditionalServicesInfo from './summary/AdditionalServicesInfo';
import TotalPriceInfo from './summary/TotalPriceInfo';
import { Divider } from '@mui/material';

interface ModificationRequestProps {
  contractTabId: string;
}

const ModificationRequest = ({ contractTabId }: ModificationRequestProps) => {
  // 스토어에서 필요한 정보 가져오기
  const getCurrentService = useCurrentServiceStore((state) => state.getCurrentService);

  const modifyServiceInfo = useModifyServiceStore((state) =>
    state.getModifyServiceInfo(contractTabId),
  );
  // const { removeModifyServiceInfo } = useModifyServiceStore();
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  // const customers = useCustomerStore((state) => state.customers);
  // const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const selectCustomer = useCustomerStore((state) => state.selectCustomer);

  const { reset } = useCustomerStore();

  // const contractId = getCurrentService?.(selectedCustomerId)?.contractId || '';

  // 요청 정보 가져오기
  const selectedService = modifyServiceInfo?.selectedService;
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  // 제거된 부가서비스를 제외한 유지할 현재 부가서비스
  const currentServicesToKeep = currentAdditionalServices.filter(
    (currentService) =>
      !removedCurrentAdditionalServices.some(
        (removed) => removed.serviceId === currentService.serviceId,
      ),
  );

  // 최종 부가서비스 목록 (제거된 항목 제외, 추가된 항목 포함)
  const additionalServices = [...currentServicesToKeep, ...selectedAdditionalServices];

  // 요금제 변경 요약 계산
  const totalAdditionalServicesValue = additionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );
  const planValue = selectedService?.serviceValue || 0;
  
  // 현재 요금제 가격
  const currentService = getCurrentService?.(selectedCustomerId);
  const currentServiceValue = currentService?.serviceValue || 0;
  
  // 현재 부가서비스 가격 합계
  const currentAdditionalServicesTotal = currentAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0), 
    0
  );
  
  // 총 금액 (요금제 + 부가서비스)
  const totalBeforePrice = currentServiceValue + currentAdditionalServicesTotal;
  const totalAfterPrice = planValue + totalAdditionalServicesValue;

  const businessProcessId = useModifyServiceStore(
    (state) => state.modifyServices[contractTabId]?.businessProcessId,
  );

  const { data } = useRegistrationStatus({
    isRegistrationRequestMounted: true,
    businessProcessId,
  });
  const registrationData = data?.registrations.find(
    (registration) => registration.businessProcessId === businessProcessId,
  );

  // 홈으로 이동
  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');

    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);

    // 모든 고객 탭 닫기 (CustomerStore의 reset 함수 호출)
    reset();
  };

  return (
    <ModificationRequestContainer>
      <ContentContainer>
        <ModificationStatusMessage
          status={registrationData?.status as RegistrationStatusType}
          customerName={registrationData?.customerName || ''}
        />
        <TitleContainer>
          <PageTitle>상품 변경정보 요약</PageTitle>
        </TitleContainer>
        <SummaryContainer>
          <TotalPriceInfo 
            totalBeforePrice={totalBeforePrice}
            totalAfterPrice={totalAfterPrice}
          />
          <AdditionalServicesContainer>
            {/* 현재 서비스 정보 */}
            <AdditionalServicesInfo
              title={getCurrentService?.(selectedCustomerId)?.serviceName || '이전 서비스'}
              mainServiceValue={getCurrentService?.(selectedCustomerId)?.serviceValue || 0}
              additionalServices={currentAdditionalServices.map((service) => ({
                serviceName: service.serviceName,
                serviceValue: service.serviceValue || 0,
              }))}
            />
            <Divider orientation='vertical' flexItem />
            {/* 변경될 서비스 정보 */}
            <AdditionalServicesInfo
              title={selectedService?.serviceName || '변경 서비스'}
              mainServiceValue={selectedService?.serviceValue || 0}
              additionalServices={[...currentServicesToKeep, ...selectedAdditionalServices].map(
                (service) => ({
                  serviceName: service.serviceName,
                  serviceValue: service.serviceValue || 0,
                }),
              )}
            />
          </AdditionalServicesContainer>
        </SummaryContainer>
        <ButtonContainer>
          <Button
            variant='outlined'
            onClick={handleGoHome}
            size='small'
            data-testid='go-home-button'
          >
            홈으로 이동
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </ModificationRequestContainer>
  );
};

export default ModificationRequest;

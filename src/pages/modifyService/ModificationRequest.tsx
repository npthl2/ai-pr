import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStoreRefact';
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

const ModificationRequest = () => {
  // 변경 전 서비스 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );
  const beforeService =
    useCurrentServiceStore((state) => state.getCurrentService(selectedCustomerId)) || null;
  const beforeAdditionalServices = beforeService?.additionalService || [];

  const beforeServiceValue = beforeService?.serviceValue || 0;
  const beforeAdditionalServicesValue = beforeAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );

  // 변경 후 서비스 정보 가져오기
  const getModifyServiceInfo = useModifyServiceStore((state) => state.getModifyServiceInfo);
  const afterService = getModifyServiceInfo(selectedCustomerId, selectedContractId);

  const selectedService = afterService?.selectedService;

  const currentAdditionalServices = afterService?.currentAdditionalServices || [];
  const selectedAdditionalServices = afterService?.selectedAdditionalServices || [];
  const removedCurrentAdditionalServices = afterService?.removedCurrentAdditionalServices || [];

  // 제거된 부가서비스를 제외한 유지할 현재 부가서비스
  const currentServicesToKeep = currentAdditionalServices.filter(
    (currentService) =>
      !removedCurrentAdditionalServices.some(
        (removed) => removed.serviceId === currentService.serviceId,
      ),
  );

  // 최종 부가서비스 목록 (제거된 항목 제외, 추가된 항목 포함)
  // TODO 부모 컴포넌트에서 계산 한 내역을 store에 저장하고 바로 사용함으로서 로직 제거 가능
  const afterAdditionalServices = [...currentServicesToKeep, ...selectedAdditionalServices];

  const afterServiceValue = selectedService?.serviceValue || beforeService?.serviceValue || 0;
  const afterAdditionalServicesValue = afterAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );

  // 총 금액 (요금제 + 부가서비스)
  const totalBeforePrice = beforeServiceValue + beforeAdditionalServicesValue;
  const totalAfterPrice = afterServiceValue + afterAdditionalServicesValue;

  // 상태 체크
  const businessProcessId = afterService?.businessProcessId;

  const { data } = useRegistrationStatus({
    isRegistrationRequestMounted: true,
    businessProcessId,
  });

  const registrationData = data?.registrations.find(
    (registration) => registration.businessProcessId === businessProcessId,
  );

  // 홈버튼 동작
  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const selectCustomer = useCustomerStore((state) => state.selectCustomer);
  const removeModifyServiceInfo = useModifyServiceStore((state) => state.removeModifyServiceInfo);

  const { reset } = useCustomerStore();

  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');

    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);

    // 모든 고객 탭 닫기 (CustomerStore의 reset 함수 호출)
    reset();

    removeModifyServiceInfo(selectedContractId, selectedContractId);
  };

  return (
    <ModificationRequestContainer data-testid='modification-request'>
      <ContentContainer>
        <ModificationStatusMessage
          status={registrationData?.status as RegistrationStatusType}
          customerName={registrationData?.customerName || ''}
        />
        <TitleContainer>
          <PageTitle>상품 변경정보 요약</PageTitle>
        </TitleContainer>
        <SummaryContainer>
          <TotalPriceInfo totalBeforePrice={totalBeforePrice} totalAfterPrice={totalAfterPrice} />
          <AdditionalServicesContainer>
            {/* 현재 서비스 정보 */}
            <AdditionalServicesInfo
              title={beforeService?.serviceName || '이전 서비스'}
              mainServiceValue={beforeServiceValue}
              additionalServices={beforeAdditionalServices.map((service) => ({
                serviceName: service.serviceName,
                serviceValue: service.serviceValue || 0,
              }))}
              testId='before-services'
            />
            <Divider orientation='vertical' flexItem />
            {/* 변경될 서비스 정보 */}
            <AdditionalServicesInfo
              title={selectedService?.serviceName || beforeService?.serviceName || ''}
              mainServiceValue={selectedService?.serviceValue || beforeService?.serviceValue || 0}
              additionalServices={afterAdditionalServices.map((service) => ({
                serviceName: service.serviceName,
                serviceValue: service.serviceValue || 0,
              }))}
              testId='after-services'
            />
          </AdditionalServicesContainer>
        </SummaryContainer>
        <ButtonContainer>
          <Button
            variant='outlined'
            onClick={handleGoHome}
            size='small'
            data-testid='go-home-button-in-modify-service'
          >
            홈으로 이동
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </ModificationRequestContainer>
  );
};

export default ModificationRequest;

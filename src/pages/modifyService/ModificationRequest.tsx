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
  // 변경 전 서비스 정보 가져오기
  const getCurrentService = useCurrentServiceStore((state) => state.getCurrentService);
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';

  const beforeService = getCurrentService?.(selectedCustomerId);
  const beforeAdditionalServices = beforeService?.additionalService || [];

  const beforeServiceValue = beforeService?.serviceValue || 0;
  const beforeAdditionalServicesValue = beforeAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );

  // 변경 후 서비스 정보 가져오기
  const getModifyServiceInfo = useModifyServiceStore((state) => state.getModifyServiceInfo);
  const afterService = getModifyServiceInfo(selectedCustomerId);

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

  // 홈버튼 동작
  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const selectCustomer = useCustomerStore((state) => state.selectCustomer);
  const removeModifyServiceInfoByContractId = useModifyServiceStore(
    (state) => state.removeModifyServiceInfoByContractId,
  );

  const { reset } = useCustomerStore();

  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');

    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);

    // 모든 고객 탭 닫기 (CustomerStore의 reset 함수 호출)
    reset();

    // 계약 ID로 서비스 변경 정보 삭제 (businessProcessId 사용)
    if (businessProcessId) {
      removeModifyServiceInfoByContractId(businessProcessId);
    }
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

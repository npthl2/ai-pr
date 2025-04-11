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

const ModificationRequest = () => {
  // 변경 전 서비스 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );
  const beforeServiceInfo =
    useCurrentServiceStore((state) => state.getCurrentService(selectedCustomerId)) || null;
  const beforeAdditionalServices = beforeServiceInfo?.additionalService || [];

  const beforeServiceValue = beforeServiceInfo?.serviceValue || 0;
  const beforeAdditionalServicesValue = beforeAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );

  // 변경 후 서비스 가져오기

  const getRequestedModificationInfo = useModifyServiceStore(
    (state) => state.getRequestedModificationInfo,
  );
  const requestServiceInfo = getRequestedModificationInfo(selectedCustomerId, selectedContractId);

  const requestService = requestServiceInfo?.service || null;
  const requestAdditionalServices = requestServiceInfo?.additionalServices || [];

  const requestServiceValue = requestService?.serviceValue || beforeServiceInfo?.serviceValue || 0;
  const requestAdditionalServicesValue = requestAdditionalServices.reduce(
    (sum, service) => sum + (service.serviceValue || 0),
    0,
  );

  // 총 금액 (요금제 + 부가서비스)
  const totalBeforePrice = beforeServiceValue + beforeAdditionalServicesValue;
  const totalAfterPrice = requestServiceValue + requestAdditionalServicesValue;

  // 상태 체크

  // 변경 후 서비스 정보 가져오기
  const getModifyServiceInfo = useModifyServiceStore((state) => state.getModifyServiceInfo);
  const modifyServiceInfo = getModifyServiceInfo(selectedCustomerId, selectedContractId);
  const businessProcessId = modifyServiceInfo?.businessProcessId;

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
  const { removeModifyServiceInfo, removeRequestedModificationInfo } = useModifyServiceStore();
  const { deleteCustomerServiceData } = useCurrentServiceStore();

  const { reset } = useCustomerStore();

  const handleGoHome = () => {
    // 현재 선택된 고객 해제
    selectCustomer('');

    // 메인 메뉴를 홈으로 설정
    setSelectedMainMenu(MainMenu.HOME);

    // 모든 고객 탭 닫기 (CustomerStore의 reset 함수 호출)
    reset();

    deleteCustomerServiceData(selectedCustomerId);
    removeModifyServiceInfo(selectedCustomerId, selectedContractId);
    removeRequestedModificationInfo(selectedCustomerId, selectedContractId);
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
              title={beforeServiceInfo?.serviceName || '이전 서비스'}
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
              title={requestService?.serviceName || beforeServiceInfo?.serviceName || ''}
              mainServiceValue={
                requestService?.serviceValue || beforeServiceInfo?.serviceValue || 0
              }
              additionalServices={requestAdditionalServices.map((service) => ({
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

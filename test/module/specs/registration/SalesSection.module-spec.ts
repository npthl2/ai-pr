import SalesSectionPage from '../../../pages/registration/SalesSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';

describe('KAN-38  판매정보 확인', () => {
  const page = new SalesSectionPage();
  const bookmarkService = new BookmarkServiceMock();
  const registrationContractService = new ContractSectionServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();

    // 먼저 마운트 하는 데이터 셋업
    registrationContractService.successWhenGetServices();
    registrationContractService.successWhenGetAdditionalServices();

    // 신규가입 아코디언 화면 진입
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');

    // 가입정보 섹션 확인 - 초기값
    page.assertComponentToBeVisible('sales-section');
    page.assertSalesSectionToBeExpanded();
  });

  it('KAN-38-1 판매처가 포커스 되어있다', () => {
    page.isFocusedOnSalesDepartmentInput();
  });

  it('KAN-38-2 판매처 입력 후 focust out하면 가입정보 섹션이 보인다', () => {
    page.typeSalesDepartmentInput('test');
    page.assertContractSectionToBeExpanded();
  });

  it('KAN-38-3 모두 10자리까지만 입력된다', () => {
    page.typeSalesComponentInputSuccess('sales-contact-point-input');
    page.typeSalesComponentInputSuccess('finalseller-input');
    page.typeSalesComponentInputSuccess('supporter-input');

    page.typeSalesComponentInputOver10('sales-contact-point-input');
    page.typeSalesComponentInputOver10('finalseller-input');
    page.typeSalesComponentInputOver10('supporter-input');
  });

  it('KAN-38-4 판매처를 삭제한 채 focusout하면 에러 메시지가 뜬다', () => {
    page.typeSalesDepartmentInputFull('');
    page.assertSalesDepartmentEmptyInputError();
  });
});

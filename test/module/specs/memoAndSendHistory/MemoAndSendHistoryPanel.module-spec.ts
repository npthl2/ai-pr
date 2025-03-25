import MemoHistoryPage from '../../../pages/memoAndSendHistory/MemoHistoryPage';
import MemoHistoryServiceMock from '../../mock/memoAndSendHistory/MemoHistoryServiceMock';
import CustomerSearchTestPage from '../../../pages/customer/search/CustomerSearch';
import { CustomerSearchServiceMock } from '../../mock/customer/search/CustomerSearchServiceMock';
import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';

describe('KAN-201 메모 및 작성이력 화면 진입', () => {
  const page = new MemoHistoryPage();
  const service = new MemoHistoryServiceMock();
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const customerDetailServiceMock = new CustomerDetailServiceMock();

  before(() => {
    mockMemberStore({
      memberInfo: {
        memberId: 'user2',
        memberName: 'user2',
        authorities: [''],
      },
    });

    service.successWhenGetHomeBookmark();

    customerSearch.visitCustomerSearch();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer01();
    customerDetailServiceMock.successWhenGetCustomerContracts();
    customerSearch.clickSearch();
  });

  it('KAN-201-1 메모 및 작성이력 화면 진입', () => {
    page.clickMemoOpenButton();
    page.assertMemoPanelVisible();
    service.successWhenGetEmptyMemoList();
  });

  it('KAN-201-2 메모 및 작성이력이 없을 경우 empty case 메시지가 보여야 한다', () => {
    page.assertMemoEmptyTableRowVisible();
  });

  it('KAN-201-3 메모 작성을 하지않은 경우 저장 버튼이 비활성화 되어야 한다', () => {
    page.assertMemoSaveButtonDisabled();
  });

  it('KAN-201-4 메모 작성을 할 경우 저장 버튼이 활성화 되어야 한다', () => {
    page.inputMemoTextarea('메모 내용');
    page.assertMemoSaveButtonEnabled();
  });

  it('KAN-201-5 저장 버튼을 클릭할 경우 toast 메시지가 보여야 한다', () => {
    service.successWhenGetMemoList();
    service.successWhenSaveMemo();
    page.clickMemoSaveButton();
    page.assertToastVisible();
    page.assertToastMessage('저장되었습니다.');
  });

  it('KAN-201-6 메모 및 작성이력 화면 외부를 클릭할 경우 메모 및 작성이력 화면이 닫혀야 한다', () => {
    page.clickMemoOverlay();
    page.assertMemoPanelInvisible();
  });

  it('KAN-201-7 닫힘 버튼을 클릭할 경우 메모 및 작성이력 화면이 닫혀야 한다', () => {
    service.successWhenGetMemoList();
    page.clickMemoOpenButton();
    page.clickMemoCloseButton();
    page.assertMemoPanelInvisible();
  });
});

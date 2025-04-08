import LoginPage from '../../../pages/auth/LoginPage';
import TodayContractsMock from '../../mock/home/TodayContractsMock';
import TodayContracts from '../../../pages/home/TodayContracts';

describe('[KAN-326] 오늘의 신규가입 위젯 테스트', () => {
  const loginPage = new LoginPage();
  const todayContractsMock = new TodayContractsMock();
  const todayContracts = new TodayContracts();

  before(() => {
    loginPage.visitLoginPage();

    loginPage.inputId('user1');
    loginPage.inputPw('new1234');
    loginPage.clickLoginButton();
    loginPage.assertRedirectedToHome();
  });

  it('[KAN-326-1] 홈 로드 시 오늘의 신규가입 위젯 표시되며 총 계약 수와 카드가 표시되어야 한다', () => {
    todayContractsMock.successWhenGetTodayContracts();
    todayContracts.getTotalContracts();
    todayContracts.getCardsGreaterThan(0);
  });

  it('[KAN-326-2] 4개 이상의 카드가 생성되면 화살표가 표시되어야 한다', () => {
    todayContracts.getCardsGreaterThan(4);
    todayContracts.getArrow();
  });

  it('[KAN-326-3] 화살표를 클릭하면 카드가 이동해야 한다', () => {
    todayContracts.clickArrow();
    todayContracts.getCardsGreaterThan(4);
  });

  it('[KAN-326-4] 검색 조건이 변경되면 총 계약 수와 카드가 업데이트되어야 한다', () => {
    todayContracts.clickSearch('이영희');
    todayContracts.getTotalContracts();
    todayContracts.getCardsGreaterThan(0);
  });

  it('[KAN-326-5] 카드를 클릭하면 상세 정보 모달이 표시되어야 한다', () => {
    todayContracts.clickDetailInfo(0);
    todayContracts.getDialog();
    todayContracts.getDialogDetails();
  });

  //   it('[KAN-326-6] 계약이 없는 경우 명언이 표시되어야 한다', () => {
  //     todayContractsMock.successWhenTodayContractsEmpty();
  //     todayContracts.getQuote();
  //   });
});

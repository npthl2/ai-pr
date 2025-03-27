/// <reference types="cypress" />

class ModifyServicePage {
  constructor() {}

  // 모달이 보이는지 확인
  assertModalVisible() {
    cy.get('[data-testid="service-modification-block-modal"]').should('be.visible');
  }

  // 모달 내용 확인
  assertModalContentVisible(content: string) {
    cy.get('[data-testid="service-modification-modal-message"]')
      .contains(content)
      .should('be.visible');
  }

  // 요금제 변경 모달에서 확인 버튼 클릭
  clickModalConfirmButton() {
    cy.get('[data-testid="modal-confirm-button"]').click();
  }

  // 요금제 변경 모달에서 취소 버튼 클릭
  clickModalCancelButton() {
    cy.get('[data-testid="modal-cancel-button"]').click();
  }

  // 요금제 변경 불가 모달이 보이는지 확인
  assertServiceModificationBlockModalVisible() {
    cy.get('[data-testid="service-modification-block-modal"]').should('be.visible');
  }

  // 모달의 타입이 일치하는지 확인
  assertModalTypeIs(type: string) {
    cy.get('[data-testid="service-modification-block-modal"]').should(
      'have.attr',
      'data-type',
      type,
    );
  }

  // 이전 요금제로 되돌리기 버튼이 보이는지 확인
  assertRevertButtonVisible() {
    cy.get('[data-testid="revert-service-button"]').should('be.visible');
  }

  // 이전 요금제로 되돌리기 버튼 클릭
  clickRevertButton() {
    cy.get('[data-testid="revert-service-button"]').click();
  }

  // 변경할 요금제 박스 클릭
  clickServiceSelectBox() {
    cy.get('[data-testid="service-select-box"]').click();
  }

  // 요금제 검색어 입력
  typeServiceSearchKeyword(keyword: string) {
    cy.get('[data-testid="service-select-box"]').type(keyword);
  }

  // 요금제 리스트에 특정 요금제가 보이는지 확인
  assertServiceInList(serviceName: string) {
    cy.get('[data-testid="service-option"]')
      .contains(serviceName)
      .scrollIntoView()
      .should('be.visible');
  }

  // 요금제 리스트가 비어있는지 확인
  assertServiceListEmpty() {
    cy.get('[data-testid="service-option"]').should('not.exist');
  }

  // 요금제 아이템의 금액이 표시되는지 확인
  assertServicePriceVisible(serviceName: string, servicePrice: string) {
    cy.get('[data-testid="service-option"]')
      .contains(serviceName)
      .parent()
      .should('contain.text', servicePrice);
  }

  // 요금제 리스트에서 특정 요금제 선택
  selectServiceFromList(serviceName: string) {
    cy.get('[data-testid="service-option"]').contains(serviceName).click();
  }

  // 모달 내용(요금제 변경) 확인
  assertServiceChangeModalVisible(content: string) {
    cy.get('[data-testid="service-modification-block-modal"]')
      .contains(content)
      .should('be.visible');
  }

  // 선택된 요금제로 값이 변경되었는지 확인
  assertSelectedServiceIs(serviceName: string) {
    cy.get('[data-testid="service-select-box"] input').should('have.value', serviceName);
  }

  // 선택된 요금제의 금액이 표시되는지 확인
  assertSelectedServicePriceIs(servicePrice: string) {
    cy.get('[data-testid="selected-service-price"]').contains(servicePrice).should('be.visible');
  }

  // 부가서비스 가입 불가 안내 문구가 보이는지 확인
  assertAdditionalServiceDisabledMessageVisible() {
    cy.get('[data-testid="additional-service-disabled-message"]').should('be.visible');
  }

  // 부가서비스 목록이 보이는지 확인
  assertAdditionalServiceListVisible() {
    cy.get('[data-testid="additional-service-list"]').should('be.visible');
  }

  // 부가서비스 검색 입력 필드가 보이는지 확인
  assertAdditionalServiceSearchVisible() {
    cy.get('[data-testid="additional-service-search"]').should('be.visible');
  }

  // 부가서비스 검색어 입력
  typeAdditionalServiceSearchKeyword(keyword: string) {
    cy.get('[data-testid="additional-service-search"]').type(keyword);
  }

  // 현재 요금제의 부가서비스가 선택된 목록에 보이는지 확인
  assertCurrentAdditionalServiceInSelectedList() {
    cy.get('[data-testid="selected-additional-service-list"]').should('not.be.empty');
  }

  // 가입 불가 부가서비스에 불가 표시가 되어있는지 확인
  assertAdditionalServiceRestrictionVisible() {
    cy.get('[data-testid="additional-service-restriction"]').should('be.visible');
  }

  // 가입 불가 부가서비스의 추가 버튼이 비활성화되어 있는지 확인
  assertAddButtonDisabled() {
    cy.get('[data-testid="add-button"][disabled]').should('exist');
  }

  // 부가서비스 항목에 마우스 올리기
  hoverAdditionalServiceItem(serviceName: string) {
    cy.get('[data-testid="additional-service-item"]').contains(serviceName).trigger('mouseover');
  }

  // 툴팁이 보이는지 확인
  assertTooltipVisible() {
    cy.get('.MuiTooltip-popper').should('be.visible');
  }

  // 부가서비스 정렬 (이름)
  clickAdditionalServiceNameSort() {
    cy.get('[data-testid="sort-by-name"]').click();
  }

  // 부가서비스 정렬 (요금)
  clickAdditionalServicePriceSort() {
    cy.get('[data-testid="sort-by-price"]').click();
  }

  // 부가서비스 추가 버튼 클릭
  clickAddAdditionalServiceButton(serviceName: string) {
    cy.get('[data-testid="additional-service-item"]')
      .contains(serviceName)
      .siblings('[data-testid="add-button"]')
      .click();
  }

  // 선택된 부가서비스 삭제 버튼 클릭
  clickRemoveSelectedServiceButton(serviceName: string) {
    cy.get('[data-testid="selected-additional-service-item"]')
      .contains(serviceName)
      .siblings('[data-testid="remove-button"]')
      .click();
  }

  // 부가서비스 합계 금액 확인
  assertTotalAmountIs(amount: string) {
    cy.get('[data-testid="total-amount"]').should('contain.text', amount);
  }

  // 저장 버튼이 활성화되어 있는지 확인
  assertSaveButtonEnabled() {
    cy.get('[data-testid="save-button"]').should('not.be.disabled');
  }

  // 초기화 버튼이 활성화되어 있는지 확인
  assertResetButtonEnabled() {
    cy.get('[data-testid="reset-button"]').should('not.be.disabled');
  }

  // 저장 버튼 클릭
  clickSaveButton() {
    cy.get('[data-testid="save-button"]').click();
  }

  // 초기화 버튼 클릭
  clickResetButton() {
    cy.get('[data-testid="reset-button"]').click();
  }

  // 확인 모달이 보이는지 확인
  assertConfirmModalVisible() {
    cy.get('[data-testid="confirm-modal"]').should('be.visible');
  }

  // 변경 불가 모달이 보이는지 확인
  assertBlockModalVisible() {
    cy.get('[data-testid="block-modal"]').should('be.visible');
  }

  // 요약 페이지로 이동했는지 확인
  assertModificationRequestVisible() {
    cy.get('[data-testid="modification-request"]').should('be.visible');
  }
}

export default ModifyServicePage;

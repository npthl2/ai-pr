import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';

import { BannerServiceMock } from '../../mock/home/BannerServiceMock';
import BannerPage from '../../../pages/home/BannerPage';

describe('[KAN-327-1] 프로모션 배너', () => {
  const bannerServiceMock = new BannerServiceMock();

  const bannerPage = new BannerPage();

  beforeEach(() => {
    bannerServiceMock.homeBookmark();
  });
  before(() => {
    mockAuthStore({
      isAuthenticated: true,
    });
    mockMemberStore({
      isAuthenticated: true,
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });
  });

  it('[KAN-327-1-1] Home화면에서 Promotion 배너가 보여야 한다', () => {
    bannerPage.visitHome();
    bannerPage.getPromotionBanner().should('be.visible');
    bannerPage
      .getPromotionBanner()
      .should('have.css', 'background-image')
      .and('include', '/images/promotion-banner.png');
  });

  it('[KAN-327-1-2] Promotion 배너 클릭 시 모달이 보여야한다.', () => {
    bannerPage.getPromotionBanner().click();
    bannerPage.getPromotionDialog().should('be.visible');
  });

  it('[KAN-327-1-3] Promotion 모달 확인 버튼 클릭 시 모달이 닫혀야 한다.', () => {
    bannerPage.getPromotionDialogCloseButton().click();
    bannerPage.getPromotionDialog().should('not.exist');
  });
});

describe('[KAN-327-2] 새로나온 요금제/부가서비스 배너', () => {
  const bannerServiceMock = new BannerServiceMock();

  const bannerPage = new BannerPage();

  beforeEach(() => {
    bannerServiceMock.homeBookmark();
  });
  before(() => {
    mockAuthStore({
      isAuthenticated: true,
    });
    mockMemberStore({
      isAuthenticated: true,
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });
  });

  it('[KAN-327-2-1] Home화면에서 새로나온 요금제/부가서비스 배너가 보여야 하며, 3개의 이미지가 보여야한다.', () => {
    bannerPage.visitHome();
    bannerPage.getNewServicesSlider().should('be.visible');
    bannerPage.getNewServicesSliderImage(0).should('be.visible');
    bannerPage.getNewServicesSliderImage(1).should('be.visible');
    bannerPage.getNewServicesSliderImage(2).should('be.visible');
  });

  it('[KAN-327-2-2] 새로나온 요금제/부가서비스 배너의 우측 dot를 클릭 시 해당하는 이미지로 이동한다', () => {
    bannerPage.getNewServicesSliderDot(0).click();
    bannerPage.getNewServicesSliderImage(0).should('be.visible');
    bannerPage.getNewServicesSliderDot(1).click();
    bannerPage.getNewServicesSliderImage(1).should('be.visible');
    bannerPage.getNewServicesSliderDot(2).click();
    bannerPage.getNewServicesSliderImage(2).should('be.visible');
  });
});

/// <reference types="cypress" />

class DeviceSectionServiceMock {
   
    successWhenGetDeviceModelByIMEI() {
      cy.intercept(
        {
          method: 'GET',
          url: '**/v1/device-inventories/1234567890/device-model',
        },
        {
          statusCode: 200,
          body: {
            successOrNot: 'Y',
            statusCode: 'SUCCESS',
            data: this.successGetDeviceModelByIMEI,
          },
        },
      ).as('getDeviceModelByIMEI');
    }

    successGetDeviceModelByIMEI = {
      deviceModelId: 'dm_4',
      deviceModelName: 'DEV-AP-1',
      deviceModelNameAlias: 'iPhone 16',
      deviceType: '단말기',
      sellingPrice: 1800000,
    };

  }
  
  export default DeviceSectionServiceMock;
  
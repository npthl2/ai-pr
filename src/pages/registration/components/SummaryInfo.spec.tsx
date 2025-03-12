import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SummaryInfo from './SummaryInfo';
import { InvoiceInfo, DeviceInfo, ContractInfo, SalesInfo } from '@model/RegistrationInfo';

// 모킹된 하위 컴포넌트들
vi.mock('./summary/BillingInfo', () => ({
  default: ({ invoiceInfo }: { invoiceInfo: InvoiceInfo }) => (
    <div data-testid="billing-info">
      BillingInfo: {invoiceInfo.paymentMethod || ''}
    </div>
  ),
}));

vi.mock('./summary/SalesInfo', () => ({
  default: ({ salesInfo }: { salesInfo: SalesInfo }) => (
    <div data-testid="sales-info">
      SalesInfo: {salesInfo.salesDepartment || ''}
    </div>
  ),
}));

vi.mock('./summary/SubscriptionInfo', () => ({
  default: ({ contractInfo }: { contractInfo: ContractInfo }) => (
    <div data-testid="subscription-info">
      SubscriptionInfo: {contractInfo.phoneNumber || ''}
    </div>
  ),
}));

vi.mock('./summary/DevicePaymentInfo', () => ({
  default: ({ deviceInfo }: { deviceInfo: DeviceInfo }) => (
    <div data-testid="device-payment-info">
      DevicePaymentInfo: {deviceInfo.deviceModelName || ''}
    </div>
  ),
}));

describe('SummaryInfo 컴포넌트', () => {
  // Given-When-Then 패턴으로 테스트 작성
  
  it('모든 정보가 제공되었을 때 모든 하위 컴포넌트를 렌더링해야 한다', () => {
    // Given: 필요한 모든 정보가 주어졌을 때
    const invoiceInfo: Partial<InvoiceInfo> = {
      paymentMethod: '신용카드',
    };
    
    const deviceInfo: Partial<DeviceInfo> = {
      deviceModelName: 'Galaxy S23',
    };
    
    const contractInfo: Partial<ContractInfo> = {
      phoneNumber: '010-1234-5678',
    };
    
    const salesInfo: Partial<SalesInfo> = {
      salesDepartment: '온라인',
    };
    
    // When: 컴포넌트를 렌더링하면
    render(
      <SummaryInfo 
        invoiceInfo={invoiceInfo as InvoiceInfo}
        deviceInfo={deviceInfo as DeviceInfo}
        contractInfo={contractInfo as ContractInfo}
        salesInfo={salesInfo as SalesInfo}
      />
    );
    
    // Then: 모든 하위 컴포넌트가 렌더링되어야 함
    expect(screen.getByTestId('billing-info')).toBeInTheDocument();
    expect(screen.getByTestId('sales-info')).toBeInTheDocument();
    expect(screen.getByTestId('subscription-info')).toBeInTheDocument();
    expect(screen.getByTestId('device-payment-info')).toBeInTheDocument();
    
    // 각 하위 컴포넌트에 올바른 데이터가 전달되었는지 확인
    expect(screen.getByText('BillingInfo: 신용카드')).toBeInTheDocument();
    expect(screen.getByText('SalesInfo: 온라인')).toBeInTheDocument();
    expect(screen.getByText('SubscriptionInfo: 010-1234-5678')).toBeInTheDocument();
    expect(screen.getByText('DevicePaymentInfo: Galaxy S23')).toBeInTheDocument();
  });
  
  it('컴포넌트가 올바른 레이아웃 구조로 렌더링되어야 한다', () => {
    // Given: 필요한 모든 정보가 주어졌을 때
    const invoiceInfo: Partial<InvoiceInfo> = { paymentMethod: '신용카드' };
    const deviceInfo: Partial<DeviceInfo> = { deviceModelName: 'Galaxy S23' };
    const contractInfo: Partial<ContractInfo> = { phoneNumber: '010-1234-5678' };
    const salesInfo: Partial<SalesInfo> = { salesDepartment: '온라인' };
    
    // When: 컴포넌트를 렌더링하면
    const { container } = render(
      <SummaryInfo 
        invoiceInfo={invoiceInfo as InvoiceInfo}
        deviceInfo={deviceInfo as DeviceInfo}
        contractInfo={contractInfo as ContractInfo}
        salesInfo={salesInfo as SalesInfo}
      />
    );
    
    // Then: 컴포넌트가 올바른 레이아웃 구조로 렌더링되어야 함
    // 왼쪽 컬럼과 오른쪽 컬럼이 있는지 확인
    const boxes = container.querySelectorAll('div[class*="MuiBox"]');
    expect(boxes.length).toBeGreaterThan(0);
    
    // 세로 구분선이 있는지 확인
    const dividers = container.querySelectorAll('hr');
    expect(dividers.length).toBeGreaterThan(0);
  });
}); 
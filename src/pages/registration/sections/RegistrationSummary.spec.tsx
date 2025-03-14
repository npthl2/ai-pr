import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContractSummary from './RegistrationSummary';

// 모킹
const mockContractStore = {
  getRegistrationContractInfo: vi.fn().mockReturnValue({
    isValidated: true,
  }),
};

const mockDeviceStore = {
  getRegistrationDeviceInfo: vi.fn().mockReturnValue({
    isValidated: true,
  }),
};

const mockSalesStore = {
  getRegistrationSalesInfo: vi.fn().mockReturnValue({
    isValidated: true,
  }),
};

vi.mock('@stores/registration/RegistrationCustomerStore', () => ({
  default: () => ({
    getRegistrationCustomerInfo: vi.fn().mockReturnValue({
      name: '홍길동',
    }),
  }),
}));

vi.mock('@stores/registration/RegistrationStore', () => ({
  default: () => ({
    setRegistrationInfo: vi.fn(),
    updateRegistrationStatus: vi.fn(),
    getState: vi.fn().mockReturnValue({
      getRegistrationInfo: vi.fn().mockReturnValue({
        businessProcessId: 'test-id',
      }),
    }),
  }),
}));

vi.mock('@hooks/useRegistrationInfo', () => ({
  useRegistrationInfo: vi.fn().mockReturnValue({
    customer: { name: '홍길동' },
    contract: { phoneNumber: '010-1234-5678' },
    invoice: { paymentMethod: '신용카드' },
    device: { deviceModelName: 'Galaxy S23' },
    sales: { salesDepartment: '온라인' },
  }),
}));

vi.mock('@api/queries/registration/useRegistrationMutation', () => ({
  useRegistrationMutation: vi.fn().mockReturnValue({
    mutate: vi.fn((options) => {
      options.onSuccess({
        data: {
          businessProcessId: 'test-business-id',
        },
      });
    }),
  }),
}));

vi.mock('@stores/registration/RegistrationContractStore', () => ({
  default: {
    getState: vi.fn().mockReturnValue(mockContractStore),
    subscribe: vi.fn().mockReturnValue(vi.fn()),
  },
}));

vi.mock('@stores/registration/RegistrationDeviceStore', () => ({
  default: {
    getState: vi.fn().mockReturnValue(mockDeviceStore),
    subscribe: vi.fn().mockReturnValue(vi.fn()),
  },
}));

vi.mock('@stores/registration/RegistrationSalesStore', () => ({
  default: {
    getState: vi.fn().mockReturnValue(mockSalesStore),
    subscribe: vi.fn().mockReturnValue(vi.fn()),
  },
}));

describe('ContractSummary 컴포넌트', () => {
  let setIsSaveRequestedMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setIsSaveRequestedMock = vi.fn();
    // 환경 변수 모킹
    vi.stubEnv('NODE_ENV', 'development');

    // 각 테스트 전에 모킹 상태 초기화
    mockContractStore.getRegistrationContractInfo.mockReturnValue({
      isValidated: true,
    });
    mockDeviceStore.getRegistrationDeviceInfo.mockReturnValue({
      isValidated: true,
    });
    mockSalesStore.getRegistrationSalesInfo.mockReturnValue({
      isValidated: true,
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('컴포넌트가 올바르게 렌더링되어야 한다', () => {
    // Given: contractTabId가 주어졌을 때
    const contractTabId = 'test-tab-id';

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 컴포넌트가 올바르게 렌더링되어야 함
    expect(screen.getByText('가입정보 요약')).toBeInTheDocument();
    expect(screen.getByText('납부자명')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('저장')).toBeInTheDocument();
  });

  it('모든 스토어의 isValidated가 true일 때 저장 버튼이 활성화되어야 한다', async () => {
    // Given: contractTabId가 주어지고 모든 스토어의 isValidated가 true일 때
    const contractTabId = 'test-tab-id';

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 저장 버튼이 활성화되어야 함
    await waitFor(() => {
      const saveButton = screen.getByText('저장');
      expect(saveButton).not.toBeDisabled();
    });
  });

  it('계약 정보의 isValidated가 false일 때 저장 버튼이 비활성화되어야 한다', async () => {
    // Given: contractTabId가 주어지고 계약 정보의 isValidated가 false일 때
    const contractTabId = 'test-tab-id';
    mockContractStore.getRegistrationContractInfo.mockReturnValue({
      isValidated: false,
    });

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 저장 버튼이 비활성화되어야 함
    const saveButton = screen.getByText('저장');
    expect(saveButton).toBeDisabled();
  });

  it('기기 정보의 isValidated가 false일 때 저장 버튼이 비활성화되어야 한다', async () => {
    // Given: contractTabId가 주어지고 기기 정보의 isValidated가 false일 때
    const contractTabId = 'test-tab-id';
    mockDeviceStore.getRegistrationDeviceInfo.mockReturnValue({
      isValidated: false,
    });

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 저장 버튼이 비활성화되어야 함
    const saveButton = screen.getByText('저장');
    expect(saveButton).toBeDisabled();
  });

  it('판매 정보의 isValidated가 false일 때 저장 버튼이 비활성화되어야 한다', async () => {
    // Given: contractTabId가 주어지고 판매 정보의 isValidated가 false일 때
    const contractTabId = 'test-tab-id';
    mockSalesStore.getRegistrationSalesInfo.mockReturnValue({
      isValidated: false,
    });

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 저장 버튼이 비활성화되어야 함
    const saveButton = screen.getByText('저장');
    expect(saveButton).toBeDisabled();
  });

  it('저장 버튼 클릭 시 저장 프로세스가 시작되어야 한다', async () => {
    // Given: contractTabId가 주어졌을 때
    const contractTabId = 'test-tab-id';

    // When: 컴포넌트를 렌더링하고 저장 버튼을 클릭하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // 저장 버튼 클릭
    const saveButton = screen.getByText('저장');
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });

    fireEvent.click(saveButton);

    // Then: setIsSaveRequested가 true로 호출되어야 함
    await waitFor(() => {
      expect(setIsSaveRequestedMock).toHaveBeenCalledWith(true);
    });
  });

  it('저장 중일 때 저장 버튼이 비활성화되고 텍스트가 변경되어야 한다', async () => {
    // Given: contractTabId가 주어졌을 때
    const contractTabId = 'test-tab-id';

    // When: 컴포넌트를 렌더링하고 저장 버튼을 클릭하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // 저장 버튼 클릭
    const saveButton = screen.getByText('저장');
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });

    fireEvent.click(saveButton);

    // Then: 저장 버튼이 비활성화되고 텍스트가 '저장 중...'으로 변경되어야 함
    expect(screen.getByText('저장 중...')).toBeInTheDocument();
    expect(screen.getByText('저장 중...')).toBeDisabled();
  });

  it('임시저장 버튼이 렌더링되어야 한다', () => {
    // Given: contractTabId가 주어졌을 때
    const contractTabId = 'test-tab-id';

    // When: 컴포넌트를 렌더링하면
    render(
      <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequestedMock} />,
    );

    // Then: 임시저장 버튼이 렌더링되어야 함
    expect(screen.getByText('임시저장')).toBeInTheDocument();
    expect(screen.getByText('임시저장 불러오기')).toBeInTheDocument();
  });
});

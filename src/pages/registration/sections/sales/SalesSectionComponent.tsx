import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import useRegistrationSalesStore, { Sales } from '@stores/registration/RegistrationSalesStore';
// import useCustomerStore from '@stores/CustomerStore';
import {
  StyledTextField,
  FormLabel,
  RequiredLabel,
  FormRow,
  FormGroup,
} from './SalesSectionComponent.style';

interface validationField {
  state: 'error' | 'active';
  helperText: string;
}

interface SalesSectionComponentProps {
  tabId: string;
  onComplete: () => void;
}

const SalesSectionComponent: React.FC<SalesSectionComponentProps> = ({ tabId, onComplete }) => {
  const {
    addRegistrationSalesInfo,
    updateRegistrationSalesInfo,
    getRegistrationSalesValidationFlag,
    updateRegistrationSalesValidationFlag,
  } = useRegistrationSalesStore();

  // const [customerId, setCustomerId] = useState<string>('');

  const [salesDepartment, setSalesDepartment] = useState<string>('');
  const [salesContractPoint, setSalesContractPoint] = useState<string>('');
  const [finalSeller, setFinalSeller] = useState<string>('');
  const [supporter, setSupporter] = useState<string>('');

  // const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, validationField>>({
    salesDepartment: { state: 'active', helperText: '' },
  });

  // const currentCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  // const currentSales = useRegistrationSalesStore((state) => state.sales[tabId]);
  const validationFlag = getRegistrationSalesValidationFlag(tabId);

  const salesDepartmentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // store 정보 생성
    // setCustomerId(currentCustomerId ?? '');
    addRegistrationSalesInfo(tabId);
    // 가입대리점점 필드에 포커스 설정
    if (salesDepartmentInputRef.current) {
      salesDepartmentInputRef.current.focus();
    }
  }, []);

  // 모든 필드가 채워졌는지 확인하여 완료 되었을 때만 아코디언 활성화 함수 호출(한번 활성화 되면 비활성화 X)
  useEffect(() => {
    if (validationFlag) {
      onComplete();
    }
  }, [validationFlag]);

  // 가입대리점 핸들러
  const handleSalesDepartmentChange = (salesDepartment: string) => {
    setSalesDepartment(salesDepartment);
    handleUpdateStoreAndValidationCompleteFields(tabId, {
      salesDepartment: '',
    });
    setValidationErrors((prev) => ({
      ...prev,
      salesDepartment: {
        state: !salesDepartment ? 'error' : 'active',
        helperText: !salesDepartment ? '가입대리점을 입력해 주세요' : '',
      },
    }));
  };

  // 접점 핸들러
  const handleSalesContractPointChange = (salesContractPoint: string) => {
    setSalesContractPoint(salesContractPoint);
    handleUpdateStoreAndValidationCompleteFields(tabId, {
      salesContractPoint: '',
    });
  };

  // 판매자 핸들러
  const handleFinalSellerChange = (finalSeller: string) => {
    setFinalSeller(finalSeller);
    handleUpdateStoreAndValidationCompleteFields(tabId, {
      finalSeller: '',
    });
  };

  // 서포터 핸들러
  const handleSupporterChange = (supporter: string) => {
    setSupporter(supporter);
    handleUpdateStoreAndValidationCompleteFields(tabId, {
      supporter: '',
    });
  };

  const handleUpdateStoreAndValidationCompleteFields = (
    tabId: string,
    partialSales: Partial<Sales>,
  ) => {
    // 스토어에 변경사항 업데이트 하고 모든 필드가 채워졌는지 validation field도 업데이트
    updateRegistrationSalesInfo(tabId, partialSales);
    updateRegistrationSalesValidationFlag(tabId);
  };

  return (
    <Box>
      <FormRow>
        <FormGroup>
          <FormLabel>
            가입대리점<RequiredLabel>*</RequiredLabel>
          </FormLabel>
          <StyledTextField
            variant='outlined'
            value={salesDepartment}
            onChange={handleSalesDepartmentChange}
            onBlur={() => {
              handleUpdateStoreAndValidationCompleteFields(tabId, {
                salesDepartment: salesDepartment,
              });
            }}
            state={validationErrors.salesDepartment.state}
            absoluteHelperText={true}
            helperText={validationErrors.salesDepartment.helperText}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
            inputRef={salesDepartmentInputRef}
            data-testid='sales-department-input'
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>접점</FormLabel>
          <StyledTextField
            value={salesContractPoint}
            onChange={handleSalesContractPointChange}
            onBlur={() => {
              handleUpdateStoreAndValidationCompleteFields(tabId, {
                salesContractPoint: salesContractPoint,
              });
            }}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
            data-testid='sales-contact-point-input'
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>판매자</FormLabel>
          <StyledTextField
            value={finalSeller}
            onChange={handleFinalSellerChange}
            onBlur={() => {
              handleUpdateStoreAndValidationCompleteFields(tabId, {
                finalSeller: finalSeller,
              });
            }}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
            data-testid='finalseller-input'
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>서포터</FormLabel>
          <StyledTextField
            value={supporter}
            onChange={handleSupporterChange}
            onBlur={() => {
              handleUpdateStoreAndValidationCompleteFields(tabId, {
                supporter: supporter,
              });
            }}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
            data-testid='supporter-input'
          />
        </FormGroup>
      </FormRow>
    </Box>
  );
};

export default SalesSectionComponent;

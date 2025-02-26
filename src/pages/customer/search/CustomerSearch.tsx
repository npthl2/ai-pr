import { useState, useEffect } from 'react';
import {
  CustomerSearchModal,
  CustomerSearchContainer,
  SearchTitle,
  RowWrapper,
  CustomerSearchButton,
  RadioGroupContainer,
  RadioButtonWrapper,
} from './CustomerSearch.styled';
import { FieldValidation, CustomerSearchForm } from './CustomerSearch.model';
import TextField from '@components/TextField';
import Radio from '@components/Radio';
import SearchIcon from '@mui/icons-material/Search';

import { Gender, CustomerSearchResponse } from '@model/Customer';
import Alert from '@components/Alert';
import Dialog from '@components/Dialog';

import useCustomerStore from '@stores/CustomerStore';
import customerService from '@api/services/customerService';
import { CommonResponse } from '@model/common/CommonResponse';
import { grey } from '@mui/material/colors';
import { Modal, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMenuStore from '@stores/MenuStore';
import { MainMenu } from '@constants/CommonConstant';

interface CustomerSearchProps {
  isAuthority: boolean; // 권한 체크
  open: boolean;
  onCloseModal: () => void;
}

const CustomerSearch = ({ isAuthority, open, onCloseModal }: CustomerSearchProps) => {
  // -- 공통 에러 메시지 --
  const errorMessages = {
    name: '이름을 입력해주세요.',
    birthDate: '생년월일을 입력해주세요.',
    phoneNumber: '전화번호를 입력해주세요.',
  };

  // 검색 폼 상태 (이름, 생년월일, 성별, 전화번호)
  const [searchData, setSearchData] = useState<CustomerSearchForm>({
    name: '',
    birthDate: '',
    gender: Gender.MALE,
    phoneNumber: '',
  });

  // 각 필드에 대한 유효성 검증 상태
  const [validation, setValidation] = useState<{
    name: FieldValidation;
    birthDate: FieldValidation;
    phoneNumber: FieldValidation;
  }>({
    name: { error: false, state: 'inactive', helperText: '' },
    birthDate: { error: false, state: 'inactive', helperText: '' },
    phoneNumber: { error: false, state: 'inactive', helperText: '' },
  });

  // 조회 결과 메시지 (오류 또는 알림)
  const [searchResult, setSearchResult] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  // 버튼 활성화 여부
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  // Dialog (최대 10명 초과 시) 열림 상태
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addCustomer } = useCustomerStore();
  const navigate = useNavigate();
  const { setSelectedMainMenu } = useMenuStore();
  // -- 버튼 활성화: 이름과 생년월일이 모두 입력되거나 전화번호가 입력되면 활성화 --
  useEffect(() => {
    const enable =
      (searchData.name.trim() !== '' && searchData.birthDate.trim() !== '') ||
      searchData.phoneNumber.trim() !== '';
    setButtonDisabled(!enable);
  }, [searchData]);

  /**
   * 검색 폼 상태 업데이트 함수.
   * 각 필드가 변경되면 나머지 관련 필드를 초기화하도록 함
   */
  const updateSearchData = (field: keyof CustomerSearchForm, value: string) => {
    setSearchData((prev) => {
      const newData = { ...prev, [field]: value };
      // name, birthDate, phoneNumber는 서로 배타적 입력
      if (field === 'name' || field === 'birthDate') {
        newData.phoneNumber = '';
      } else if (field === 'phoneNumber') {
        newData.name = '';
        newData.birthDate = '';
      }
      return newData;
    });
  };

  /**
   * 특정 필드의 값이 비어있는지 검사하여 validation 상태를 업데이트하는 공통 함수
   */
  const validateAndSetField = (field: keyof Omit<CustomerSearchForm, 'gender'>, value: string) => {
    setValidation((prev) => ({
      ...prev,
      [field]: {
        error: !value.trim(),
        state: value.trim() ? 'inactive' : 'error',
        helperText: value.trim() ? '' : errorMessages[field],
      },
    }));
  };

  /**
   * 특정 필드 validation 상태 초기화
   */
  const resetFieldValidation = (field: keyof Omit<CustomerSearchForm, 'gender'>) => {
    setValidation((prev) => ({
      ...prev,
      [field]: {
        error: false,
        state: 'inactive',
        helperText: '',
      },
    }));
  };

  // -- onBlur 핸들러: 각 필드의 현재 값으로 validation 상태 업데이트 --
  const handleBlur = (field: keyof Omit<CustomerSearchForm, 'gender'>) => {
    validateAndSetField(field, searchData[field] as string);
  };

  // -- onChange 핸들러들 --
  const handleNameChange = (value: string) => {
    validateAndSetField('name', value);
    updateSearchData('name', value);
    // 필드 validation초기화
    resetFieldValidation('phoneNumber');
  };

  const handleBirthDateChange = (value: string) => {
    // 숫자만 남김
    const validValue = value.replace(/\D/g, '');
    validateAndSetField('birthDate', validValue);
    updateSearchData('birthDate', validValue);
    // 필드 validation초기화
    resetFieldValidation('phoneNumber');
  };

  const handlePhoneNumberChange = (value: string) => {
    const validValue = value.replace(/\D/g, '');
    validateAndSetField('phoneNumber', validValue);
    updateSearchData('phoneNumber', validValue);
    // 필드 validation초기화
    resetFieldValidation('name');
    resetFieldValidation('birthDate');
  };

  const handleGenderChange = (value: Gender) => {
    setSearchData((prev) => ({ ...prev, gender: value }));
  };

  const handleSearch = async () => {
    try {
      // API 호출
      const response: CommonResponse<CustomerSearchResponse> = await customerService.fetchCustomer({
        customerName: searchData.name,
        birthDate: searchData.birthDate,
        gender: searchData.gender,
        phoneNumber: searchData.phoneNumber,
      });

      // 응답 구조: successOrNot, statusCode, data
      if (response.successOrNot === 'N' && response.data === 'Customer not found') {
        // 고객 정보가 없는 경우
        setSearchResult({
          error: true,
          message: '등록된 고객 정보가 없습니다.',
        });
      } else if (
        response.successOrNot === 'Y' &&
        response.data &&
        typeof response.data !== 'string'
      ) {
        // 에러메세지 초기화
        setSearchResult({
          error: false,
          message: '',
        });

        // store에 고객 추가 또는 활성화
        const data: CustomerSearchResponse = response.data;
        const result = addCustomer({
          id: data.customerId,
          name: data.customerName,
          encryptedName: data.encryptedCustomerName,
          rrno: data.rrno,
          encryptedRrno: data.encryptedRrno,
          age: data.age,
          gender: data.gender === 'M' ? Gender.MALE : Gender.FEMALE,
          contractId: data.contractId,
        });

        // store에서 10명 이상 추가 불가 시 false 반환
        if (!result) {
          setDialogOpen(true);
        } else {
          navigate('/customer');
          setSelectedMainMenu(MainMenu.MENU);
          onClose();
        }
      } else {
        setSearchResult({
          error: true,
          message: '조회 실패',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSearchResult({
        error: true,
        message: '알수 없는 오류',
      });
    }
  };

  const onClose = () => {
    setSearchData({
      name: '',
      birthDate: '',
      gender: Gender.MALE,
      phoneNumber: '',
    });
    // 필드 validation초기화
    resetFieldValidation('name');
    resetFieldValidation('birthDate');
    resetFieldValidation('phoneNumber');

    // 에러메세지 초기화
    setSearchResult({
      error: false,
      message: '',
    });
    onCloseModal();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'transparent' },
        },
      }}
      data-testid='customer-search-modal'
    >
      <CustomerSearchModal>
        <CustomerSearchContainer>
          {/* 제목 영역 */}
          <SearchTitle>고객조회</SearchTitle>

          {/* 입력 요소 영역 */}
          {isAuthority && (
            <RowWrapper>
              <TextField
                state={validation.phoneNumber.state}
                error={validation.phoneNumber.error}
                absoluteHelperText={true}
                helperText={validation.phoneNumber.helperText}
                value={searchData.phoneNumber}
                onChange={(value: string) => handlePhoneNumberChange(value)}
                onBlur={() => handleBlur('phoneNumber')}
                slotProps={{
                  htmlInput: {
                    maxLength: 14,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  },
                }}
                placeholder='* 전화번호 (숫자만 입력)'
                data-testid='customer-phone'
              />
            </RowWrapper>
          )}
          {isAuthority && (
            <Divider>
              <Typography variant='body2' sx={{ color: grey[400] }}>
                Or
              </Typography>
            </Divider>
          )}

          <RowWrapper>
            <TextField
              state={validation.name.state}
              error={validation.name.error}
              absoluteHelperText={true}
              helperText={validation.name.helperText}
              value={searchData.name}
              onChange={(value: string) => handleNameChange(value)}
              onBlur={() => handleBlur('name')}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}
              placeholder='* 이름'
              data-testid='customer-name'
            />
            <TextField
              size='medium'
              state={validation.birthDate.state}
              error={validation.birthDate.error}
              absoluteHelperText={true}
              helperText={validation.birthDate.helperText}
              value={searchData.birthDate}
              onChange={(value: string) => handleBirthDateChange(value)}
              onBlur={() => handleBlur('birthDate')}
              slotProps={{
                htmlInput: {
                  maxLength: 6,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                },
              }}
              placeholder='* 생년월일 (yymmdd)'
              data-testid='customer-birthdate'
            />
            {/* 라디오 버튼 그룹 */}
            <RadioGroupContainer>
              {/* 남 */}
              <RadioButtonWrapper onClick={() => handleGenderChange(Gender.MALE)}>
                <Radio
                  checked={searchData.gender === Gender.MALE}
                  size='small'
                  color='primary'
                  label='남'
                  // Radio 컴포넌트 내부에서 hover, disabled 등 기본값이 처리되어 있다고 가정
                />
              </RadioButtonWrapper>
              {/* 여 */}
              <RadioButtonWrapper onClick={() => handleGenderChange(Gender.FEMALE)}>
                <Radio
                  checked={searchData.gender === Gender.FEMALE}
                  size='small'
                  color='primary'
                  label='여'
                />
              </RadioButtonWrapper>
            </RadioGroupContainer>
          </RowWrapper>

          {searchResult.error && (
            <Alert variant='standard' severity='error'>
              {searchResult.message}
            </Alert>
          )}

          <Dialog
            open={dialogOpen}
            size='small' // Dialog 사이즈: small, medium, large 중 선택
            title='고객 조회 제한 알림'
            content='고객은 최대 10명까지 조회할 수 있습니다\n더 이상 조회하지 않는 고객을 닫아주세요.'
            confirmLabel='확인'
            closeLabel=''
            onClose={() => setDialogOpen(false)}
            onConfirm={() => setDialogOpen(false)}
          />

          {/* 버튼 영역 */}
          <CustomerSearchButton
            variant='contained'
            size='small'
            color='primary'
            iconComponent={<SearchIcon />}
            iconPosition='left'
            iconSize={12}
            onClick={handleSearch}
            disabled={isButtonDisabled}
            data-testid='customer-search-button'
          >
            고객조회
          </CustomerSearchButton>
        </CustomerSearchContainer>
      </CustomerSearchModal>
    </Modal>
  );
};

export default CustomerSearch;

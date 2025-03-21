import { useState, useEffect, useRef } from 'react';
import {
  CustomerSearchModal,
  CustomerSearchContainer,
  SearchTitle,
  RowWrapper,
  CustomerSearchButton,
  RadioGroupContainer,
  RadioButtonWrapper,
} from './CustomerSearch.styled';
import { CustomerSearchProps, CustomerSearchForm, Validation } from './CustomerSearch.model';
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
import useMenuStore from '@stores/MenuStore';
import { MainMenu, ROLE_SEARCH_TEL_NO } from '@constants/CommonConstant';
import { getTheme } from '@theme/theme';
import { Draft, produce } from 'immer';
import { useHotkeys } from 'react-hotkeys-hook';

// -- 공통 에러 메시지 --
const errorMessages = {
  name: '이름을 입력해주세요.',
  birthDate: '생년월일을 입력해주세요.',
  phoneNumber: '전화번호를 입력해주세요.',
};

// 검색 폼 초기값
const initCustomerSearchForm: CustomerSearchForm = {
  name: '',
  birthDate: '',
  gender: Gender.MALE,
  phoneNumber: '',
};

// validation 초기값
const initValidation: Validation = {
  name: { error: false, state: 'inactive', helperText: '' },
  birthDate: { error: false, state: 'inactive', helperText: '' },
  phoneNumber: { error: false, state: 'inactive', helperText: '' },
};

const initState = {
  searchData: initCustomerSearchForm,
  validation: initValidation,
  isButtonDisabled: true,
  dialogOpen: false,
};

const useImmerState = <T extends Record<string, any>>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const updateState = (fn: (draft: Draft<T>) => void) => {
    setState((prevState) => produce(prevState, fn));
  };

  return [state, updateState] as const;
};

const CustomerSearch = ({ authority, open, onCloseModal }: CustomerSearchProps) => {
  const [state, updateState] = useImmerState(initState);
  const [hotkeyEnabled, setHotkeyEnabled] = useState(false);

  // 조회 결과 메시지 (오류 또는 알림)
  const [searchResult, setSearchResult] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const hasSearchTelAuthority = authority?.includes(ROLE_SEARCH_TEL_NO) ?? false;

  const { addCustomer, handleMoveToTab, setMoveTab } = useCustomerStore();
  const { setSelectedMainMenu } = useMenuStore();

  const phoneNumberRef = useRef<HTMLTextAreaElement>(null);
  const customerNameRef = useRef<HTMLTextAreaElement>(null);

  useHotkeys(
    'enter',
    () => {
      if (!state.isButtonDisabled) {
        handleSearch();
      }
    },
    {
      enabled: hotkeyEnabled,
      enableOnFormTags: ['INPUT', 'TEXTAREA'],
      enableOnContentEditable: true,
    },
  );

  useEffect(() => {
    setHotkeyEnabled(open);

    // 모달이 닫히면 핫키를 비활성화
    return () => {
      setHotkeyEnabled(false);
    };
  }, [open]);

  // input box포커스
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const target = hasSearchTelAuthority ? phoneNumberRef.current : customerNameRef.current;
      target?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [open, hasSearchTelAuthority]);

  // -- 버튼 활성화: 이름과 생년월일이 모두 입력되거나 전화번호가 입력되면 활성화 --
  useEffect(() => {
    const { searchData } = state;
    const enable =
      (searchData.name.trim() !== '' && searchData.birthDate.trim() !== '') ||
      searchData.phoneNumber.trim() !== '';
    updateState((draft) => {
      draft.isButtonDisabled = !enable;
    });
  }, [state.searchData, updateState]);

  /**
   * 검색 폼 상태 업데이트 함수.
   * 각 필드가 변경되면 나머지 관련 필드를 초기화하도록 함
   */
  const updateSearchData = (field: keyof CustomerSearchForm, value: string) => {
    updateState((draft) => {
      if (field === 'gender') {
        draft.searchData[field] = value === 'M' ? Gender.MALE : Gender.FEMALE;
      } else {
        draft.searchData[field] = value;
      }

      // name, birthDate, phoneNumber는 서로 배타적 입력
      if (field === 'name' || field === 'birthDate') {
        draft.searchData.phoneNumber = '';
      } else if (field === 'phoneNumber') {
        draft.searchData.name = '';
        draft.searchData.birthDate = '';
      }
    });
  };

  /**
   * 특정 필드의 값이 비어있는지 검사하여 validation 상태를 업데이트하는 공통 함수
   */
  const validateAndSetField = (field: keyof Omit<CustomerSearchForm, 'gender'>, value: string) => {
    updateState((draft) => {
      draft.validation[field] = {
        error: !value.trim(),
        state: value.trim() ? 'inactive' : 'error',
        helperText: value.trim() ? '' : errorMessages[field],
      };
    });
  };

  /**
   * 특정 필드 validation 상태 초기화
   */
  const resetFieldValidation = (field: keyof Omit<CustomerSearchForm, 'gender'>) => {
    updateState((draft) => {
      draft.validation[field] = {
        error: false,
        state: 'inactive',
        helperText: '',
      };
    });
  };

  // -- onBlur 핸들러: 각 필드의 현재 값으로 validation 상태 업데이트 --
  const handleBlur = (field: keyof Omit<CustomerSearchForm, 'gender'>) => {
    validateAndSetField(field, state.searchData[field] as string);
  };

  // -- onChange 핸들러 --
  const handleNameChange = (value: string) => {
    validateAndSetField('name', value.trim());
    updateSearchData('name', value.trim());
    // 필드 validation초기화
    resetFieldValidation('phoneNumber');
  };

  const handleBirthDateChange = (value: string) => {
    // 숫자만 남김
    const validValue = value.replace(/\D/g, '');
    validateAndSetField('birthDate', validValue.trim());
    updateSearchData('birthDate', validValue.trim());
    // 필드 validation초기화
    resetFieldValidation('phoneNumber');
  };

  const handlePhoneNumberChange = (value: string) => {
    const validValue = value.replace(/\D/g, '');
    validateAndSetField('phoneNumber', validValue.trim());
    updateSearchData('phoneNumber', validValue.trim());
    // 필드 validation초기화
    resetFieldValidation('name');
    resetFieldValidation('birthDate');
  };

  const handleGenderChange = (value: Gender) => {
    updateState((draft) => {
      draft.searchData.gender = value;
    });
  };

  const handleSearch = async () => {
    try {
      const { searchData } = state;
      // API 호출
      const response: CommonResponse<CustomerSearchResponse> = await customerService.fetchCustomer({
        customerName: searchData.name.trim(),
        birthDate: searchData.birthDate.trim(),
        gender: searchData.gender,
        phoneNumber: searchData.phoneNumber.trim(),
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
          unmaskingName: '',
          rrno: data.rrno,
          encryptedRrno: data.encryptedRrno,
          unmaskingRrno: '',
          age: data.age,
          gender: data.gender === 'M' ? Gender.MALE : Gender.FEMALE,
          contractId: data.contractId,
        });

        // store에서 10명 이상 추가 불가 시 false 반환
        if (!result) {
          updateState((draft) => {
            draft.dialogOpen = true;
          });
        } else {
          // 사용자가 추가한 탭이 있으면 추가 탭으로 이동
          handleMoveToTab();
          setSelectedMainMenu(MainMenu.CUSTOMERS);
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
    updateState((draft) => {
      draft.searchData = initCustomerSearchForm;
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

    // 이동할 탭 초기화
    setMoveTab(null);

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
        <CustomerSearchContainer theme={getTheme('light')}>
          {/* 제목 영역 */}
          <SearchTitle>고객조회</SearchTitle>

          {/* 입력 요소 영역 */}
          {hasSearchTelAuthority && (
            <RowWrapper>
              <TextField
                inputRef={phoneNumberRef}
                state={state.validation.phoneNumber.state}
                error={state.validation.phoneNumber.error}
                absoluteHelperText={true}
                helperText={state.validation.phoneNumber.helperText}
                value={state.searchData.phoneNumber}
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
          {hasSearchTelAuthority && (
            <Divider>
              <Typography variant='body2' sx={{ color: grey[400] }}>
                Or
              </Typography>
            </Divider>
          )}

          <RowWrapper>
            <TextField
              inputRef={customerNameRef}
              state={state.validation.name.state}
              error={state.validation.name.error}
              absoluteHelperText={true}
              helperText={state.validation.name.helperText}
              value={state.searchData.name}
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
              state={state.validation.birthDate.state}
              error={state.validation.birthDate.error}
              absoluteHelperText={true}
              helperText={state.validation.birthDate.helperText}
              value={state.searchData.birthDate}
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
            <RadioGroupContainer>
              <RadioButtonWrapper>
                <Radio
                  checked={state.searchData.gender === Gender.MALE}
                  size='small'
                  color='primary'
                  label='남'
                  onClick={() => handleGenderChange(Gender.MALE)}
                />
              </RadioButtonWrapper>
              <RadioButtonWrapper>
                <Radio
                  checked={state.searchData.gender === Gender.FEMALE}
                  size='small'
                  color='primary'
                  label='여'
                  onClick={() => handleGenderChange(Gender.FEMALE)}
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
            open={state.dialogOpen}
            size='small' // Dialog 사이즈: small, medium, large 중 선택
            title='고객 조회 제한 알림'
            content='고객은 최대 10명까지 조회할 수 있습니다.
            더 이상 조회하지 않는 고객을 닫아주세요.'
            confirmLabel='확인'
            closeLabel=''
            onClose={() =>
              updateState((draft) => {
                draft.dialogOpen = false;
              })
            }
            onConfirm={() =>
              updateState((draft) => {
                draft.dialogOpen = false;
              })
            }
          />

          {/* 버튼 영역 */}
          <CustomerSearchButton
            theme={getTheme('light')}
            variant='contained'
            size='small'
            color='primary'
            iconComponent={<SearchIcon />}
            iconPosition='left'
            iconSize={12}
            onClick={handleSearch}
            disabled={state.isButtonDisabled}
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

import { Typography, Divider, Box, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@components/TextField';
import Radio from '@components/Radio';
import { FormContainer } from './common/SectionCommon.styled';
import { InvoiceCreateRequestParams } from '@model/registration/Invoice';
import {
  MandatoryTypography,
  LabelTypography,
  StyledRadioGroup,
  CaptionTypography,
  InvoiceCard,
  InformationIcon,
  LabelWrapper,
  AddressSearchIcon,
  InvoiceCheckIcon,
  SelectLabel,
} from './InvoiceSection.styled';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import Select from '@components/Select';
import Button from '@components/Button';
import { useState, useEffect, useMemo, useRef } from 'react';
import useToastStore from '@stores/ToastStore';
import { useInvoiceQuery } from '@api/queries/registration/useInvoiceQuery';
import { useInvoiceMutation } from '@api/queries/registration/useInvoiceMutation';
import InvoiceListModal from './invoice/InvoiceListModal';
import {
  BillingType,
  InvoiceType,
  PaymentMethod,
  PaymentDate,
  invoiceTypeOptions,
  paymentMethodOptions,
  paymentDateOptions,
  bankCompanyOptions,
  cardCompanyOptions,
  invoiceEmailDomainOptions,
  BankCompanyCode,
  CardCompanyCode,
} from './invoiceSection.model';
import { Invoice } from '@model/registration/Invoice';
import { SelectChangeEvent } from '@mui/material';
import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
import InvoiceAddressSearchModal from './invoice/InvoiceAddressSearchModal';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';

interface InvoiceSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

interface InvoiceFormData {
  billingType: BillingType;
  recipient: string;
  invoiceType: InvoiceType;
  invoiceEmailId: string;
  invoiceEmailDomainType: string;
  invoiceEmailDomain: string;
  invoicePostalCode: string;
  invoiceAddress: string;
  invoiceAddressDetail: string;
  paymentMethod: PaymentMethod;
  bankCompany: string;
  bankAccount: string;
  cardCompany: string;
  cardNumber: string;
  paymentDate: PaymentDate;
  paymentName: string;
  birthDate: string;
}

const initialInvoiceFormData: InvoiceFormData = {
  billingType: BillingType.COMMON,
  recipient: '',
  invoiceType: InvoiceType.MOBILE,
  invoiceEmailId: '',
  invoiceEmailDomainType: '',
  invoiceEmailDomain: '',
  invoicePostalCode: '',
  invoiceAddress: '',
  invoiceAddressDetail: '',
  paymentMethod: PaymentMethod.BANK,
  bankCompany: '',
  bankAccount: '',
  cardCompany: '',
  cardNumber: '',
  paymentDate: PaymentDate.D26,
  paymentName: '',
  birthDate: '',
};

type InvoiceError = {
  [key in
    | 'recipient'
    | 'invoiceEmailId'
    | 'invoiceEmailDomainType'
    | 'invoiceEmailDomain'
    | 'invoicePostalCode'
    | 'invoiceAddress'
    | 'invoiceAddressDetail'
    | 'bankCompany'
    | 'bankAccount'
    | 'cardCompany'
    | 'cardNumber'
    | 'paymentName'
    | 'birthDate']: boolean;
};

const initialInvoiceError: InvoiceError = {
  recipient: false,
  invoiceEmailId: false,
  invoiceEmailDomainType: false,
  invoiceEmailDomain: false,
  invoicePostalCode: false,
  invoiceAddress: false,
  invoiceAddressDetail: false,
  bankCompany: false,
  bankAccount: false,
  cardCompany: false,
  cardNumber: false,
  paymentName: false,
  birthDate: false,
};

const InvoiceSection = ({ contractTabId, onComplete, completed }: InvoiceSectionProps) => {
  const theme = useTheme();
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const customerInfo = getRegistrationCustomerInfo(contractTabId);
  const activeCustomerId = customerInfo?.customerId ?? '';
  const { getRegistrationInvoiceInfo, setRegistrationInvoiceInfo } = useRegistrationInvoiceStore();
  const registrationInvoiceInfo = getRegistrationInvoiceInfo(contractTabId);
  const openToast = useToastStore((state) => state.openToast);

  const queryClient = useQueryClient();
  const { data: invoiceList } = useInvoiceQuery(activeCustomerId);
  const saveInvoiceMutation = useInvoiceMutation();

  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>(initialInvoiceFormData);
  const [invoiceError, setInvoiceError] = useState<InvoiceError>(initialInvoiceError);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const recipientRef = useRef<HTMLInputElement>(null);

  const isSaved = !!registrationInvoiceInfo;

  // 유효성 검사
  const validators = {
    isNumeric: (value: string) => value === '' || /^[0-9]+$/.test(value),
    isEmailId: (value: string) => value === '' || /^[a-zA-Z0-9-_]+$/.test(value),
    isEmailDomain: (value: string) => value === '' || /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    isBankAccount: (value: string) => value === '' || /^[0-9]{10,20}$/.test(value),
    isCardNumber: (value: string) => value === '' || /^[0-9]{16}$/.test(value),
    isBirthDate: (value: string) => {
      if (value === '') return true;
      if (!/^\d{6}$/.test(value)) return false;

      const year = value.substring(0, 2);
      const month = value.substring(2, 4);
      const day = value.substring(4, 6);

      // 19xx년과 20xx년 둘중 하나라도 맞는 날짜면 true 반환
      const isValid19xx = (() => {
        const date = new Date(`19${year}-${month}-${day}`);
        return (
          !isNaN(date.getTime()) &&
          date.getFullYear() === parseInt(`19${year}`) &&
          date.getMonth() + 1 === parseInt(month) &&
          date.getDate() === parseInt(day)
        );
      })();

      const isValid20xx = (() => {
        const date = new Date(`20${year}-${month}-${day}`);
        return (
          !isNaN(date.getTime()) &&
          date.getFullYear() === parseInt(`20${year}`) &&
          date.getMonth() + 1 === parseInt(month) &&
          date.getDate() === parseInt(day)
        );
      })();

      // 둘 중 하나라도 유효하면 true 반환
      return isValid19xx || isValid20xx;
    },
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (name: string) => (value: string) => {
    if (['invoicePostalCode', 'cardNumber', 'bankAccount', 'birthDate'].includes(name)) {
      if (!validators.isNumeric(value)) return;
    }
    setInvoiceFormData({ ...invoiceFormData, [name]: value });
    setInvoiceError({ ...invoiceError, [name]: false });
  };

  // 라디오 변경 핸들러
  const handleRadioChange = (name: string) => (event: SelectChangeEvent<string>) => {
    const newInvoiceFormData = { ...invoiceFormData, [name]: event.target.value };
    const newInvoiceError = { ...invoiceError, [name]: false };
    if (name === 'invoiceType') {
      newInvoiceFormData['invoiceEmailId'] = '';
      newInvoiceFormData['invoiceEmailDomain'] = '';
      newInvoiceFormData['invoiceEmailDomainType'] = '';
      newInvoiceError['invoiceEmailId'] = false;
      newInvoiceError['invoiceEmailDomain'] = false;
      newInvoiceError['invoiceEmailDomainType'] = false;
    }
    if (name === 'paymentMethod') {
      newInvoiceFormData['bankCompany'] = '';
      newInvoiceFormData['bankAccount'] = '';
      newInvoiceFormData['cardCompany'] = '';
      newInvoiceFormData['cardNumber'] = '';
      newInvoiceError['bankCompany'] = false;
      newInvoiceError['bankAccount'] = false;
      newInvoiceError['cardCompany'] = false;
      newInvoiceError['cardNumber'] = false;
    }
    setInvoiceFormData(newInvoiceFormData);
    setInvoiceError(newInvoiceError);
  };

  // Select 변경 핸들러
  const handleSelectChange = (name: string, value: string) => {
    const newInvoiceFormData = { ...invoiceFormData, [name]: value };
    const newInvoiceError = { ...invoiceError, [name]: false };
    if (name === 'invoiceEmailDomainType') {
      newInvoiceFormData['invoiceEmailDomain'] = '';
      newInvoiceError['invoiceEmailDomain'] = false;
    }
    setInvoiceFormData(newInvoiceFormData);
    setInvoiceError(newInvoiceError);
  };

  // 포커스 아웃 핸들러
  const handleFocusOut = (name: string) => () => {
    if (invoiceFormData[name as keyof InvoiceFormData] === '') {
      setInvoiceError({ ...invoiceError, [name]: true });
    }
  };

  // 청구정보 생성완료 핸들러
  const handleOnComplete = async () => {
    const invoiceCreateRequestParams: InvoiceCreateRequestParams = {
      customerId: activeCustomerId,
      billingType: invoiceFormData.billingType,
      recipient: invoiceFormData.recipient,
      invoiceType: invoiceFormData.invoiceType,
      invoiceEmail: `${invoiceFormData.invoiceEmailId}@${invoiceFormData.invoiceEmailDomainType === '직접입력' ? invoiceFormData.invoiceEmailDomain : invoiceFormData.invoiceEmailDomainType}`,
      invoicePostalCode: invoiceFormData.invoicePostalCode,
      invoiceAddress: invoiceFormData.invoiceAddress,
      invoiceAddressDetail: invoiceFormData.invoiceAddressDetail,
      paymentMethod: invoiceFormData.paymentMethod,
      bankCompany: invoiceFormData.bankCompany as BankCompanyCode,
      bankAccount: invoiceFormData.bankAccount,
      cardCompany: invoiceFormData.cardCompany as CardCompanyCode,
      cardNumber: invoiceFormData.cardNumber,
      paymentDate: invoiceFormData.paymentDate,
      paymentName: invoiceFormData.paymentName,
      birthDate: invoiceFormData.birthDate,
    };
    try {
      const result = await saveInvoiceMutation.mutateAsync(invoiceCreateRequestParams);
      if (result.data && typeof result.data === 'string') {
        openToast('청구정보 생성에 실패했습니다. 다시 시도해 주세요.');
        return;
      }

      openToast('청구정보가 생성되었습니다.');

      // 청구정보 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['invoice'] });

      // 청구정보 스토어에 저장
      if (result.data && typeof result.data === 'object') {
        setRegistrationInvoiceInfo(contractTabId, result.data);
      }
      // 다음 섹션으로 이동
      onComplete();
    } catch (error) {
      console.error(error);
      openToast('청구정보 생성에 실패했습니다. 다시 시도해 주세요.');
      return;
    }
  };

  // 청구정보 리스트 다이얼로그 - 선택 핸들러
  const handleSelectInvoice = (invoice: Invoice) => {
    setRegistrationInvoiceInfo(contractTabId, invoice);
    setModalOpen(false);
    // 다음 섹션으로 이동
    onComplete();
  };

  // 다음 주소 검색 다이얼로그 - 완료 핸들러
  const handleAddressSelectComplete = (data: { zonecode: string; address: string }) => {
    setInvoiceFormData({
      ...invoiceFormData,
      invoicePostalCode: data.zonecode,
      invoiceAddress: data.address,
    });
    setInvoiceError({
      ...invoiceError,
      invoicePostalCode: false,
      invoiceAddress: false,
    });
    setIsPostcodeOpen(false);
  };

  // 다음 주소 검색 다이얼로그 - 닫기 핸들러
  const handleAddressModalClose = () => {
    setIsPostcodeOpen(false);
    setInvoiceError({
      ...invoiceError,
      invoicePostalCode: !invoiceFormData.invoicePostalCode,
      invoiceAddress: !invoiceFormData.invoiceAddress,
    });
  };

  useEffect(() => {
    // 진입시 수령인 포커스
    if (recipientRef.current) {
      recipientRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // select box에 선택된 값이 있으면 에러 제거.
    // select onClose시 값을 선택했는지 확인이 불가하여 추가 보완로직 수현
    ['invoiceEmailDomainType', 'bankCompany', 'cardCompany'].forEach((name) => {
      if (invoiceFormData[name as keyof InvoiceFormData] !== '') {
        setInvoiceError({ ...invoiceError, [name]: false });
      }
    });
  }, [invoiceFormData]);

  // 유효성 검사 헬퍼 텍스트
  // 포커스 아웃(invoiceError)과 validation에 따라 헬퍼 텍스트 세팅
  const helperText = useMemo(() => {
    const getFieldError = {
      recipient: () => (invoiceError.recipient ? '수령인을 입력해 주세요.' : ''),

      emailId: () =>
        invoiceError.invoiceEmailId
          ? '이메일주소를 입력해 주세요.'
          : !validators.isEmailId(invoiceFormData.invoiceEmailId)
            ? '이메일주소가 올바르지 않습니다.'
            : '',

      emailDomain: () =>
        invoiceError.invoiceEmailDomain
          ? '이메일을 입력해 주세요.'
          : !validators.isEmailDomain(invoiceFormData.invoiceEmailDomain)
            ? '형식이 올바르지 않습니다.'
            : '',

      bankAccount: () =>
        invoiceError.bankAccount ||
        (invoiceFormData.bankAccount === '' && invoiceFormData.bankCompany !== '')
          ? '계좌번호를 입력해 주세요.'
          : !validators.isBankAccount(invoiceFormData.bankAccount)
            ? '계좌번호는 10~20자리 사이 숫자로 입력해 주세요.'
            : '',

      cardNumber: () =>
        invoiceError.cardNumber ||
        (invoiceFormData.cardNumber === '' && invoiceFormData.cardCompany !== '')
          ? '카드번호를 입력해 주세요.'
          : !validators.isCardNumber(invoiceFormData.cardNumber)
            ? '카드번호는 16자리 숫자만 입력해 주세요.'
            : '',

      birthDate: () =>
        invoiceError.birthDate
          ? '생년월일을 입력해 주세요.'
          : !validators.isBirthDate(invoiceFormData.birthDate)
            ? '생년월일이 올바르지 않습니다.'
            : '',
    };

    return {
      recipient: getFieldError.recipient(),
      invoiceEmailId:
        invoiceFormData.invoiceType === InvoiceType.EMAIL ? getFieldError.emailId() : '',
      invoiceEmailDomain:
        invoiceFormData.invoiceType === InvoiceType.EMAIL ? getFieldError.emailDomain() : '',
      invoiceEmailDomainType:
        invoiceFormData.invoiceType === InvoiceType.EMAIL && invoiceError.invoiceEmailDomainType
          ? '도메인을 선택해 주세요.'
          : '',
      invoicePostalCode: invoiceError.invoicePostalCode ? '우편번호를 입력해 주세요.' : '',
      invoiceAddress: invoiceError.invoiceAddress ? '주소를 입력해 주세요.' : '',
      invoiceAddressDetail: invoiceError.invoiceAddressDetail ? '상세주소를 입력해 주세요.' : '',
      bankCompany:
        invoiceFormData.paymentMethod === PaymentMethod.BANK && invoiceError.bankCompany
          ? '은행을 선택해 주세요.'
          : '',
      bankAccount:
        invoiceFormData.paymentMethod === PaymentMethod.BANK ? getFieldError.bankAccount() : '',
      cardCompany:
        invoiceFormData.paymentMethod === PaymentMethod.CARD && invoiceError.cardCompany
          ? '카드를 선택해 주세요.'
          : '',
      cardNumber:
        invoiceFormData.paymentMethod === PaymentMethod.CARD ? getFieldError.cardNumber() : '',
      paymentName: invoiceError.paymentName ? '납부고객명을 입력해 주세요.' : '',
      birthDate: getFieldError.birthDate(),
    };
  }, [invoiceFormData, invoiceError]);

  // 버튼 비활성화 여부 결정
  const isDisabled = useMemo(
    () =>
      // validation을 모두 충족했으며 입력 필드에 값이 있는 경우 버튼 활성화
      Object.keys(helperText).some((key) => helperText[key as keyof InvoiceError] !== '') ||
      Object.keys(invoiceFormData).some((key) => {
        if (
          invoiceFormData[key as keyof InvoiceFormData] !== '' &&
          invoiceFormData[key as keyof InvoiceFormData] !== null
        ) {
          return false;
        }
        if (key === 'invoiceEmailId' || key === 'invoiceEmailDomainType') {
          return invoiceFormData['invoiceType'] === InvoiceType.EMAIL;
        }
        if (key === 'invoiceEmailDomain') {
          return (
            invoiceFormData['invoiceType'] === InvoiceType.EMAIL &&
            invoiceFormData['invoiceEmailDomainType'] === '직접입력'
          );
        }
        if (key === 'bankCompany' || key === 'bankAccount') {
          return invoiceFormData['paymentMethod'] === PaymentMethod.BANK;
        }
        if (key === 'cardCompany' || key === 'cardNumber') {
          return invoiceFormData['paymentMethod'] === PaymentMethod.CARD;
        }
      }),
    [invoiceFormData, helperText],
  );

  return (
    <FormContainer completed={completed} sx={{ position: 'relative' }}>
      {/* 상단 영역 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InformationIcon />
          <CaptionTypography>
            청구정보를 입력해 생성하거나, 기존 청구정보를 선택하세요.
          </CaptionTypography>
        </Box>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={() => {
            setModalOpen(true);
          }}
          disabled={!activeCustomerId || invoiceList?.length === 0 || isSaved}
          data-testid='invoice-search-button'
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
          }}
        >
          청구정보조회
        </Button>
      </Box>

      {/* 구분선 */}
      <Divider orientation='horizontal' flexItem sx={{ mx: 1, margin: '5px 0 20px' }} />

      {/* 하단 영역 */}
      <Grid container spacing={2} sx={{ marginRight: '-16px' }}>
        {/* 왼쪽 영역 */}
        <Grid size={5.8}>
          <InvoiceCard isSaved={isSaved}>
            {/* 청구번호 구분 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>청구번호 구분</LabelTypography>
              </LabelWrapper>
              <Box>
                <Typography variant='body2'>일반</Typography>
              </Box>
            </Box>

            {/* 청구번호 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>청구번호</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <Typography variant='body2'>{registrationInvoiceInfo?.invoiceId}</Typography>
              </Box>
            </Box>

            {/* 수령인 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>수령인</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                {isSaved ? (
                  <Typography variant='body2'>{registrationInvoiceInfo?.recipient}</Typography>
                ) : (
                  <TextField
                    size='small'
                    fullWidth
                    value={invoiceFormData.recipient}
                    onChange={handleInputChange('recipient')}
                    maxLength={50}
                    state={helperText.recipient ? 'error' : 'inactive'}
                    helperText={helperText.recipient}
                    absoluteHelperText
                    onBlur={handleFocusOut('recipient')}
                    inputRef={recipientRef}
                    data-testid='invoice-recipient-input'
                  />
                )}
              </Box>
            </Box>

            {/* 발송형태 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>발송형태</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              {isSaved ? (
                <Box>
                  <Typography variant='body2'>{registrationInvoiceInfo?.invoiceType}</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                  <Box>
                    <StyledRadioGroup row>
                      {invoiceTypeOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option.value}
                          checked={invoiceFormData.invoiceType === option.value}
                          onChange={handleRadioChange('invoiceType')}
                          label={option.label}
                          data-testid={`invoice-type-radio-${option.value}`}
                        />
                      ))}
                    </StyledRadioGroup>
                  </Box>
                  {invoiceFormData.invoiceType === InvoiceType.EMAIL && (
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <TextField
                        size='small'
                        placeholder='이메일주소*'
                        fullWidth
                        value={invoiceFormData.invoiceEmailId}
                        onChange={handleInputChange('invoiceEmailId')}
                        maxLength={200}
                        state={helperText.invoiceEmailId ? 'error' : 'inactive'}
                        helperText={helperText.invoiceEmailId}
                        absoluteHelperText
                        onBlur={handleFocusOut('invoiceEmailId')}
                        data-testid='invoice-email-id-input'
                      />
                      <Box>
                        <Select
                          sx={{ width: '100px' }}
                          value={invoiceFormData.invoiceEmailDomainType}
                          size='small'
                          displayEmpty
                          renderValue={() =>
                            invoiceFormData.invoiceEmailDomainType || (
                              <SelectLabel>선택</SelectLabel>
                            )
                          }
                          state={helperText.invoiceEmailDomainType ? 'error' : 'inactive'}
                          helperText={helperText.invoiceEmailDomainType}
                          absoluteHelperText
                          onClose={handleFocusOut('invoiceEmailDomainType')}
                          data-testid='invoice-email-domain-type-select'
                        >
                          {invoiceEmailDomainOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              onClick={() =>
                                handleSelectChange('invoiceEmailDomainType', option.value)
                              }
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <TextField
                        size='small'
                        disabled={invoiceFormData.invoiceEmailDomainType !== '직접입력'}
                        fullWidth
                        value={invoiceFormData.invoiceEmailDomain}
                        onChange={handleInputChange('invoiceEmailDomain')}
                        maxLength={53}
                        state={helperText.invoiceEmailDomain ? 'error' : 'inactive'}
                        helperText={helperText.invoiceEmailDomain}
                        absoluteHelperText
                        onBlur={handleFocusOut('invoiceEmailDomain')}
                        data-testid='invoice-email-domain-input'
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* 청구주소 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>청구주소</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>

              {isSaved ? (
                <Box data-testid='invoice-address'>
                  <Typography variant='body2'>
                    {`${registrationInvoiceInfo?.invoicePostalCode} / ${registrationInvoiceInfo?.invoiceAddress} / ${registrationInvoiceInfo?.invoiceAddressDetail}`}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Box sx={{ gap: '4px' }}>
                    <Box flex={1.3}>
                      <TextField
                        size='small'
                        placeholder='우편번호'
                        suffix={
                          <AddressSearchIcon
                            onClick={() => {
                              setIsPostcodeOpen(true);
                            }}
                            data-testid='invoice-postal-code-search-icon'
                          />
                        }
                        value={invoiceFormData.invoicePostalCode}
                        onChange={handleInputChange('invoicePostalCode')}
                        maxLength={5}
                        state={
                          helperText.invoicePostalCode ||
                          helperText.invoiceAddress ||
                          helperText.invoiceAddressDetail
                            ? 'error'
                            : 'inactive'
                        }
                        onBlur={handleFocusOut('invoicePostalCode')}
                        data-testid='invoice-postal-code-input'
                      />
                    </Box>
                    <Box flex={2}>
                      <TextField
                        size='small'
                        label='주소'
                        fullWidth
                        value={invoiceFormData.invoiceAddress}
                        onChange={handleInputChange('invoiceAddress')}
                        disabled={!invoiceFormData.invoiceAddress}
                        maxLength={40}
                        state={
                          helperText.invoicePostalCode ||
                          helperText.invoiceAddress ||
                          helperText.invoiceAddressDetail
                            ? 'error'
                            : 'inactive'
                        }
                        onBlur={handleFocusOut('invoiceAddress')}
                        data-testid='invoice-address-input'
                      />
                    </Box>
                  </Box>
                  <TextField
                    size='small'
                    placeholder='상세주소'
                    fullWidth
                    value={invoiceFormData.invoiceAddressDetail}
                    onChange={handleInputChange('invoiceAddressDetail')}
                    maxLength={100}
                    state={
                      helperText.invoicePostalCode ||
                      helperText.invoiceAddress ||
                      helperText.invoiceAddressDetail
                        ? 'error'
                        : 'inactive'
                    }
                    helperText={
                      helperText.invoicePostalCode ||
                      helperText.invoiceAddress ||
                      helperText.invoiceAddressDetail
                    }
                    absoluteHelperText
                    onBlur={handleFocusOut('invoiceAddressDetail')}
                    data-testid='invoice-address-detail-input'
                  />
                </Box>
              )}
            </Box>
          </InvoiceCard>
        </Grid>

        {/* 구분선 */}
        <Divider orientation='vertical' flexItem />

        {/* 오른쪽 영역 */}
        <Grid size={5.8}>
          <InvoiceCard isSaved={isSaved}>
            {/* 납부방법 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>납부방법</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              {isSaved ? (
                <Box>
                  {registrationInvoiceInfo?.paymentMethod === paymentMethodOptions[0].label && (
                    <Typography variant='body2'>
                      {`${registrationInvoiceInfo?.paymentMethod} / ${registrationInvoiceInfo?.bankCompany} / ${registrationInvoiceInfo?.bankAccount}`}
                    </Typography>
                  )}
                  {registrationInvoiceInfo?.paymentMethod === paymentMethodOptions[1].label && (
                    <Typography variant='body2'>
                      {`${registrationInvoiceInfo?.paymentMethod} / ${registrationInvoiceInfo?.cardCompany} / ${registrationInvoiceInfo?.cardNumber}`}
                    </Typography>
                  )}
                  {registrationInvoiceInfo?.paymentMethod === paymentMethodOptions[2].label && (
                    <Typography variant='body2'>
                      {registrationInvoiceInfo?.paymentMethod}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                  <Box>
                    <StyledRadioGroup row>
                      {paymentMethodOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option.value}
                          checked={invoiceFormData.paymentMethod === option.value}
                          onChange={handleRadioChange('paymentMethod')}
                          label={option.label}
                          data-testid={`payment-method-radio-${option.value}`}
                        />
                      ))}
                    </StyledRadioGroup>
                  </Box>

                  {invoiceFormData.paymentMethod === PaymentMethod.BANK && (
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <Box flex={1}>
                        <Select
                          fullWidth
                          value={invoiceFormData.bankCompany}
                          size='small'
                          displayEmpty
                          renderValue={() =>
                            invoiceFormData.bankCompany ? (
                              bankCompanyOptions.find(
                                (option) => option.value === invoiceFormData.bankCompany,
                              )?.label
                            ) : (
                              <SelectLabel>은행*</SelectLabel>
                            )
                          }
                          state={helperText.bankCompany ? 'error' : 'inactive'}
                          helperText={helperText.bankCompany}
                          absoluteHelperText
                          onClose={handleFocusOut('bankCompany')}
                          data-testid='invoice-bank-company-select'
                        >
                          {bankCompanyOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              onClick={() => handleSelectChange('bankCompany', option.value)}
                              data-testid={`invoice-bank-company-menu-item-${option.value}`}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box flex={2}>
                        <TextField
                          size='small'
                          placeholder='계좌번호*'
                          fullWidth
                          value={invoiceFormData.bankAccount}
                          onChange={handleInputChange('bankAccount')}
                          maxLength={20}
                          state={helperText.bankAccount ? 'error' : 'inactive'}
                          helperText={helperText.bankAccount}
                          absoluteHelperText
                          onBlur={handleFocusOut('bankAccount')}
                          data-testid='invoice-bank-account-input'
                        />
                      </Box>
                    </Box>
                  )}
                  {invoiceFormData.paymentMethod === PaymentMethod.CARD && (
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <Box flex={1}>
                        <Select
                          fullWidth
                          value={invoiceFormData.cardCompany}
                          size='small'
                          displayEmpty
                          renderValue={() =>
                            invoiceFormData.cardCompany ? (
                              cardCompanyOptions.find(
                                (option) => option.value === invoiceFormData.cardCompany,
                              )?.label
                            ) : (
                              <SelectLabel>카드*</SelectLabel>
                            )
                          }
                          state={helperText.cardCompany ? 'error' : 'inactive'}
                          helperText={helperText.cardCompany}
                          absoluteHelperText
                          onClose={handleFocusOut('cardCompany')}
                          data-testid='invoice-card-company-select'
                        >
                          {cardCompanyOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              onClick={() => handleSelectChange('cardCompany', option.value)}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box flex={2}>
                        <TextField
                          size='small'
                          placeholder={!invoiceFormData.cardNumber ? '카드번호*' : ''}
                          fullWidth
                          value={invoiceFormData.cardNumber}
                          onChange={handleInputChange('cardNumber')}
                          maxLength={16}
                          state={helperText.cardNumber ? 'error' : 'inactive'}
                          helperText={helperText.cardNumber}
                          absoluteHelperText
                          onBlur={handleFocusOut('cardNumber')}
                          data-testid='invoice-card-number-input'
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* 납부일 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>납부일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                {isSaved ? (
                  <Typography variant='body2'>{registrationInvoiceInfo?.paymentDate}</Typography>
                ) : (
                  <StyledRadioGroup row>
                    {paymentDateOptions.map((option) => (
                      <Radio
                        key={option.value}
                        value={option.value}
                        checked={invoiceFormData.paymentDate === option.value}
                        onChange={handleRadioChange('paymentDate')}
                        label={option.label}
                        data-testid={`payment-date-radio-${option.value}`}
                      />
                    ))}
                  </StyledRadioGroup>
                )}
              </Box>
            </Box>

            {/* 납부고객명 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>납부고객명</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                {isSaved ? (
                  <Typography variant='body2'>{registrationInvoiceInfo?.paymentName}</Typography>
                ) : (
                  <TextField
                    size='small'
                    fullWidth
                    value={invoiceFormData.paymentName}
                    onChange={handleInputChange('paymentName')}
                    maxLength={50}
                    state={helperText.paymentName ? 'error' : 'inactive'}
                    helperText={helperText.paymentName}
                    absoluteHelperText
                    onBlur={handleFocusOut('paymentName')}
                    data-testid='invoice-payment-name-input'
                  />
                )}
              </Box>
            </Box>

            {/* 생년월일 */}
            <Box>
              <LabelWrapper>
                <LabelTypography>생년월일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                {isSaved ? (
                  <Typography variant='body2'>{registrationInvoiceInfo?.birthDate}</Typography>
                ) : (
                  <TextField
                    size='small'
                    placeholder='YYMMDD'
                    fullWidth
                    value={invoiceFormData.birthDate}
                    onChange={handleInputChange('birthDate')}
                    maxLength={6}
                    state={helperText.birthDate ? 'error' : 'inactive'}
                    helperText={helperText.birthDate}
                    absoluteHelperText
                    onBlur={handleFocusOut('birthDate')}
                    data-testid='invoice-birth-date-input'
                  />
                )}
              </Box>
            </Box>
          </InvoiceCard>

          {/* 청구정보 생성완료 버튼 */}
          {!isSaved && (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleOnComplete}
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              disabled={isDisabled || isSaved}
              data-testid='invoice-create-button'
            >
              청구정보 생성완료
            </Button>
          )}
        </Grid>
      </Grid>

      {/* 청구정보 목록 다이얼로그 */}
      <InvoiceListModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSelectInvoice}
        invoiceList={invoiceList ?? []}
        onConfirmLabel={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <InvoiceCheckIcon />
            선택
          </Box>
        }
      />

      {/* 주소 검색 다이얼로그 */}
      <InvoiceAddressSearchModal
        open={isPostcodeOpen}
        onClose={handleAddressModalClose}
        onComplete={handleAddressSelectComplete}
        postcode={invoiceFormData.invoicePostalCode}
      />
    </FormContainer>
  );
};

export default InvoiceSection;

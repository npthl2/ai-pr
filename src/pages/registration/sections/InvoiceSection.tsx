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
} from './InvoiceSection.styled';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import Select from '@components/Select';
import Button from '@components/Button';
import { useState, useEffect, useMemo } from 'react';
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
import InvoicePostCodeModal from './invoice/InvoicePostCodeModal';
import { useQueryClient } from '@tanstack/react-query';
interface InvoiceSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

export interface InvoiceFormData {
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
  invoiceType: InvoiceType.EMAIL,
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

interface InvoiceError {
  recipient: boolean;
  invoiceEmailId: boolean;
  invoiceEmailDomainType: boolean;
  invoiceEmailDomain: boolean;
  invoicePostalCode: boolean;
  invoiceAddress: boolean;
  invoiceAddressDetail: boolean;
  bankCompany: boolean;
  bankAccount: boolean;
  cardCompany: boolean;
  cardNumber: boolean;
  paymentName: boolean;
  birthDate: boolean;
}
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
  const queryClient = useQueryClient();
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const [modalOpen, setModalOpen] = useState(false);
  const openToast = useToastStore((state) => state.openToast);
  const customerInfo = getRegistrationCustomerInfo(contractTabId);
  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>(initialInvoiceFormData);
  const [invoiceError, setInvoiceError] = useState<InvoiceError>(initialInvoiceError);
  const { registrationInvoices, getRegistrationInvoiceInfo, setRegistrationInvoiceInfo } =
    useRegistrationInvoiceStore();
  const registrationInvoiceInfo = getRegistrationInvoiceInfo(contractTabId);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  // to-do : 수정
  const activeCustomerId = 'CUST12345678';
  const { data: invoiceList } = useInvoiceQuery(activeCustomerId);
  const saveInvoiceMutation = useInvoiceMutation();

  const handleInputChange = (name: string) => (value: string) => {
    if (
      name === 'invoicePostalCode' ||
      name === 'cardNumber' ||
      name === 'bankAccount' ||
      name === 'birthDate'
    ) {
      // 숫자이거나 공백인지
      if (value !== '' && !/^[0-9]+$/.test(value)) {
        return;
      }
    }

    const newInvoiceFormData = { ...invoiceFormData, [name]: value };
    setInvoiceFormData(newInvoiceFormData);
    setInvoiceError({ ...invoiceError, [name]: false });
  };

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

  const handleFocusOut = (name: string) => () => {
    if (invoiceFormData[name as keyof InvoiceFormData] === '') {
      setInvoiceError({ ...invoiceError, [name]: true });
    }
  };

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

    const result = await saveInvoiceMutation.mutateAsync(invoiceCreateRequestParams);

    if (typeof result.data === 'string') {
      openToast('저장에 실패했습니다. 다시 시도해 주세요.');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['invoice'] });

    if (result.data) {
      setRegistrationInvoiceInfo(contractTabId, result.data);
    }
    onComplete();
  };

  const handleSelectInvoice = (invoice: Invoice) => {
    setRegistrationInvoiceInfo(contractTabId, invoice);
    setModalOpen(false);
  };

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

  const handlePostcodeClose = () => {
    setIsPostcodeOpen(false);
    setInvoiceError({
      ...invoiceError,
      invoicePostalCode: true,
      invoiceAddress: true,
    });
  };

  useEffect(() => {
    // select box에 선택된 값이 있으면 에러 제거
    ['invoiceEmailDomainType', 'bankCompany', 'cardCompany'].forEach((name) => {
      if (invoiceFormData[name as keyof InvoiceFormData] !== '') {
        setInvoiceError({ ...invoiceError, [name]: false });
      }
    });
  }, [invoiceFormData]);

  useEffect(() => {
    console.log('registrationInvoices', registrationInvoices);
  }, [registrationInvoices]);

  const helperText = useMemo(() => {
    const recipientHelperText = invoiceError.recipient ? '수령인을 입력해주세요.' : '';
    const invoiceEmailIdHelperText = invoiceError.invoiceEmailId
      ? '이메일주소를 입력해주세요.'
      : invoiceFormData.invoiceEmailId !== '' &&
          !/^[a-zA-Z0-9-_]+$/.test(invoiceFormData.invoiceEmailId)
        ? '이메일주소가 올바르지 않습니다.'
        : '';
    const invoiceEmailDomainHelperText = invoiceError.invoiceEmailDomain
      ? '이메일을 입력해주세요.'
      : invoiceFormData.invoiceEmailDomain !== '' &&
          !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(invoiceFormData.invoiceEmailDomain)
        ? '형식이 올바르지 않습니다.'
        : '';
    const invoiceEmailDomainTypeHelperText = invoiceError.invoiceEmailDomainType
      ? '도메인을 선택해주세요.'
      : '';
    const invoicePostalCodeHelperText = invoiceError.invoicePostalCode
      ? '우편번호를 입력해주세요.'
      : '';
    const invoiceAddressHelperText = invoiceError.invoiceAddress ? '주소를 입력해주세요.' : '';
    const invoiceAddressDetailHelperText = invoiceError.invoiceAddressDetail
      ? '상세주소를 입력해주세요.'
      : '';
    const bankCompanyHelperText = invoiceError.bankCompany ? '은행을 선택해주세요.' : '';
    const bankAccountHelperText =
      invoiceError.bankAccount ||
      (invoiceFormData.bankAccount === '' && invoiceFormData.bankCompany !== '')
        ? '계좌번호를 입력해주세요.'
        : invoiceFormData.bankAccount !== '' && !/^[0-9]{10,20}$/.test(invoiceFormData.bankAccount)
          ? '계좌번호는 10~20자리 사이 숫자로 입력해 주세요.'
          : '';
    const cardCompanyHelperText = invoiceError.cardCompany ? '카드를 선택해주세요.' : '';
    const cardNumberHelperText =
      invoiceError.cardNumber ||
      (invoiceFormData.cardNumber === '' && invoiceFormData.cardCompany !== '')
        ? '카드번호를 입력해주세요.'
        : invoiceFormData.cardNumber !== '' && !/^[0-9]{16}$/.test(invoiceFormData.cardNumber)
          ? '카드번호는 16자리 숫자만 입력해 주세요.'
          : '';
    const paymentNameHelperText = invoiceError.paymentName ? '납부고객명을 입력해주세요.' : '';
    const birthDateHelperText = invoiceError.birthDate
      ? '생년월일을 입력해주세요.'
      : invoiceFormData.birthDate !== '' &&
          !/^[0-9]{2}[0][0-9][0123][0-9]$/.test(invoiceFormData.birthDate) &&
          !/^[0-9]{2}[1][0-2][0123][0-9]$/.test(invoiceFormData.birthDate)
        ? '생년월일이 올바르지 않습니다.'
        : '';

    return {
      recipient: recipientHelperText,
      invoiceEmailId:
        invoiceFormData.invoiceType === InvoiceType.EMAIL ? invoiceEmailIdHelperText : '',
      invoiceEmailDomain:
        invoiceFormData.invoiceType === InvoiceType.EMAIL ? invoiceEmailDomainHelperText : '',
      invoiceEmailDomainType:
        invoiceFormData.invoiceType === InvoiceType.EMAIL ? invoiceEmailDomainTypeHelperText : '',
      invoicePostalCode: invoicePostalCodeHelperText,
      invoiceAddress: invoiceAddressHelperText,
      invoiceAddressDetail: invoiceAddressDetailHelperText,
      bankCompany:
        invoiceFormData.paymentMethod === PaymentMethod.BANK ? bankCompanyHelperText : '',
      bankAccount:
        invoiceFormData.paymentMethod === PaymentMethod.BANK ? bankAccountHelperText : '',
      cardCompany:
        invoiceFormData.paymentMethod === PaymentMethod.CARD ? cardCompanyHelperText : '',
      cardNumber: invoiceFormData.paymentMethod === PaymentMethod.CARD ? cardNumberHelperText : '',
      paymentName: paymentNameHelperText,
      birthDate: birthDateHelperText,
    };
  }, [invoiceFormData, invoiceError]);

  const isDisabled = useMemo(
    () =>
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
          disabled={invoiceList?.length === 0 || !!registrationInvoiceInfo}
        >
          청구정보조회
        </Button>
      </Box>
      <Divider orientation='horizontal' flexItem sx={{ mx: 1, margin: '5px 0 20px' }} />
      <Grid container spacing={2} sx={{ marginRight: '-16px' }}>
        <Grid size={5.8}>
          <InvoiceCard>
            <Box>
              <LabelWrapper>
                <LabelTypography>청구번호 구분</LabelTypography>
              </LabelWrapper>
              <Box>
                <Typography variant='body2'>일반</Typography>
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>청구번호</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
            </Box>
            <Box>
              <LabelWrapper>
                <LabelTypography>수령인</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <TextField
                  size='small'
                  label='수령인'
                  required
                  fullWidth
                  value={invoiceFormData.recipient}
                  onChange={handleInputChange('recipient')}
                  maxLength={50}
                  state={helperText.recipient ? 'error' : 'inactive'}
                  helperText={helperText.recipient}
                  absoluteHelperText
                  onBlur={handleFocusOut('recipient')}
                />
              </Box>
            </Box>
            <Box>
              <LabelWrapper>
                <LabelTypography>발송형태</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
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
                      />
                    ))}
                  </StyledRadioGroup>
                </Box>
                {invoiceFormData.invoiceType === InvoiceType.EMAIL && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size='small'
                      label='이메일주소'
                      required
                      fullWidth
                      value={invoiceFormData.invoiceEmailId}
                      onChange={handleInputChange('invoiceEmailId')}
                      maxLength={200}
                      state={helperText.invoiceEmailId ? 'error' : 'inactive'}
                      helperText={helperText.invoiceEmailId}
                      absoluteHelperText
                      onBlur={handleFocusOut('invoiceEmailId')}
                    />
                    <Box>
                      <Select
                        sx={{ width: '100px' }}
                        value={invoiceFormData.invoiceEmailDomainType}
                        size='small'
                        displayEmpty
                        renderValue={() => invoiceFormData.invoiceEmailDomainType || '선택'}
                        state={helperText.invoiceEmailDomainType ? 'error' : 'inactive'}
                        helperText={helperText.invoiceEmailDomainType}
                        absoluteHelperText
                        onClose={handleFocusOut('invoiceEmailDomainType')}
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
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>청구주소</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ gap: 1 }}>
                  <TextField
                    size='small'
                    label='우편번호'
                    fullWidth
                    suffix={
                      <AddressSearchIcon
                        onClick={() => {
                          setIsPostcodeOpen(true);
                        }}
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
                  />
                  <TextField
                    size='small'
                    label='주소'
                    fullWidth
                    value={invoiceFormData.invoiceAddress}
                    onChange={handleInputChange('invoiceAddress')}
                    maxLength={40}
                    state={
                      helperText.invoicePostalCode ||
                      helperText.invoiceAddress ||
                      helperText.invoiceAddressDetail
                        ? 'error'
                        : 'inactive'
                    }
                    onBlur={handleFocusOut('invoiceAddress')}
                  />
                </Box>
                <TextField
                  size='small'
                  label='상세주소'
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
                />
              </Box>
            </Box>
          </InvoiceCard>
        </Grid>

        <Divider orientation='vertical' flexItem />

        <Grid size={5.8}>
          <InvoiceCard>
            <Box>
              <LabelWrapper>
                <LabelTypography>납부방법</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
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
                      />
                    ))}
                  </StyledRadioGroup>
                </Box>

                {invoiceFormData.paymentMethod === PaymentMethod.BANK && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box>
                      <Select
                        sx={{ width: '100px' }}
                        value={invoiceFormData.bankCompany}
                        size='small'
                        displayEmpty
                        renderValue={() =>
                          invoiceFormData.bankCompany
                            ? bankCompanyOptions.find(
                                (option) => option.value === invoiceFormData.bankCompany,
                              )?.label
                            : '은행'
                        }
                        state={helperText.bankCompany ? 'error' : 'inactive'}
                        helperText={helperText.bankCompany}
                        absoluteHelperText
                        onClose={handleFocusOut('bankCompany')}
                      >
                        {bankCompanyOptions.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => handleSelectChange('bankCompany', option.value)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <TextField
                      size='small'
                      label='계좌번호'
                      required
                      fullWidth
                      value={invoiceFormData.bankAccount}
                      onChange={handleInputChange('bankAccount')}
                      maxLength={20}
                      state={helperText.bankAccount ? 'error' : 'inactive'}
                      helperText={helperText.bankAccount}
                      absoluteHelperText
                      onBlur={handleFocusOut('bankAccount')}
                    />
                  </Box>
                )}
                {invoiceFormData.paymentMethod === PaymentMethod.CARD && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box>
                      <Select
                        sx={{ width: '100px' }}
                        value={invoiceFormData.cardCompany}
                        size='small'
                        displayEmpty
                        renderValue={() =>
                          invoiceFormData.cardCompany
                            ? cardCompanyOptions.find(
                                (option) => option.value === invoiceFormData.cardCompany,
                              )?.label
                            : '카드'
                        }
                        state={helperText.cardCompany ? 'error' : 'inactive'}
                        helperText={helperText.cardCompany}
                        absoluteHelperText
                        onClose={handleFocusOut('cardCompany')}
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
                    <TextField
                      size='small'
                      label={!invoiceFormData.cardNumber ? '카드번호' : ''}
                      required
                      fullWidth
                      value={invoiceFormData.cardNumber}
                      onChange={handleInputChange('cardNumber')}
                      maxLength={16}
                      state={helperText.cardNumber ? 'error' : 'inactive'}
                      helperText={helperText.cardNumber}
                      absoluteHelperText
                      onBlur={handleFocusOut('cardNumber')}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>납부일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <StyledRadioGroup row>
                  {paymentDateOptions.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      checked={invoiceFormData.paymentDate === option.value}
                      onChange={handleRadioChange('paymentDate')}
                      label={option.label}
                    />
                  ))}
                </StyledRadioGroup>
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>납부고객명</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <TextField
                  size='small'
                  label='납부고객명'
                  required
                  fullWidth
                  value={invoiceFormData.paymentName}
                  onChange={handleInputChange('paymentName')}
                  maxLength={50}
                  state={helperText.paymentName ? 'error' : 'inactive'}
                  helperText={helperText.paymentName}
                  absoluteHelperText
                  onBlur={handleFocusOut('paymentName')}
                />
              </Box>
            </Box>
            <Box>
              <LabelWrapper>
                <LabelTypography>생년월일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <TextField
                  size='small'
                  label='YYMMDD'
                  fullWidth
                  value={invoiceFormData.birthDate}
                  onChange={handleInputChange('birthDate')}
                  maxLength={6}
                  state={helperText.birthDate ? 'error' : 'inactive'}
                  helperText={helperText.birthDate}
                  absoluteHelperText
                  onBlur={handleFocusOut('birthDate')}
                />
              </Box>
            </Box>
          </InvoiceCard>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={handleOnComplete}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            disabled={isDisabled || !!registrationInvoiceInfo}
          >
            청구정보 생성완료
          </Button>
        </Grid>
      </Grid>
      <InvoiceListModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSelectInvoice}
        invoiceList={invoiceList ?? []}
      />
      <InvoicePostCodeModal
        open={isPostcodeOpen}
        onClose={handlePostcodeClose}
        onComplete={handleAddressSelectComplete}
        postcode={invoiceFormData.invoicePostalCode}
      />
    </FormContainer>
  );
};

export default InvoiceSection;

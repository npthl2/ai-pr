import Button from '@components/Button';
import Radio from '@components/Radio';
import Dialog from '@components/Dialog';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';
import {
  LeftSection,
  RightSection,
  FieldContainer,
  FieldLabel,
  RadioWrapper,
  StyledSpan,
  RequiredSpan,
} from './DeviceSection.styled';
import DevicePaymentInstallment from './devicePayment/DevicePaymentInstallment';
import DeviceImmediate from './devicePayment/DeviceImmediate';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';

import { useState } from 'react';

interface DeviceSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const DeviceSection = ({ contractTabId, onComplete, completed }: DeviceSectionProps) => {
  const { getRegistrationDeviceInfo } = useRegistrationDeviceStore();
  const deviceInfo = getRegistrationDeviceInfo(contractTabId);

  const [values, setValues] = useState<Record<string, string>>({
    paymentType: deviceInfo?.devicePaymentType || 'installment', // Use devicePaymentType from store or fallback to 'installment'
    simPaymentType: 'simNopay', // Default value for SIM payment type
    installmentPeriod: '24',
    deviceEngagementType: '공시지원금',
  });
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'installment' | 'immediate'>('installment');

  const handleRadioChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleOnClick = () => {
    setDialogType(values.paymentType as 'installment' | 'immediate');
    setOpenPaymentDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenPaymentDialog(false);
  };

  const handleConfirmDialog = () => {
    setOpenPaymentDialog(false);
    onComplete();
  };

  const handleDevicePayment = (installmentPeriod: number, deviceEngagementType: string) => {
    setValues((prev) => ({
      ...prev,
      installmentPeriod: installmentPeriod.toString(),
      deviceEngagementType,
    }));
    handleConfirmDialog();
  };

  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed}>
      <FormWrapper>
        <LeftSection>
          <FieldContainer>
            <RadioWrapper>
              <Radio
                value='installment'
                checked={values.paymentType === 'installment'}
                onChange={handleRadioChange('paymentType')}
                label='할부'
              />
              <Radio
                value='immediate'
                checked={values.paymentType === 'immediate'}
                onChange={handleRadioChange('paymentType')}
                label='즉납'
              />
            </RadioWrapper>
          </FieldContainer>
          <FieldContainer>
            <Button variant='outlined' size='small' onClick={handleOnClick}>
              결제정보 입력
            </Button>
          </FieldContainer>
        </LeftSection>
        <FieldContainer>
          <FieldLabel>
            스폰서유형
            <RequiredSpan className='required'>*</RequiredSpan>
          </FieldLabel>
          <StyledSpan>통합스폰서</StyledSpan>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            약정기간
            <RequiredSpan className='required'>*</RequiredSpan>
          </FieldLabel>
          <StyledSpan>
            {deviceInfo?.deviceEngagementPeriod ? `${deviceInfo.deviceEngagementPeriod}개월` : ''}
          </StyledSpan>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            지원방식
            <RequiredSpan className='required'>*</RequiredSpan>
          </FieldLabel>
          <StyledSpan>{deviceInfo?.isValidated ? deviceInfo?.deviceEngagementName : ''}</StyledSpan>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>SIM비용</FieldLabel>
          <StyledSpan>0 원</StyledSpan>
        </FieldContainer>
        <RightSection>
          <FieldContainer>
            <RadioWrapper>
              <Radio
                value='simImmediate'
                checked={values.simPaymentType === 'simImmediate'}
                onChange={handleRadioChange('simPaymentType')}
                label='즉시납부'
                disabled
              />
              <Radio
                value='simAfter'
                checked={values.simPaymentType === 'simAfter'}
                onChange={handleRadioChange('simPaymentType')}
                label='후청구'
                disabled
              />
              <Radio
                value='simNopay'
                checked={values.simPaymentType === 'simNopay'}
                onChange={handleRadioChange('simPaymentType')}
                label='비구매'
                disabled
              />
            </RadioWrapper>
          </FieldContainer>
        </RightSection>
      </FormWrapper>
      <Dialog
        open={openPaymentDialog}
        size='custom'
        title='단말기결제 정보 입력'
        content={
          dialogType === 'installment' ? (
            <DevicePaymentInstallment
              onClose={handleCloseDialog}
              onDevicePayment={handleDevicePayment}
              contractTabId={contractTabId}
            />
          ) : (
            ((
              <DeviceImmediate
                onClose={handleCloseDialog}
                onDevicePayment={handleDevicePayment}
                contractTabId={contractTabId}
              />
            ) as React.ReactNode)
          )
        }
        onClose={handleCloseDialog}
        closeLabel=''
        confirmLabel=''
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '470px !important',
            width: '470px !important',
            height: '769px',
            borderRadius: '4px',
            background: '#FFFFFF',
            boxShadow: `0px 11px 15px -7px #00000033,
                       0px 24px 38px 3px #00000024,
                       0px 9px 46px 8px #0000001F`,
          },
        }}
      />
    </FormContainer>
  );
};

export default DeviceSection;

import Button from '@components/Button';
import TextField from '@components/TextField';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';
import { LeftSection, RightSection, FieldContainer, FieldLabel } from './CustomerSection.styled';

import { useState } from 'react';
import useRegistrationCustomerStore, {
  RegistrationCustomerInfo,
} from '@stores/registration/RegistrationCustomerStore';

interface CustomerSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const CustomerSection = ({ contractTabId, onComplete, completed }: CustomerSectionProps) => {
  const { getRegistrationCustomerInfo, setRegistrationCustomerInfo } =
    useRegistrationCustomerStore();
  const [customer, setCustomer] = useState<RegistrationCustomerInfo>(
    getRegistrationCustomerInfo(contractTabId) || {
      name: '',
      rrno: '',
      isConsent: false,
    },
  );

  const handleChange = (name: string) => (value: string) => {
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string) => (_: React.SyntheticEvent, checked: boolean) => {
    setCustomer({
      ...customer,
      [name]: checked,
    });
  };

  const handleOnClick = () => {
    // setRegistrationCustomerInfo(contractTabId, customer);

    // TO-DO : 추후 삭제
    setRegistrationCustomerInfo(contractTabId, {
      customerId: 'C-0000000000',
      name: customer.name,
      rrno: customer.rrno,
      isConsent: customer.isConsent,
    });
    onComplete();
  };

  return (
    <FormContainer completed={completed}>
      <FormWrapper>
        <LeftSection>
          <FieldContainer>
            <FieldLabel>
              이름
              <Typography component='span' className='required'>
                *
              </Typography>
            </FieldLabel>
            <TextField
              required
              size='small'
              value={customer.name}
              onChange={handleChange('name')}
            />
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>
              주민번호
              <Typography component='span' className='required'>
                *
              </Typography>
            </FieldLabel>
            <TextField
              required
              size='small'
              placeholder='13자리의 숫자만 입력 가능'
              value={customer.rrno}
              onChange={handleChange('rrno')}
            />
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>
              개인정보 활용
              <Typography component='span' className='required'>
                *
              </Typography>
            </FieldLabel>
            <FormControlLabel
              control={<Checkbox />}
              label='필수동의'
              sx={{ minWidth: 100 }}
              checked={customer.isConsent}
              onChange={handleCheckboxChange('isConsent')}
            />
          </FieldContainer>
        </LeftSection>

        <RightSection>
          <Button
            variant='outlined'
            size='small'
            onClick={handleOnClick}
            data-testid='name-verification-button'
          >
            실명인증
          </Button>
        </RightSection>
      </FormWrapper>
    </FormContainer>
  );
};

export default CustomerSection;

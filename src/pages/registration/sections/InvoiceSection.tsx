import { Typography, Divider, Box, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@components/TextField';
import Radio from '@components/Radio';
import { FormContainer } from './common/SectionCommon.styled';
import {
  MandatoryTypography,
  LabelTypography,
  StyledRadioGroup,
  CaptionTypography,
  InvoiceCard,
  InformationIcon,
  LabelWrapper,
} from './InvoiceSection.styled';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@components/Select';
import Button from '@components/Button';
import { useState } from 'react';
import InvoiceListModal from './invoice/InvoiceListModal';
interface InvoiceSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const InvoiceSection = ({ contractTabId, onComplete, completed }: InvoiceSectionProps) => {
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const [modalOpen, setModalOpen] = useState(false);
  const customerInfo = getRegistrationCustomerInfo(contractTabId);

  return (
    <FormContainer completed={completed} sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InformationIcon />
          <CaptionTypography>
            청구정보를 입력해 생성하거나, 기존 청구정보를 선택하세요.
          </CaptionTypography>
        </Box>
        <Button variant='outlined' size='small' color='primary' onClick={() => setModalOpen(true)}>
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
                <TextField size='small' label='수령인' required fullWidth />
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
                    <Radio value='모바일' checked={true} onChange={() => {}} label='모바일' />
                    <Radio value='이메일' checked={false} onChange={() => {}} label='이메일' />
                  </StyledRadioGroup>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField size='small' label='이메일주소' required fullWidth />
                  <Box>
                    <Select
                      sx={{ width: '100px' }}
                      value={''}
                      // onChange={()=>{} }
                      size='small'
                      displayEmpty
                      renderValue={() => '선택'}
                      // label='은행'
                      // helperText=''
                    >
                      <MenuItem value='직접입력'>직접입력</MenuItem>
                      <MenuItem value='naver.com'>naver.com</MenuItem>
                    </Select>
                  </Box>
                  <TextField size='small' disabled fullWidth />
                </Box>
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>청구주소</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ gap: 1 }}>
                  <TextField size='small' label='우편번호' fullWidth suffix={<SearchIcon />} />
                  <TextField size='small' label='주소' fullWidth />
                </Box>
                <TextField size='small' label='상세주소' fullWidth />
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
                    <Radio
                      value='은행계좌 자동이체'
                      checked={true}
                      onChange={() => {}}
                      label='은행계좌 자동이체'
                    />
                    <Radio value='카드' checked={false} onChange={() => {}} label='카드' />
                    <Radio value='지로' checked={false} onChange={() => {}} label='지로' />
                  </StyledRadioGroup>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box>
                    <Select
                      sx={{ width: '100px' }}
                      value={''}
                      // onChange={()=>{}}
                      size='small'
                      displayEmpty
                      renderValue={() => '은행'}
                      // label='은행'
                      // helperText=''
                    >
                      <MenuItem value='국민은행'>국민은행</MenuItem>
                      <MenuItem value='신한은행'>신한은행</MenuItem>
                    </Select>
                  </Box>
                  <TextField size='small' label='계좌번호' required fullWidth />
                </Box>
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>납부일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <StyledRadioGroup row>
                  <Radio value='매월26일' checked={true} onChange={() => {}} label='매월26일' />
                  <Radio value='매월말일' checked={false} onChange={() => {}} label='매월말일' />
                </StyledRadioGroup>
              </Box>
            </Box>

            <Box>
              <LabelWrapper>
                <LabelTypography>납부고객명</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <TextField size='small' label='납부고객명' required fullWidth />
              </Box>
            </Box>
            <Box>
              <LabelWrapper>
                <LabelTypography>생년월일</LabelTypography>
                <MandatoryTypography>*</MandatoryTypography>
              </LabelWrapper>
              <Box>
                <TextField size='small' placeholder='YYMMDD' fullWidth />
              </Box>
            </Box>
          </InvoiceCard>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={onComplete}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            청구정보 생성완료
          </Button>
        </Grid>
      </Grid>
      <InvoiceListModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => {}} />
    </FormContainer>
  );
};

export default InvoiceSection;

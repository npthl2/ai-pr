import { Typography, Divider, Box } from '@mui/material';
import Button from '@components/Button';
import {
  SummaryContainer,
  SummarySection,
  SummaryContents,
  SummaryItem,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
} from './ContractSummary.styled';
import { SECTION_IDS, SECTION_TITLES } from '@constants/RegistrationConstants';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';

interface ContractSummaryProps {
  contractTabId: string;
  setIsSaveRequested: (isSaveRequested: boolean) => void;
}

const ContractSummary = ({ contractTabId, setIsSaveRequested }: ContractSummaryProps) => {
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const customerInfo = getRegistrationCustomerInfo(contractTabId);

  return (
    <SummaryContainer>
      <SummarySection>
        <Typography variant='h3' sx={{ mb: 2 }}>
          가입정보 요약
        </Typography>

        <SummaryContents>
          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.INVOICE]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>납부자명</Typography>
              <Typography variant='body2' color='text.secondary'>
                {customerInfo?.name || '-'}
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>납부방법</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.SALES]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>판매채널정보</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.CONTRACT]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>개통요금제</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
          <Divider />

          <Box>
            <Typography variant='h4'>{SECTION_TITLES[SECTION_IDS.DEVICE]}</Typography>
            <SummaryItem>
              <Typography variant='body2'>스폰서정책</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>스폰서 옵션</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>출고가</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>공시지원금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>선납금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>할부원금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>총 할부수수료</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>총금액</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
            <SummaryItem>
              <Typography variant='body2'>월 할부금</Typography>
              <Typography variant='body2' color='text.secondary'>
                -
              </Typography>
            </SummaryItem>
          </Box>
        </SummaryContents>
      </SummarySection>

      <ButtonContainer>
        <LeftButtonGroup>
          <Button variant='outlined' color='grey' size='large'>
            임시저장
          </Button>
          <Button variant='outlined' color='grey' size='large'>
            임시저장 불러오기
          </Button>
        </LeftButtonGroup>
        <RightButtonGroup>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => setIsSaveRequested(true)}
          >
            저장
          </Button>
        </RightButtonGroup>
      </ButtonContainer>
    </SummaryContainer>
  );
};

export default ContractSummary;

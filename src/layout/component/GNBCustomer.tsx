import { Typography } from '@mui/material';
import { Navigation, UserSection } from './GNBCustomer.styled';
import Button from '@components/Button';
import useMemberStore from '@stores/MemberStore';
import { AUTH_UNMASKING } from '@constants/CommonConstant';

interface GNBCustomerProps {
  name: string; // 이름
  rrno: string; // 주민번호
  gender: string; // 성별
  age: number; // 나이
}

const GNBCustomer = ({ name, rrno, gender, age }: GNBCustomerProps) => {
  const memberInfo = useMemberStore((state) => state.memberInfo);

  return (
    <>
      <UserSection data-testid='gnb-customer-area'>
        <Typography variant='h1'>{name}</Typography>
        <Typography variant='caption' color='textSecondary'>
          주민번호 {rrno}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          (만 {age}세)
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {gender}
        </Typography>
      </UserSection>

      <Navigation>
        {memberInfo?.authorities.includes(AUTH_UNMASKING) && (
          <Button variant='outlined' size='small' color='grey'>
            마스킹 해제
          </Button>
        )}
        <Button variant='outlined' size='small' color='grey'>
          메모 및 발송이력
        </Button>
      </Navigation>
    </>
  );
};

export default GNBCustomer;

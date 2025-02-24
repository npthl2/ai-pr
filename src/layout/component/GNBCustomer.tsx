import { Typography } from '@mui/material';
import { Navigation, UserSection } from './GNBCustomer.styled';
import Button from '@components/Button';

interface GNBCustomerProps {
  name: string; // 이름
  id: string; // 주민번호
  gender: string; // 성별
  age: number; // 나이
}

const GNBCustomer = ({ name, id, gender, age }: GNBCustomerProps) => {
  return (
    <>
      <UserSection>
        <Typography variant='h1'>{name}</Typography>
        <Typography variant='caption' color='textSecondary'>
          주민번호 {id}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          (만 {age}세)
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {gender}
        </Typography>
      </UserSection>

      <Navigation>
        <Button variant='outlined' size='small' color='grey'>
          마스킹 해제
        </Button>
        <Button variant='outlined' size='small' color='grey'>
          메모 및 발송이력
        </Button>
      </Navigation>
    </>
  );
};

export default GNBCustomer;

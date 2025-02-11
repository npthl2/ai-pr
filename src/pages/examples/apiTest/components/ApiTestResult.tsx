import { Paper, Typography } from '@mui/material';

interface ApiTestResultProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data?: string;
}

const ApiTestResult = ({ title, isLoading, isError, error, data }: ApiTestResultProps) => {
  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>

      {isLoading && <Typography color='text.secondary'>로딩 중...</Typography>}

      {isError && (
        <Typography color='error'>에러 발생: {error?.message || '알 수 없는 에러'}</Typography>
      )}

      {data && <Typography>응답 결과: {data}</Typography>}
    </Paper>
  );
};

export default ApiTestResult;

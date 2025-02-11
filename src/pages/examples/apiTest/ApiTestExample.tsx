import { Container, Typography } from '@mui/material';
import { useApiTestQueries } from '@/api/queries/apiTest/useApiTestQueries';
import ApiTestResult from './components/ApiTestResult';

const ApiTestExample = () => {
  const [ccaResult, stgResult] = useApiTestQueries();

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        API 테스트 결과
      </Typography>

      <ApiTestResult
        title='CCA API 테스트'
        isLoading={ccaResult.isLoading}
        isError={ccaResult.isError}
        error={ccaResult.error as Error}
        data={ccaResult.data}
      />

      <ApiTestResult
        title='STG API 테스트'
        isLoading={stgResult.isLoading}
        isError={stgResult.isError}
        error={stgResult.error as Error}
        data={stgResult.data}
      />
    </Container>
  );
};

export default ApiTestExample;

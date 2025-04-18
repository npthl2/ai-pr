import { Typography, Table, TableBody, TableHead, Box } from '@mui/material';
import {
  AdditionalServicesSection,
  Container,
  ServiceSection,
  ScrollableTableContainer,
  SectionTitle,
  TableRowCustom,
  Count,
} from './AdditionalServicesInfo.styled';
import TableCell from '@components/Table/TableCell';

interface AdditionalService {
  serviceName: string;
  serviceValue: number;
}

interface AdditionalServicesInfoProps {
  title: string;
  mainServiceValue: number;
  additionalServices: AdditionalService[];
  testId: string;
}

const AdditionalServicesInfo = ({
  title,
  mainServiceValue,
  additionalServices,
  testId,
}: AdditionalServicesInfoProps) => {
  const totalAdditionalValue = additionalServices.reduce(
    (sum, service) => sum + service.serviceValue,
    0,
  );

  return (
    <Container>
      <ServiceSection>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <SectionTitle>요금제</SectionTitle>
          <Typography
            variant='subtitle1'
            fontWeight='600'
            fontSize='14px'
            sx={{ ml: 2 }}
            data-testid={`${testId}-name`}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant='subtitle1'
          fontWeight='600'
          fontSize='14px'
          data-testid={`${testId}-value`}
        >
          {mainServiceValue.toLocaleString()}원
        </Typography>
      </ServiceSection>

      <AdditionalServicesSection>
        <SectionTitle>
          부가서비스
          <Count> {additionalServices.length}</Count>
        </SectionTitle>

        {/* 테이블 헤더 - 고정 위치 */}
        <Table size='small' stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
          <TableHead>
            <TableRowCustom variant='head'>
              <TableCell sx={{ fontWeight: '600', color: 'text.secondary' }}>
                부가서비스명
              </TableCell>
              <TableCell
                align='right'
                width='40%'
                sx={{ fontWeight: '600', color: 'text.secondary' }}
              >
                요금(원)
              </TableCell>
            </TableRowCustom>
          </TableHead>
        </Table>

        {/* 테이블 본문 - 스크롤 가능 */}
        <ScrollableTableContainer data-testid={`${testId}-additional-service-list`}>
          <Table size='small' sx={{ tableLayout: 'auto', width: '100%' }}>
            <TableBody>
              {additionalServices.map((service, index) => (
                <TableRowCustom key={index}>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell align='right' width='40%'>
                    {service.serviceValue.toLocaleString()}
                  </TableCell>
                </TableRowCustom>
              ))}
              {additionalServices.length === 0 && (
                <TableRowCustom>
                  <TableCell colSpan={2} align='center' sx={{ height: '186px' }}>
                    <Typography color='text.secondary'>표시할 데이터가 없습니다.</Typography>
                  </TableCell>
                </TableRowCustom>
              )}
            </TableBody>
          </Table>
        </ScrollableTableContainer>

        {/* 합계 행 - 고정 위치 */}
        <Table size='small' sx={{ tableLayout: 'auto', width: '100%' }}>
          <TableHead>
            <TableRowCustom sx={{ backgroundColor: '#DEE5EE' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>합계</TableCell>
              <TableCell
                align='right'
                width='40%'
                sx={{ fontWeight: '600', color: 'primary.main' }}
              >
                {totalAdditionalValue.toLocaleString()}
              </TableCell>
            </TableRowCustom>
          </TableHead>
        </Table>
      </AdditionalServicesSection>
    </Container>
  );
};

export default AdditionalServicesInfo;

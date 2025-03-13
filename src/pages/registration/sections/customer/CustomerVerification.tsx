import { Typography, useTheme } from '@mui/material';
import {
  VerificationContainer,
  VerificationContent,
  VerificationLabel,
  VerificationStatus,
  VerificationCheckButton,
  VerificationGroup,
} from './CustomerVerification.styled';

interface CustomerVerificationProps {
  verificationResult: boolean;
  availableContractCount?: number;
  handleCheckAvailableContract: () => void;
}

const CustomerVerification = ({
  verificationResult,
  availableContractCount,
  handleCheckAvailableContract,
}: CustomerVerificationProps) => {
  const theme = useTheme();

  return (
    <VerificationContainer data-testid='customer-verification-line'>
      <VerificationContent>
        <VerificationGroup>
          <Typography variant='h4'>고객검증</Typography>
        </VerificationGroup>

        <VerificationGroup>
          <Typography variant='h6' color='textSecondary'>
            실명인증결과
          </Typography>
          {verificationResult ? (
            <VerificationStatus success data-testid='verification-status' paddingRight='12px'>
              정상
            </VerificationStatus>
          ) : (
            <VerificationStatus data-testid='verification-status'>실패</VerificationStatus>
          )}
        </VerificationGroup>

        <VerificationGroup gap='16px'>
          <VerificationCheckButton
            sx={{
              ...(!verificationResult && {
                '&:disabled': {
                  backgroundColor: 'inherit',
                  borderColor: `${theme.palette.grey[100]}`,
                },
              }),
            }}
            variant='outlined'
            size='small'
            color='primary'
            onClick={handleCheckAvailableContract}
            disabled={!verificationResult}
            data-testid='verification-check-button'
          >
            고객정보사전체크
          </VerificationCheckButton>
          {verificationResult && (
            <>
              {availableContractCount !== undefined && (
                <>
                  {availableContractCount !== 0 ? (
                    <>
                      <VerificationStatus success data-testid='verification-pass-status'>
                        통과
                      </VerificationStatus>
                    </>
                  ) : (
                    <>
                      <VerificationStatus data-testid='verification-fail-status'>
                        미통과
                      </VerificationStatus>
                    </>
                  )}
                </>
              )}

              {availableContractCount !== undefined && (
                <>
                  <VerificationLabel
                    variant='h6'
                    color='textSecondary'
                    data-testid='available-contract-count'
                  >
                    가입가능회선
                  </VerificationLabel>
                  <Typography>{availableContractCount}</Typography>
                </>
              )}
            </>
          )}
        </VerificationGroup>
      </VerificationContent>
    </VerificationContainer>
  );
};

export default CustomerVerification;

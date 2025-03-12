import { Typography } from '@mui/material';
import {
  VerificationContainer,
  VerificationContent,
  VerificationTitle,
  VerificationLabel,
  VerificationStatus,
  VerificationCheckButton,
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
  return (
    <VerificationContainer data-testid='customer-verification-line'>
      <VerificationContent>
        <VerificationTitle>고객검증</VerificationTitle>
        <VerificationLabel>실명확인결과</VerificationLabel>
        {verificationResult ? (
          <>
            <VerificationStatus success data-testid='verification-status'>
              정상
            </VerificationStatus>
            <VerificationCheckButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={handleCheckAvailableContract}
              disabled={availableContractCount !== undefined && availableContractCount > 0}
              data-testid='verification-check-button'
            >
              고객정보사전체크
            </VerificationCheckButton>
            {availableContractCount !== undefined && (
              <>
                {availableContractCount !== 0 ? (
                  <VerificationStatus success data-testid='verification-pass-status'>
                    통과
                  </VerificationStatus>
                ) : (
                  <VerificationStatus data-testid='verification-fail-status'>
                    미통과
                  </VerificationStatus>
                )}
                <VerificationLabel data-testid='available-contract-count'>
                  가입가능회선
                </VerificationLabel>
                <Typography>{availableContractCount}</Typography>
              </>
            )}
          </>
        ) : (
          <VerificationStatus data-testid='verification-status'>실패</VerificationStatus>
        )}
      </VerificationContent>
    </VerificationContainer>
  );
};

export default CustomerVerification;

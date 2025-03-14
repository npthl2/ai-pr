import { MenuItem, Box } from '@mui/material'; // Material UI 컴포넌트 임포트
import Button from '@components/Button'; // 커스텀 버튼 컴포넌트 임포트
import TextField from '@components/TextField'; // 커스텀 텍스트필드 컴포넌트 임포트
import Select from '@components/Select'; // 커스텀 셀렉트 컴포넌트 임포트
import { EmailSeparator } from '../RegistrationRequest.styled'; // 이메일 구분자 스타일 임포트
import { useState, useEffect } from 'react'; // React 훅 임포트
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants'; // 등록 상태 타입 임포트

// 이메일 폼 컴포넌트 props 인터페이스 정의
interface EmailFormProps {
  status: RegistrationStatusType; // 현재 등록 상태
  onSendEmail: (email: string) => void; // 이메일 발송 콜백 함수
  isEnabled: boolean; // 이메일 발송 기능 활성화 여부
  isLoading?: boolean; // 이메일 발송 로딩 상태
}

// 오류 메시지 인터페이스 정의
interface EmailErrors {
  emailAddress?: string;
  emailDomain?: string;
  general?: string;
}

const EmailForm = ({ status, onSendEmail, isEnabled, isLoading = false }: EmailFormProps) => {
  // 상태 관리
  const [emailAddress, setEmailAddress] = useState<string>(''); // 이메일 주소 상태
  const [emailDomain, setEmailDomain] = useState<string>(''); // 직접 입력 도메인 상태
  const [emailDomainType, setEmailDomainType] = useState<string>('선택'); // 선택된 도메인 타입 상태
  const [isCustomDomain, setIsCustomDomain] = useState<boolean>(false); // 직접 입력 모드 여부 상태
  const [errors, setErrors] = useState<EmailErrors>({}); // 오류 메시지 상태

  // 이메일 도메인 선택 처리 함수
  const handleDomainChange = (value: string) => {
    setEmailDomainType(value); // 선택된 도메인 타입 업데이트
    // 오류 메시지 초기화
    setErrors((prev) => ({ ...prev, emailDomain: undefined, general: undefined }));

    if (value === '직접입력') {
      setIsCustomDomain(true); // 직접 입력 모드 활성화
      setEmailDomain(''); // 도메인 입력값 초기화
    } else if (value !== '선택') {
      setIsCustomDomain(false); // 직접 입력 모드 비활성화
      setEmailDomain(value); // 선택된 도메인으로 설정
    } else {
      setIsCustomDomain(false); // 직접 입력 모드 비활성화
      setEmailDomain(''); // 도메인 입력값 초기화
    }
  };

  // 이메일 발송 처리 함수
  const handleSendEmail = () => {
    // 입력값 검증
    if (emailAddress.trim() === '') {
      setErrors({ emailAddress: '이메일 주소를 입력해주세요.' });
      return;
    }

    if (isCustomDomain && emailDomain.trim() === '') {
      setErrors({ emailDomain: '도메인을 입력해주세요.' });
      return;
    }

    if (!isCustomDomain && (emailDomainType === '선택' || emailDomainType === '직접입력')) {
      setErrors({ emailDomain: '도메인을 선택해주세요.' });
      return;
    }

    let fullEmail;
    if (isCustomDomain) {
      fullEmail = `${emailAddress}@${emailDomain}`; // 직접 입력 도메인 사용
    } else {
      fullEmail = `${emailAddress}@${emailDomainType}`; // 선택된 도메인 사용
    }
    onSendEmail(fullEmail); // 부모 컴포넌트의 이메일 발송 함수 호출
  };

  // 토글이 비활성화되면 이메일 입력값 초기화 (useEffect 훅)
  useEffect(() => {
    if (!isEnabled) {
      setEmailAddress(''); // 이메일 주소 초기화
      setEmailDomain(''); // 도메인 초기화
      setEmailDomainType('선택'); // 도메인 타입 초기화
      setIsCustomDomain(false); // 직접 입력 모드 비활성화
      setErrors({}); // 오류 메시지 초기화
    }
  }, [isEnabled]); // isEnabled가 변경될 때만 실행

  // 이메일 주소 입력 핸들러
  const handleEmailAddressChange = (value: string) => {
    setEmailAddress(value); // 이메일 주소 상태 업데이트
    // 오류 메시지 초기화
    setErrors((prev) => ({ ...prev, emailAddress: undefined, general: undefined }));
  };

  // 이메일 도메인 입력 핸들러
  const handleEmailDomainChange = (value: string) => {
    setEmailDomain(value); // 도메인 상태 업데이트
    // 오류 메시지 초기화
    setErrors((prev) => ({ ...prev, emailDomain: undefined, general: undefined }));
  };

  // 포커스 아웃 핸들러 - 이메일 주소
  const handleEmailAddressBlur = () => {
    if (emailAddress.trim() === '' && isInputEnabled) {
      setErrors((prev) => ({
        ...prev,
        emailAddress: '이메일을 입력해주세요.',
      }));
    }
  };

  // 포커스 아웃 핸들러 - 이메일 도메인
  const handleEmailDomainBlur = () => {
    if (isCustomDomain && emailDomain.trim() === '' && isInputEnabled) {
      setErrors((prev) => ({
        ...prev,
        emailDomain: '도메인을 입력해주세요.',
      }));
    }
  };

  // 포커스 아웃 핸들러 - 도메인 선택
  const handleDomainSelectBlur = () => {
    if (
      !isCustomDomain &&
      (emailDomainType === '선택' || emailDomainType === '직접입력') &&
      isInputEnabled
    ) {
      setErrors((prev) => ({
        ...prev,
        emailDomain: '도메인을 선택해주세요.',
      }));
    }
  };

  // 입력 필드 활성화 여부 계산
  const isInputEnabled = status === REGISTRATION_STATUS.COMPLETED && isEnabled; // 상태가 완료되고 이메일 발송이 활성화된 경우

  // 이메일 발송 버튼 활성화 여부 계산
  const isEmailSendEnabled =
    isInputEnabled && // 입력 필드가 활성화되어 있고
    !isLoading && // 로딩 중이 아니며
    emailAddress.trim() !== '' && // 이메일 주소가 비어있지 않으며
    ((isCustomDomain && emailDomain.trim() !== '') || // 직접 입력 모드에서 도메인이 비어있지 않거나
      (!isCustomDomain && emailDomainType !== '선택' && emailDomainType !== '직접입력')); // 선택 모드에서 유효한 도메인이 선택된 경우

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      {' '}
      {/* 최상위 컨테이너: 전체 너비 사용, 패딩 추가 */}
      <Box
        sx={{
          display: 'flex', // 자식 요소들을 가로로 배치
          alignItems: 'flex-start', // 자식 요소들을 상단 정렬로 변경
          flexWrap: 'nowrap', // 자식 요소들이 한 줄에 유지되도록 설정
          gap: 1, // 자식 요소들 사이의 간격
        }}
      >
        {/* 이메일 주소 입력 필드 컨테이너 */}
        <Box
          sx={{
            width: '30%', // 컨테이너 너비를 비율로 설정
            minWidth: '100px', // 최소 너비 설정
            flexShrink: 1, // 공간이 부족할 때 축소 허용
            minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            value={emailAddress} // 이메일 주소 상태 바인딩
            onChange={handleEmailAddressChange} // 변경 이벤트 핸들러
            onBlur={handleEmailAddressBlur} // 포커스 아웃 이벤트 핸들러
            placeholder='이메일 주소' // 플레이스홀더 텍스트
            disabled={!isInputEnabled} // 비활성화 상태 설정
            size='small' // 작은 크기 설정
            error={!!errors.emailAddress} // 오류 상태 설정
            helperText={errors.emailAddress} // 오류 메시지 표시
            data-testid='email-input' // 테스트용 데이터id
            sx={{
              width: '100%', // 부모 컨테이너의 전체 너비 사용
              '& .MuiOutlinedInput-root': {
                // 입력 필드 루트 요소 스타일
                height: '30px', // 높이 설정
                '& fieldset': {
                  // 테두리 스타일
                  borderColor: errors.emailAddress ? 'error.main' : 'inherit', // 오류 상태에 따른 테두리 색상
                  borderWidth: errors.emailAddress ? 1 : 1, // 오류 상태에 따른 테두리 두께
                },
                '&:hover fieldset': {
                  // 호버 상태 테두리 스타일
                  borderColor: errors.emailAddress ? 'error.main' : 'inherit', // 오류 상태에 따른 호버 테두리 색상
                },
                '&.Mui-focused fieldset': {
                  // 포커스 상태 테두리 스타일
                  borderColor: errors.emailAddress ? 'error.main' : 'primary.main', // 오류 상태에 따른 포커스 테두리 색상
                },
              },
            }}
          />
        </Box>

        {/* @ 구분자 컨테이너 */}
        <Box
          sx={{
            flexShrink: 0, // 컨테이너가 축소될 때 크기 유지
            height: '30px', // 높이 설정
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmailSeparator
            sx={{
              padding: '0px', // 좌우 패딩 추가
              height: '30px', // 높이 설정
              display: 'flex', // 내부 콘텐츠 가로 배치
              alignItems: 'center', // 내부 콘텐츠 수직 중앙 정렬
              justifyContent: 'center', // 내부 콘텐츠 수평 중앙 정렬
            }}
          >
            @
          </EmailSeparator>
        </Box>

        {/* 도메인 선택 드롭다운 컨테이너 */}
        <Box
          sx={{
            width: '14%', // 컨테이너 너비를 비율로 설정
            minWidth: '140px', // 최소 너비 설정
            flexShrink: 0, // 공간이 부족할 때 축소 허용
            minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Select
            value={emailDomainType} // 선택된 도메인 타입 바인딩
            onChange={(e) => handleDomainChange(e.target.value as string)} // 변경 이벤트 핸들러
            onBlur={handleDomainSelectBlur} // 포커스 아웃 이벤트 핸들러 추가
            disabled={!isInputEnabled} // 비활성화 상태 설정
            size='small' // 작은 크기 설정
            error={!isCustomDomain && !!errors.emailDomain} // 오류 상태 설정
            data-testid='domain-select-button' // 테스트용 데이터id
            sx={{
              width: '100%', // 부모 컨테이너의 전체 너비 사용
              height: '30px', // 높이 설정
              '& .MuiOutlinedInput-root': {
                // 입력 필드 루트 요소 스타일
                height: '30px', // 높이 설정
                '& fieldset': {
                  // 테두리 스타일
                  borderColor: !isCustomDomain && errors.emailDomain ? 'error.main' : 'inherit', // 오류 상태에 따른 테두리 색상
                  borderWidth: !isCustomDomain && errors.emailDomain ? 2 : 1, // 오류 상태에 따른 테두리 두께
                },
                '&:hover fieldset': {
                  // 호버 상태 테두리 스타일
                  borderColor: !isCustomDomain && errors.emailDomain ? 'error.main' : 'inherit', // 오류 상태에 따른 호버 테두리 색상
                },
                '&.Mui-focused fieldset': {
                  // 포커스 상태 테두리 스타일
                  borderColor:
                    !isCustomDomain && errors.emailDomain ? 'error.main' : 'primary.main', // 오류 상태에 따른 포커스 테두리 색상
                },
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  minWidth: '140px', // 최소 너비 설정
                },
              },
            }}
          >
            <MenuItem value='선택'>선택</MenuItem> {/* 기본 선택 옵션 */}
            <MenuItem value='gmail.com'>gmail.com</MenuItem> {/* Gmail 도메인 옵션 */}
            <MenuItem value='naver.com'>naver.com</MenuItem> {/* 네이버 도메인 옵션 */}
            <MenuItem value='daum.net'>daum.net</MenuItem> {/* 다음 도메인 옵션 */}
            <MenuItem value='직접입력'> 직접 입력 </MenuItem> {/* 직접 입력 옵션 */}
          </Select>
          {!isCustomDomain && errors.emailDomain && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, ml: 1.5 }}>
              {errors.emailDomain}
            </Box>
          )}
        </Box>

        {/* 직접입력 선택 시 나타나는 도메인 입력 필드 컨테이너 */}
        {isCustomDomain && ( // 직접 입력 모드일 때만 렌더링
          <Box
            sx={{
              width: '14%', // 컨테이너 너비를 비율로 설정
              minWidth: '140px', // 최소 너비 설정
              flexShrink: 0, // 공간이 부족할 때 축소 허용
              minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              value={emailDomain} // 도메인 상태 바인딩
              onChange={handleEmailDomainChange} // 변경 이벤트 핸들러
              onBlur={handleEmailDomainBlur} // 포커스 아웃 이벤트 핸들러
              placeholder='직접 입력' // 플레이스홀더 텍스트
              disabled={!isInputEnabled} // 비활성화 상태 설정
              size='small' // 작은 크기 설정
              error={!!errors.emailDomain} // 오류 상태 설정
              helperText={errors.emailDomain} // 오류 메시지 표시
              data-testid='custom-domain-input' // 테스트용 데이터id 추가
              sx={{
                width: '100%', // 부모 컨테이너의 전체 너비 사용
                '& .MuiOutlinedInput-root': {
                  // 입력 필드 루트 요소 스타일
                  height: '30px', // 높이 설정
                  '& fieldset': {
                    // 테두리 스타일
                    borderColor: errors.emailDomain ? 'error.main' : 'inherit', // 오류 상태에 따른 테두리 색상
                    borderWidth: errors.emailDomain ? 2 : 1, // 오류 상태에 따른 테두리 두께
                  },
                  '&:hover fieldset': {
                    // 호버 상태 테두리 스타일
                    borderColor: errors.emailDomain ? 'error.main' : 'inherit', // 오류 상태에 따른 호버 테두리 색상
                  },
                  '&.Mui-focused fieldset': {
                    // 포커스 상태 테두리 스타일
                    borderColor: errors.emailDomain ? 'error.main' : 'primary.main', // 오류 상태에 따른 포커스 테두리 색상
                  },
                },
              }}
            />
          </Box>
        )}

        {/* 발송하기 버튼 컨테이너 */}
        <Box
          sx={{
            flexShrink: 0, // 컨테이너가 축소될 때 크기 유지
            height: '30px', // 높이 설정
            width: '5%',
            minWidth: '80px', // 최소 너비 설정
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            variant='contained' // 채워진 버튼 스타일
            onClick={handleSendEmail} // 클릭 이벤트 핸들러
            disabled={!isEmailSendEnabled} // 비활성화 상태 설정
            size='small' // 작은 크기 설정
            data-testid='send-email-button' // 테스트용 데이터id
            sx={{
              height: '30px', // 높이 설정
              minWidth: '80px', // 최소 너비 설정
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
          >
            {isLoading ? '발송중...' : '발송하기'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailForm;

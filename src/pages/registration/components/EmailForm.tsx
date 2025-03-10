import { MenuItem, Box } from '@mui/material'; // Material UI 컴포넌트 임포트
import Button from '@components/Button'; // 커스텀 버튼 컴포넌트 임포트
import TextField from '@components/TextField'; // 커스텀 텍스트필드 컴포넌트 임포트
import Select from '@components/Select'; // 커스텀 셀렉트 컴포넌트 임포트
import { EmailSeparator } from '../ContractRequest.styled'; // 이메일 구분자 스타일 임포트
import { useState, useEffect } from 'react'; // React 훅 임포트
import { RegistrationStatusType } from '@model/RegistrationInfo'; // 등록 상태 타입 임포트

// 이메일 폼 컴포넌트 props 인터페이스 정의
interface EmailFormProps {
  status: RegistrationStatusType; // 현재 등록 상태
  onSendEmail: (email: string) => void; // 이메일 발송 콜백 함수
  isEnabled: boolean; // 이메일 발송 기능 활성화 여부
}

const EmailForm = ({ status, onSendEmail, isEnabled }: EmailFormProps) => {
  // 상태 관리
  const [emailAddress, setEmailAddress] = useState<string>(''); // 이메일 주소 상태
  const [emailDomain, setEmailDomain] = useState<string>(''); // 직접 입력 도메인 상태
  const [emailDomainType, setEmailDomainType] = useState<string>('선택'); // 선택된 도메인 타입 상태
  const [isCustomDomain, setIsCustomDomain] = useState<boolean>(false); // 직접 입력 모드 여부 상태

  // 이메일 도메인 선택 처리 함수
  const handleDomainChange = (value: string) => {
    setEmailDomainType(value); // 선택된 도메인 타입 업데이트
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
    }
  }, [isEnabled]); // isEnabled가 변경될 때만 실행

  // 이메일 주소 입력 핸들러
  const handleEmailAddressChange = (value: string) => {
    setEmailAddress(value); // 이메일 주소 상태 업데이트
  };

  // 이메일 도메인 입력 핸들러
  const handleEmailDomainChange = (value: string) => {
    setEmailDomain(value); // 도메인 상태 업데이트
  };

  // 입력 필드 활성화 여부 계산
  const isInputEnabled = status === 'COMPLETED' && isEnabled; // 상태가 완료되고 이메일 발송이 활성화된 경우
  
  // 이메일 발송 버튼 활성화 여부 계산
  const isEmailSendEnabled = isInputEnabled && // 입력 필드가 활성화되어 있고
                            emailAddress.trim() !== '' && // 이메일 주소가 비어있지 않으며
                            ((isCustomDomain && emailDomain.trim() !== '') || // 직접 입력 모드에서 도메인이 비어있지 않거나
                             (!isCustomDomain && emailDomainType !== '선택' && emailDomainType !== '직접입력')); // 선택 모드에서 유효한 도메인이 선택된 경우

  return (
    <Box sx={{ width: '100%' }}> {/* 최상위 컨테이너: 전체 너비 사용 */}
      <Box sx={{ 
        display: 'flex', // 자식 요소들을 가로로 배치
        alignItems: 'center', // 자식 요소들을 수직 중앙 정렬
        flexWrap: 'nowrap', // 자식 요소들이 한 줄에 유지되도록 설정
        gap: 1 // 자식 요소들 사이의 간격을 0으로 설정
      }}>
        {/* 이메일 주소 입력 필드 컨테이너 */}
        <Box sx={{ 
          width: '30%', // 컨테이너 너비를 비율로 설정
          minWidth: '100px', // 최소 너비 설정
          flexShrink: 1, // 공간이 부족할 때 축소 허용
          height: '40px' // 높이 설정
        }}>
          <TextField
            value={emailAddress} // 이메일 주소 상태 바인딩
            onChange={handleEmailAddressChange} // 변경 이벤트 핸들러
            placeholder="이메일 주소" // 플레이스홀더 텍스트
            disabled={!isInputEnabled} // 비활성화 상태 설정
            size="small" // 작은 크기 설정
            sx={{
              width: '100%', // 부모 컨테이너의 전체 너비 사용
              height: '30px', // 높이 설정
              '& .MuiOutlinedInput-root': { // 입력 필드 루트 요소 스타일
                border: '0',
                height: '30px' // 높이 설정
              }
            }}
          />
        </Box>
        
        {/* @ 구분자 컨테이너 */}
        <Box sx={{ 
          flexShrink: 0, // 컨테이너가 축소될 때 크기 유지
          height: '40px' // 높이 설정
        }}>
          <EmailSeparator sx={{ 
            padding: '0 0', // 좌우 패딩만 적용
            backgroundColor: (theme) => theme.palette.common.white,
            height: '30px', // 높이 설정
            display: 'flex', // 내부 콘텐츠 가로 배치
            alignItems: 'center', // 내부 콘텐츠 수직 중앙 정렬
            justifyContent: 'center', // 내부 콘텐츠 수평 중앙 정렬
          }}>@</EmailSeparator>
        </Box>
        
        {/* 도메인 선택 드롭다운 컨테이너 */}
        <Box sx={{ 
          width: '15%', // 컨테이너 너비를 비율로 설정
          minWidth: '100px', // 최소 너비 설정
          flexShrink: 1, // 공간이 부족할 때 축소 허용
          height: '40px' // 높이 설정
        }}>
          <Select
            value={emailDomainType} // 선택된 도메인 타입 바인딩
            onChange={(e) => handleDomainChange(e.target.value as string)} // 변경 이벤트 핸들러
            disabled={!isInputEnabled} // 비활성화 상태 설정
            size="small" // 작은 크기 설정
            sx={{ 
              width: '100%', // 부모 컨테이너의 전체 너비 사용
              minWidth: '130px', // 최소 너비 설정
              height: '30px', // 높이 설정
              '& .MuiOutlinedInput-root': { // 입력 필드 루트 요소 스타일
                border: '0',
                height: '30px' // 높이 설정
              }
            }}
          >
            <MenuItem value="선택">선택</MenuItem> {/* 기본 선택 옵션 */}
            <MenuItem value="gmail.com">gmail.com</MenuItem> {/* Gmail 도메인 옵션 */}
            <MenuItem value="naver.com">naver.com</MenuItem> {/* 네이버 도메인 옵션 */}
            <MenuItem value="daum.net">daum.net</MenuItem> {/* 다음 도메인 옵션 */}
            <MenuItem value="직접입력">직접입력</MenuItem> {/* 직접 입력 옵션 */}
          </Select>
        </Box>
        
        {/* 직접입력 선택 시 나타나는 도메인 입력 필드 컨테이너 */}
        {isCustomDomain && ( // 직접 입력 모드일 때만 렌더링
          <Box sx={{ 
            width: '15%', // 컨테이너 너비를 비율로 설정
            minWidth: '130px', // 최소 너비 설정
            flexShrink: 1, // 공간이 부족할 때 축소 허용
            height: '40px' // 높이 설정
          }}>
            <TextField
              value={emailDomain} // 도메인 상태 바인딩
              onChange={handleEmailDomainChange} // 변경 이벤트 핸들러
              placeholder="직접 입력" // 플레이스홀더 텍스트
              disabled={!isInputEnabled} // 비활성화 상태 설정
              size="small" // 작은 크기 설정
              sx={{ 
                width: '100%', // 부모 컨테이너의 전체 너비 사용
                height: '30px', // 높이 설정
                '& .MuiOutlinedInput-root': { // 입력 필드 루트 요소 스타일
                  height: '30px' // 높이 설정
                }
              }}
            />
          </Box>
        )}
        
        {/* 발송하기 버튼 컨테이너 */}
        <Box sx={{ 
          flexShrink: 0, // 컨테이너가 축소될 때 크기 유지
          height: '40px', // 높이 설정
          width: '5%',
        }}>
          <Button
            variant="contained" // 채워진 버튼 스타일
            onClick={handleSendEmail} // 클릭 이벤트 핸들러
            disabled={!isEmailSendEnabled} // 비활성화 상태 설정
            size="small" // 작은 크기 설정
            sx={{ 
              height: '30px', // 높이 설정
              minWidth: '50px', // 최소 너비 설정
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
          >
            발송하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailForm;
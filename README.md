# BYBC React Boilerplate

React와 TypeScript를 기반으로 한 인증 시스템이 구현된 보일러플레이트 프로젝트입니다.

## 기술 스택

- React 18.3
- TypeScript 5.6
- Vite 6.0
- Material-UI 6.3
- Axios 1.7
- Zustand 5.0
- React Router DOM 7.1

## 주요 기능

> 아래 기능들은 예시입니다. 프로젝트의 요구사항에 맞게 참고하시거나 필요하지 않은 경우 삭제하시거나 수정하시면 됩니다.

### 인증 시스템(예시)

- 로그인/로그아웃 기능
- 보호된 라우트 구현
- 401 에러 시 자동 로그아웃
- 인증 상태 전역 관리 (Zustand)

### API 통신(예시)

- Axios 인스턴스 설정
- 인터셉터를 통한 요청/응답 처리
- 시큐어 쿠키 지원
- API 에러 처리

### UI/UX(예시)

- Material-UI 기반 컴포넌트
- 반응형 디자인
- 다크/라이트 모드 지원
- 로딩 상태 표시
- 에러 메시지 표시

## 프로젝트 구조

```doc
src/
├── api/
│ └── axios.ts # Axios 설정 및 인터셉터
├── assets/ # 이미지, 폰트 등 정적 자원
├── components/ # 공통 컴포넌트
├── hooks/ # 커스텀 훅
├── layout/ # 레이아웃 컴포넌트
├── pages/
│ ├── home/ # 홈 페이지
│ │ └── components/ # 홈 페이지에서만 사용하는 컴포넌트
│ └── login/ # 로그인 페이지
│ │ └── components/ # 로그인에서만 사용하는 컴포넌트
│ │ └── types.ts # 로그인에서만 사용하는 타입 정의
├── services/
│ └── authService.ts # 인증 관련 API 서비스
├── stores/ # 상태 관리
│ ├── AuthStore.ts # 인증 상태 관리
│ └── ThemeStore.ts # 테마 상태 관리
├── theme/ # 전역 테마 설정
├── types/ # 전역 타입 정의
├── utils/ # 유틸리티 함수
└── router/
  └── ProtectedRoute.tsx # 보호된 라우트 컴포넌트
```

## 시작하기

### 1. Node.js 설치

#### Windows

1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 다운로드 받은 설치 파일 실행
3. 설치 완료 후 터미널(PowerShell 또는 CMD)에서 버전 확인

```bash
node --version
npm --version
```

#### macOS

1. Homebrew를 사용한 설치 (권장)

```bash
# Homebrew 설치 (이미 설치되어 있다면 생략)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 설치
brew install node

# 버전 확인
node --version
npm --version
```

2. 또는 [Node.js 공식 웹사이트](https://nodejs.org/)에서 macOS 인스톨러 다운로드 후 설치

### 2. 프로젝트 설치

```bash
# 의존성 패키지 설치
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

## 주요 컴포넌트

### Login

- LoginForm: 로그인 폼 UI 및 입력 처리
- LoginAlert: 에러 메시지 표시
- LoginStyles: 스타일 컴포넌트

### ProtectedRoute

- 인증되지 않은 사용자 리다이렉션
- Zustand를 통한 인증 상태 관리

### AuthService

- Axios 인스턴스를 활용한 API 통신
- 타입 안전성이 보장된 응답 처리

## 환경 설정

### API 설정

`src/api/axios.ts`에서 설정을 확인하세요:

### API 연동 예시

이 프로젝트는 [DummyJSON](https://dummyjson.com)을 사용하여 인증 시스템 예시를 구현했습니다.

#### 테스트 계정

```bash
username: 'emilys'
password: 'emilyspass'
```

#### API 엔드포인트

- 로그인: `POST https://dummyjson.com/auth/login`
- 사용자 정보: `GET https://dummyjson.com/auth/me`

> DummyJSON은 테스트용 API로, 실제 프로젝트에서는 해당 프로젝트의 API로 교체하여 사용하시면 됩니다.
> 자세한 API 문서는 [DummyJSON Auth API](https://dummyjson.com/docs/auth)를 참고해 주세요.

### 인증 상태 관리

`src/stores/AuthStore.ts`에서 Zustand store 설정한 것을 참고해 주세요:

### 크로스 플랫폼 설정

#### 1. Git 설정

```bash
# Windows에서 실행
git config --global core.autocrlf true

# macOS/Linux에서 실행
git config --global core.autocrlf input
```

#### 2. 환경변수 설정

- `.env.example` 파일을 복사하여 `.env` 파일 생성
- 프로젝트에 맞는 환경변수 값 설정
- 환경변수 설정 후 프로젝트 재실행

## 테스트 실행

### 유닛 테스트 (vitest)

- 테스트 코드는 `test/unit/specs`에 작성

```bash
# 테스트 1회 실행 후 자동종료
npm run test:unit 

# 테스트 실행하고 변경 감지되면 재실행
npm run test:unit:watch 

# 테스트 실행하고 변경 감지되면 재실행 & 브라우저 UI 표시
npm run test:unit:watch:ui
```

### 모듈 테스트 (cypress)

- 테스트 코드는 `test/module/specs`에 작성

```bash
# 모듈 테스트
npm run test:module 

# 헬스 체크
npm run test:health 

# 스모크 테스트
npm run test:smoke 

# cypress open
npm run cypress:open 
```

### Local 계정 및 권한 설정
.env.local
```
VITE_HTTPS=false
VITE_APP_NAME=rnr-fe-local
VITE_HOST=localhost
VITE_PORT=5173
VITE_X_AUTHORIZATION_ID=S-0001
VITE_X_AUTHORIZATION_ROLE=ROLE_ADMIN
VITE_X_CLIENT_IP=127.0.0.1
VITE_GW=
```

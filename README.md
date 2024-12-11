# TimeInK

TimeInK는 사용자가 **일정**과 **감정**을 함께 **기록**하는 웹으로 축적된 데이터를 통해 사용자의 감정 패턴과 생산성을 분석하여 **인사이트**를 제공하는 **1인** 프로젝트 입니다.

### TimeInK 둘러보기

---

- 🔗 [timeink.vercel.app](http://bagpack.vercel.app) (client)
- 🔗 [timeink.onrender.com/health](https://timeink.onrender.com/health) (server)

- 🔗 [Github repository](https://github.com/catmaker/bagpack)
- 🔗 [TimeInK API](https://www.notion.so/43d3e4a17e794630b4b5d9b76caf3fcf?pvs=21)

### TimeInK 개발 아카이브
🔗 [TimeInK 개발 아카이브](https://sinjisoo.oopy.io/portfolio/timeink)

## 주요 기능

### 1. AI 기반 일정 분류
- 머신러닝 알고리즘을 활용한 자동 일정 분류
- 사용자 피드백을 통한 지속적인 모델 개선
- 5가지 주요 카테고리: 업무, 개인, 운동, 학습, 여가

### 2. 종합적인 일정 관리
- 직관적인 UI를 통한 일정 생성, 수정, 삭제 기능
- 드래그 앤 드롭으로 손쉬운 일정 재배치
- 다양한 뷰 옵션: 일간, 주간, 월간 캘린더

### 3. 인터랙티브 대시보드
- 사용자의 일정 및 활동에 대한 종합적인 overview 제공
- 카테고리별 일정 분포를 시각화한 차트
- 주간 및 월간 생산성 트렌드 분석

### 4. 스마트 TODO 리스트
- AI 추천 기반의 작업 우선순위 설정
- 일정과 연동된 자동 TODO 생성 기능
- 완료된 작업에 대한 성취도 분석

### 5. 고급 사용자 인증 및 보안
- JWT 기반의 안전한 인증 시스템
- 소셜 로그인 옵션 (Google, Facebook)
- 데이터 암호화를 통한 사용자 정보 보호

## 기술 스택

### 백엔드 (ai-chat-server)
- **주요 기술**: Flask, Firebase
- **데이터베이스**: Firebase
- **인증**: JWT (JSON Web Tokens)
- **API**: RESTful API 설계

### 프론트엔드 (frontend)
- **프레임워크**: Next.js
- **언어**: TypeScript
- **상태 관리**: React Context API, custom hooks
- **스타일링**: SCSS Modules, Styled Components
- **차트 라이브러리**: Chart.js

### 배포
## 프론트엔드 : Vercel
## Python : Render

## 프로젝트 구조

### 백엔드 구조
<img src="https://github.com/user-attachments/assets/06d43545-d87f-43ea-9366-a6f7d16939d3" alt="백구조" width="400">

### 프론트엔드 구조
<img src="https://github.com/user-attachments/assets/a5406977-7769-4fae-a468-757bfc3cbbca" alt="프론트구조" width="400">

## 핵심 기능 상세 설명

### AI 모델 학습 프로세스
1. 사용자 입력 데이터 수집
2. 텍스트 전처리 (토큰화, 불용어 제거)
3. 특성 추출 (TF-IDF 벡터화)
4. 나이브 베이즈 분류기 학습
5. 모델 평가 및 최적화
6. 주기적인 재학습을 통한 성능 개선

### 실시간 동기화
- 실시간 일정 업데이트

### 데이터 시각화
- 직관적인 차트와 그래프를 통한 일정 분석
- 사용자 맞춤형 리포트 생성 기능

## 성능 최적화
- 이미지 및 자산 최적화로 빠른 로딩 속도
- 코드 스플리팅을 통한 초기 로드 시간 감소
- 서버 사이드 렌더링(SSR)을 통한 SEO 최적화

## 🔄 클라이언트-Next.js API-Firebase 통합 구조

![image](https://github.com/user-attachments/assets/3871ddea-b3e1-458d-a26b-f8eb4801196f)

- **클라이언트**는 Next.js API로 요청을 보냅니다.
- **Next.js API**는 Firebase의 요청을 처리합니다.
- **Firebase** 또는 **렌더 서버**가 요청을 처리하고 응답을 반환합니다.
- **Next.js API**는 클라이언트에 응답을 반환합니다.
- **UptimeRobot**은 렌더 서버의 상태를 모니터링하고 문제가 발생할 경우 알림을 제공합니다.

## 📚  사용자 상호작용에 따른 컴포넌트 구조 계획

---

- **IntroPage**
    
    ```
    👤 사용자
    ↳ 📱 IntroPage
       🏠 Header
          • [내비게이션 링크]
       
       🖼️ Banner
          • [슬라이드 상호작용]
    
       👋 WelcomeSection
          • [정보 읽기]
    
       ✨ FeaturesSection
          • [기능 살펴보기]
    
       🚀 CallToActionSection
          • [클릭] 회원가입 버튼 → /signup
          • [클릭] 로그인 버튼 → /login
    
       ⚠️ DisclaimerSection
          • [면책 조항 읽기]
    
       🦶 Footer
          • [추가 링크/정보]
    ```
    
- **HomePage**
    
    ```
    👤 사용자
    ↳
    🏠 HomeClient
      │
      ├─── 👤 UserSection
      │     └─── 🖼️ [사용자 프로필 보기]
      │
      ├─── 👋 WelcomeSection
      │     └─── 💬 [동기부여 문구 읽기]
      │
      └─── 📊 MainSection
            │
            ├─── 📅 [내일 끝나는 일정 보기]
            │     └─── 🔗 [클릭] 일정 링크 ──> 📄 /schedule/{id}
            │
            ├─── 📋 CurrentSchedules
            │     └─── 🔗 [클릭] 일정 링크 ──> 📄 /schedule/{id}
            │
            ├─── 📈 StatisticsItems
            │     └─── 👀 [통계 정보 보기]
            │
            ├─── 📊 MonthlyPostChart
            │     └─── 🖱️ [월별 글 수 차트와 상호작용]
            │
            └─── 😊 MoodDistributionChart
                  └─── 🖱️ [감정 분포 차트와 상호작용]
    ```
    
- **SchedulePage**
    
    ```
    👤 사용자
      │
      v
    📅 ScheduleClient
      │
      ├─── 🏠 Header
      │     └─── [내비게이션]
      │
      ├─── 📆 Calendar
      │     ├─── [날짜 클릭] ──> 📝 StepOneModal
      │     │                     ├─── [날짜 선택]
      │     │                     ├─── [기분 선택]
      │     │                     └─── [다음 버튼] ──> 📋 StepTwoModal
      │     │                                           ├─── [글 목록 보기]
      │     │                                           ├─── [정렬하기]
      │     │                                           └─── [새 글 작성] ──> 📝 PostModal
      │     │
      │     ├─── [이벤트 클릭] ──> 🔍 EventModal
      │     │                       ├─── [상세 정보 보기]
      │     │                       └─── [수정하기] ──> ✏️ ScheduleDetail
      │     │
      │     └─── [이벤트 드래그]
      │
      └─── 📄 ScheduleDetail (id 기반)
            ├─── [상세 정보 보기]
            ├─── [수정하기] ──> ✏️ Modify
            └─── [삭제하기]
    ```
    
- **MyPage**
    
    ```
    👤 사용자
      │
      v
    🏠 MyPageContainer
      │
      ├─── 👤 UserSection
      │     └─── [사용자 정보 보기]
      │
      ├─── 📋 MyPostList
      │     ├─── [게시물 목록 보기]
      │     ├─── [중요도 정렬] ──> 🔄 게시물 재정렬
      │     └─── [게시물 클릭] ──> 📄 /schedule/{id}
      │
      └─── ✏️ EditProfile
            │
            ├─── 🖼️ ProfileImageUploadForm
            │     ├─── [이미지 클릭] ──> 📁 파일 선택
            │     └─── [저장하기] ──> 🔄 프로필 이미지 업데이트
            │
            ├─── 📧 Email (읽기 전용)
            │
            ├─── 🏷️ NicknameForm
            │     ├─── [닉네임 입력]
            │     └─── [저장하기] ──> 🔄 닉네임 업데이트
            │
            └─── 🔐 PasswordForm
                  └─── [비밀번호 재설정] ──> 📨 재설정 이메일 발송
                                          ──> 🚪 로그아웃
    ```
    
- **LoginPage**
    
    ```
    👤 사용자
      │
      v
    🔐 Login
      │
      ├─── 🏷️ LoginHeader
      │     └─── [앱 타이틀 및 로그인 안내 보기]
      │
      ├─── 📝 LoginForm
      │     ├─── [이메일 입력]
      │     ├─── [비밀번호 입력]
      │     ├─── [비밀번호 표시/숨김] ──> 👁️ 비밀번호 가시성 토글
      │     └─── [로그인 버튼 클릭] ──> 🔄 로그인 처리
      │                               │
      │                               ├─── 성공 ──> 🏠 홈페이지로 이동
      │                               └─── 실패 ──> ❗ 에러 메시지 표시
      │
      └─── 🔗 AuthLinks
            ├─── [회원가입 링크] ──> 📋 /signup
            └─── [비밀번호 찾기 링크] ──> 🔑 /forgot
    ```
    
- **SignUpPage**
    
    ```
    👤 사용자
      │
      v
    📝 SignUpClient
      │
      ├─── 🏷️ SignUpHeader
      │     └─── [앱 타이틀 및 회원가입 안내 보기]
      │
      ├─── 📋 SignUpForm
      │     ├─── [이메일 입력]
      │     ├─── [비밀번호 입력]
      │     │     └─── [비밀번호 표시/숨김] ──> 👁️ 비밀번호 가시성 토글
      │     ├─── [닉네임 입력]
      │     └─── [회원가입 버튼 클릭] ──> 🔄 회원가입 처리
      │                                 │
      │                                 ├─── 성공 ──> 🏠 홈페이지로 이동
      │                                 └─── 실패 ──> ❗ 에러 메시지 표시
      │
      └─── 🔗 SignUpFooter
            ├─── [로그인 링크] ──> 🔐 /login
            └─── [비밀번호 찾기 링크] ──> 🔑 /forgot
    ```
    
- **SmartPage**
    
    ```
    👤 사용자
      │
      v
    🧠 Smart
      │
      └─── 📊 CategoryResults
            │
            ├─── [AI 분류 결과 보기]
            │
            ├─── 🔄 자동 AI 분류
            │     └─── [로딩 중] ──> ⏳ Loading 컴포넌트
            │
            └─── 📋 카테고리별 결과
                  │
                  ├─── [아이템 드래그 앤 드롭] ──> 🔄 카테고리 간 이동
                  │                             └─── 📡 피드백 전송 (AI 학습용)
                  │
                  ├─── [아이템 클릭] ──> 📄 /schedule/{id}
                  │
                  └─── [빈 카테고리]
                        └─── [아이템 드롭] ──> 🔄 새 카테고리로 이동
                                             └─── 📡 피드백 전송 (AI 학습용)
    ```
    
- **TodoPage**
    
    ```
    👤 사용자
      │
      v
    📝 Todo
      │
      ├─── ⏳ [초기 로딩]
      │     ├─── 🔄 날짜 확인
      │     │     ├─── 새로운 날짜 ──> 🗑️ 이전 할 일 삭제
      │     │     └─── 같은 날짜 ──> 📥 로컬 스토리지에서 할 일 불러오기
      │     └─── [로딩 중] ──> ⏳ Loading 컴포넌트
      │
      ├─── ⌨️ [할 일 입력]
      │     └─── [추가 버튼 클릭] ──> 🔄 할 일 목록 업데이트
      │                             └─── 💾 로컬 스토리지에 저장
      │
      └─── 📋 할 일 목록
            ├─── [할 일 없음] ──> "할 일이 없습니다" 메시지 표시
            │
            └─── [할 일 있음]
                  └─── [삭제 버튼 클릭] ──> 🔄 할 일 목록 업데이트
                                          └─── 💾 로컬 스토리지에 저장
    
    🕒 1분마다
      └─── 🔄 날짜 변경 확인
            └─── 날짜 변경 시 ──> 🗑️ 모든 할 일 삭제
    ```
    

## 🧩 컴포넌트 설계 방식

---

<aside>
💡

Brad Frost가 제안한 Atomic Design 원칙을 반영하여 UI를 구축하는 접근 방식을 사용했습니다.

</aside>

### **Atoms**

- Button : 기본적인 상호작용 요소
- InputField : 기본 입력 필드
- Circle : 가장 작은 시각적 요소
- LogoIcon : 로고 이미지 표시
- Pallette : 색상 선택 요소

### **Molecules**

- Card : 여러 원자를 조합한 컨테이너
- Modal : 팝업 창 구조
- Loading : 로딩 상태 표시

### **Organisms**

- Header : 네비게이션 및 로고 포함
- Footer : 사이트 하단 정보 및 링크
- Banner : 이미지와 텍스트가 결합된 큰 구조
- DragDropContainer : 드래그앤드롭을 구현한 복잡한 상호작용을 가진 컨테이너

## 📦 전역 상태 관리

---

- **`UserProvider`** - (`context`)
    - 유저의 정보를 전역적으로 관리했습니다.
    - 비동기적으로 유저 정보를 로드할 때 context를 활용하였습니다.
- **`useScheduleStore`** - (`zustand`)
    - 스케줄 관련 데이터는 컴포넌트의 깊이에 따라 크게 3가지로 분류하고 캡슐화하여 불필요한 리렌더링 요청을 줄였습니다.
        - selectedMood : 선택된 기분
        - selectedDate : 선택된 날짜
        - posts: 게시물 목록
- `DateState` - (`zustand`)
    - 날짜 관련 상태를 관리합니다. 
    이는 startDate, endDate, selectedDayOfWeek 등을 포함합니다.
    - 날짜 관련 상태를 중앙에서 관리하고 필요한 컴포넌트에 prop을 쉽게 전달할 수 있도록 설계했습니다.
- `PostState` - (`zustand`)
    - 게시물 관련 상태를 관리합니다. posts 배열과 postsUpdate 플래그를 포함합니다.
    게시물 컴포넌트를 자식으로 가지며 이를 위해 zustand를 활용합니다.

## 🪝커스텀 훅

<aside>
💡

**커스텀 훅은 관심사의 분리, DRY 설계 원칙을 따라 설계했습니다.**

</aside>

**`useCalendarEvents`**

> 캘린더 이벤트의 상태 관리, 사용자 상호작용 처리, 서버 동기화를 통합적으로 관리합니다.
> 
- 내부적으로 useScheduleStore와 UserContext를 사용합니다.
- **return** 값은 다음과 같습니다.
    - `selectedEvent` : 현재 선택된 캘린더 이벤트 정보를 담고 있습니다.
    - `isOpen` : 이벤트 상세 정보 모달의 열림/닫힘 상태를 나타냅니다.
    - `loadingEventId` : 현재 업데이트 중인 이벤트의 ID를 추적합니다.
    - `calendarEvents` : 캘린더에 표시될 모든 이벤트 목록입니다.
    - `handleEventClick` : 이벤트 클릭 시 실행되는 핸들러 함수입니다.
    - `handleEventDrop` : 이벤트 드래그 앤 드롭 시 실행되는 비동기 핸들러 함수입니다.
    - `handleCloseModal` : 이벤트 상세 정보 모달을 닫는 함수입니다.
    - `user` : 현재 로그인한 사용자 정보를 제공합니다.
- **주요 특징**
    - FullCalendar 라이브러리와의 통합, 비동기 상태 관리, 그리고 타입 안정성을 고려한 설계로 견고하고 확장 가능한 캘린더 기능을 제공하도록 했습니다.

**`useCurrentSchedules`**

> 현재 진행 중인 일정을 실시간으로 필터링하고 추출합니다.
> 
- 입력 값으로 posts (모든 일정 데이터를 포함하는 배열) 을 받습니다.
- **return** 값은 다음과 같습니다.
    - `{ id : string, title : string } []` : 현재 진행 중인 일정들의 ID와 제목을 포함하는 객체 배열입니다.
- **주요 특징**
    - 현재 시간을 기준으로 진행 중인 일정만을 필터링하고 필요한 정보만 추출하여 반환함으로써, 데이터 처리의 효율성과 메모리 사용을 개선하였습니다.
    - 의존성 배열을 통해 posts가 변경될 때만 재계산을 수행하여 불필요한 연산을 방지했습니다.
    

**`useSignUpForm`** 

> 회원가입 폼의 상태관리, 유효성 검사, 제출 로직을 캡슐화 했습니다.
> 
- 내부적으로 useState와 useRouter를 사용합니다.
- **return** 값은 다음과 같습니다.
    - `email` : 사용자가 입력한 이메일
    - `setEmail` : 이메일 상태를 업데이트하는 함수
    - `password` : 사용자가 입력한 비밀번호
    - `setPassword` : 비밀번호 상태를 업데이트 하는 함수
    - `nickname` : 사용자가 입력한 닉네임
    - `setNickname` : 닉네임 상태를 업데이트하는 함수
    - `passwordVisible` : 비밀번호 표시 여부를 토글하는 함수
    - `registerHandler` : 회원가입 처리 함수
- **주요 특징**
    - 비동기 처리를 통해 회원가입 요청을 처리하고, 성공 시 사용자를 로그인 페이지로 리다이렉트합니다.

**`useLoginForm`** 

> 로그인 폼의 상태 관리, 비밀번호 가시성 토글, 인증 프로세스를 일원화하여 처리하는 기능을 제공합니다.
> 
- 내부적으로 useState, useContext, useRouter를 사용합니다.
- **return** 값은 다음과 같습니다.
    - `email` : 사용자가 입력한 이메일
    - `setEmail` : 이메일 상태를 업데이트하는 함수
    - `password` : 사용자가 입력한 비밀번호
    - `setPassword` : 비밀번호 상태를 업데이트 하는 함수
    - `passwordVisible` : 비밀번호 표시 여부를 토글하는 함수
    - `handleLogin` : 로그인 처리 함수
- **주요 특징**
    - 로그인 폼의 상태 관리와 제출 로직을 추상화하여 제공합니다. React Context를 활용하여 사용자 정보에 접근하고, 환경에 따른 조건부 로깅을 구현했습니다.

**`usePostStatistics`** 

> 게시물 데이터를 분석하여 월별, 총계, 기분별 통계를 생성합니다.
> 
- 입력 값으로 posts (통계를 계산할 포스트 데이터 배열) 을 받습니다.
- **return** 값은 다음과 같습니다.
    - `monthlyPostCounts` : 월별 포스트 수 (12개월)
    - `totalPosts` : 전체 포스트 수
    - `moodCounts` : 기분별 포스트 수
- **주요 특징**
    - useMemo를 활용하여 포스트 데이터의 다양한 통계를 효율적으로 계산합니다.
    - 월별, 총계, 기분별 포스트 수를 한 번의 순회로 계산하여 성능을 최적화했습니다.
    - 의존성 배열을 통해 posts가 변경될 때만 재계산을 수행하여 불필요한 연산을 방지합니다.

**`useDateManagement`** 

> 날짜 선택 및 범위 설정에 관한 복잡한 로직을 추상화하여 간편한 인터페이스로 제공합니다.
> 
- 내부적으로 useScheduleStore를 사용합니다.
- **return** 값은 다음과 같습니다.
    - `startDate` : 선택된 날짜
    - `endDate` : 종료 날짜
    - `handleStartDateChange` : 시작 날짜 변경 함수
    - `handleEndDateChange` : 종료 날짜 변경 함수
- **주요 특징**
    - Zustand 스토어(useScheduleStore)를 활용하여 날짜 관련 상태를 중앙에서 관리합니다.
    - 시작 날짜와 종료 날짜 변경 시 일관성을 유지하기 위한 로직(예: 시작 날짜가 종료 날짜보다 늦을 경우 자동 조정)을 포함하고 있습니다.

## 🛎️ API 요청

<aside>
💡

**환경에 따른 baseURL 설정과 공통 헤더 적용으로 API 요청의 일관성과 유연성을 높였습니다.**

</aside>

📒 [TimeInK API 명세서](https://www.notion.so/43d3e4a17e794630b4b5d9b76caf3fcf?pvs=21)

### **user API**

- `signUp` : 이메일, 비밀번호, 닉네임으로 새 계정을 생성합니다.
- `signIn` : 이메일과 비밀번호로 사용자를 인증합니다.
- `post` : 입력 정보로 새 게시물을 생성합니다.
- `getPost` : 이메일로 사용자의 모든 게시물을 조회합니다.
- `getPostById` : 게시물 ID로 특정 게시물을 조회합니다.
- `updatePost` : 게시물 ID와 새로운 정보로 게시물을 업데이트합니다.
- `updatePostDates` : 게시물 ID와 새로운 시작일, 종료일로 날짜 정보를 업데이트합니다.
- `deletePost` : 이메일과 게시물 ID로 특정 게시물을 삭제합니다.
- `updateUserNickname` : 이메일과 새 닉네임으로 사용자 정보를 업데이트합니다.

### **smart API**

- `classify` : 텍스트 항목들을 AI 모델로 분류합니다.
- `feedback` : 분류 결과에 대한 사용자 피드백을 제공합니다. (AI 모델 개선용)

## 🤖 AI 기능

<aside>
💡

사용자들이 일정을 입력할 때마다 매번 카테고리를 수동으로 선택해야 하는 불편함이 있었습니다. 이미 선택할 것이 많은 상태에서 더 추가하는 것은 효율성이 떨어진다 생각해 도입했습니다.

</aside>

- **애플리케이션 구조**
    - `Flask`를 사용해 `RESTful API` 서버를 구축하고 CORS 설정으로 특정 오리진만 허용했습니다.
        
        ```python
        app = Flask(__name__)
        
        CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://bagpack.vercel.app"]}})
        
        @app.route('/classify', methods=['POST'])
        def classify_activity():
        
        @app.route('/feedback', methods=['POST'])
        def feedback():
        
        @app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({'status': 'healthy'}), 200
        
        if __name__ == '__main__':
            port = int(os.environ.get("PORT", 5000))
            app.run(host='0.0.0.0', port=port)
        ```
        

- **머신러닝 모델**
    - Render의 무료 요금제를 이용하고 있었기 때문에 512mb 미만의 경량 모델을 선택했습니다.
    - scikit-learn 라이브러리의 MultinomialNB(다항 나이브 베이즈) 모델을 사용했습니다.
        
        ```python
        from sklearn.feature_extraction.text import CountVectorizer
        from sklearn.naive_bayes import MultinomialNB
        
        vectorizer = CountVectorizer()
        model = MultinomialNB()
        ```
        
    - CountVectorizer를 사용하여 텍스트 데이터를 수치화하고, 이를 MultinomialNB 모델에 입력하여 학습합니다.

- **데이터 처리 및 모델 학습**
    - 텍스트 데이터와 레이블을 로드하고 전처리하는 함수를 구현했습니다.
        
        ```python
        def load_data():
            texts = []
            labels = []
            with open('training_data.txt', 'r', encoding='utf-8') as f:
                for line in f:
                    text, label = line.strip().split('\t')
                    texts.append(text)
                    labels.append(categories.index(label))
            logging.info(f"Loaded {len(texts)} training examples")
            return texts, labels
        ```
        
    - 모델 학습 함수에서는 데이터를 학습/테스트 세트로 분할하고, 모델을 학습시킨 후 정확도를 평가합니다.
        
        ```python
        def train_model():
            texts, labels = load_data()
            X = vectorizer.fit_transform(texts)
            X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)
            model.fit(X_train, y_train)
            accuracy = model.score(X_test, y_test)
            logging.info(f"Model trained. Accuracy: {accuracy:.2f}")
        ```
        

- **모델 저장 및 로드**
    - 모델 학습 함수에서는 데이터를 학습/테스트 세트로 분할하고, 모델을 학습시킨 후 정확도를 평가합니다.
        
        ```python
        joblib.dump(vectorizer, 'vectorizer.joblib')
        joblib.dump(model, 'model.joblib')
        ```
        

- **예측 및 피드백 처리**
    - 사용자 입력에 대한 예측을 수행하고, 결과를 반환하는 함수를 구현했습니다.
    - 사용자 피드백을 받아 모델을 지속적으로 개선할 수 있는 시스템을 구축했습니다.

## 🛠️ Type

<aside>
💡

타입스크립트의 명확한 타입 정의로 코드의 안정성과 가독성을 높입니다.

</aside>

### 📅 캘린더 타입

```tsx
import { EventContentArg } from "@fullcalendar/core";

export type CalendarProps = {
  onDateClick?: (info: any) => void;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  backgroundColor?: string;
  end: string;
  content?: string;
  classNames?: string[];
};

export type EventContentProps = {
  arg: EventContentArg;
  eventTitles: { [key: string]: string };
};
```

### 🏠 **HomePage 타입**

```tsx
import React from "react";
// CurrentSchedules.tsx
export type Schedule = {
  id: string;
  title: string;
};

export type CurrentSchedulesProps = {
  schedules: Schedule[];
};

// MonthlyPostChart.tsx
export type MonthlyPostChartProps = {
  monthlyPostCounts: number[];
};

// MoodDistributionChart.tsx
export type MoodCounts = {
  happy: number;
  smile: number;
  neutral: number;
  sad: number;
  terrible: number;
};

export type MoodDistributionChartProps = {
  moodCounts: MoodCounts;
};

// StatisticsItems.tsx
export type StatisticsItemProps = {
  title: string;
  value: number;
};

// ResponsiveMobileLayout.tsx
export type ResponsiveMobileLayoutProps = {
  isMobile: boolean;
  userSection: React.ReactNode;
  welcomeSection: React.ReactNode;
  mainSection: React.ReactNode;
};
```

### 👋 **IntroPage 타입**

```tsx
export type FeatureItemProps = {
  iconSrc: string;
  title: string;
  description?: string;
};
```

### 🔐 LoginPage 타입

```tsx
export type LoginFormProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};
```

### 🖼️ MyPage 타입

```tsx
export type NicknameFormProps = {
  userEmail: string;
  initialNickname: string;
};
```

### ⏰ SchedulePage 타입

```tsx
import { Post } from "./user";

export type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export type StepOneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleGoToNextModal: () => void;
  user: any;
  handleMoodClick: (mood: string) => void;
};

export type StepTwoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsNextModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export type ScheduleDetailParams = {
  id: string;
};

export type ScheduleDetailProps = {
  params: ScheduleDetailParams;
  data: Post;
};

// [id]/modify
export type ModifyProps = {
  id: string;
};

```

### ✉️ SignUpPage 타입

```tsx
export type SignUpFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  registerHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
};
```

### 🤖 SmartPage 타입

```tsx
export type ClassificationResult = {
  text: string;
  predicted_category: string;
  confidence: number;
};

export type PostWithClassification = ClassificationResult & {
  id: string;
};
```

### 👤 User 관련 타입

```tsx
export type Timestamp = {
  nanoseconds: number;
  seconds: number;
};

export type Mood = "terrible" | "sad" | "natural" | "smile" | "happy" | "error";

export type Post = {
  mood: Mood;
  content: string;
  endDate: string;
  id: string;
  title: string;
  startDate: string;
  priority: string;
  isDone?: boolean;
  email?: string;
};

export type User = {
  email: string;
  isDone: boolean;
  nickname: string;
  palette?: string[];
  created_at: Timestamp;
  posts?: Post[];
  id: string;
  profilePictureUrl: string;
};

export type UserProps = {
  user: User | null;
};

```

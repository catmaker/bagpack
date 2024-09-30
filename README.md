# TimeInK

TimeInK는 사용자가 **일정**과 **감정**을 함께 **기록**하는 웹으로, **AI**가 일정을 **자동**으로 분류해줍니다. 축적된 데이터를 통해 사용자의 감정 패턴과 생산성을 분석하여 **인사이트**를 제공하는 **1인** 프로젝트 입니다.

<a href="https://youtu.be/VGhBWgkYJtU">
  <img src="https://img.youtube.com/vi/VGhBWgkYJtU/0.jpg" width="200" />
</a>
<a href="https://youtu.be/UQyWzpY6ynQ">
  <img src="https://img.youtube.com/vi/UQyWzpY6ynQ/0.jpg" width="200" />
</a>
<a href="https://youtu.be/0kvWxrh7RHg">
  <img src="https://img.youtube.com/vi/0kvWxrh7RHg/0.jpg" width="200" />
</a>
<a href="https://youtu.be/NXkemx0XNaM">
  <img src="https://img.youtube.com/vi/NXkemx0XNaM/0.jpg" width="200" />
</a>

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

## 보안 및 규정 준수
- HTTPS를 통한 모든 통신 암호화
- GDPR 및 CCPA 규정 준수를 위한 데이터 처리 정책
- 정기적인 보안 감사 및 취약점 분석

## 향후 계획
- 음성 인식을 통한 일정 등록 기능
- 더욱 정교한 AI 예측 모델 도입

# TimeInk

TimeInk는 사용자가 일정을 효율적으로 관리하고, 그로 인한 통계와 분석을 통해 인사이트를 얻을 수 있는 웹 애플리케이션입니다. 로그인, 일정 관리, 우선순위 설정, 그리고 드래그앤드롭 방식의 직관적인 달력 관리 기능을 제공합니다.

## 프로젝트 개요

TimeInk는 일정 관리의 기본 기능을 제공할 뿐만 아니라, 일정의 중요도에 따라 우선순위를 설정하고, 일정 데이터를 기반으로 한 다양한 통계와 분석 정보를 제공합니다.

### 주요 기능

- **로그인 및 사용자 인증**
  - 사용자 인증 기능을 통해 개인화된 일정 관리 제공.
- **일정 관리**

  - 일정 생성, 수정, 삭제 기능을 제공하며, 일정의 중요도와 기분, 날짜, 시간을 사용자 정의 가능.
  - 일정에 대한 드래그앤드롭으로 일정 이동 기능을 지원.

- **중요도에 따른 일정 관리**

  - 중요도를 `High`, `Medium`, `Low`로 설정하여 일정의 우선순위를 체계적으로 관리.

- **달력 관리**
  - 달력 내에서 일정을 직관적으로 관리할 수 있는 드래그앤드롭 기능 제공.

### 현재 완료된 기능

- **태스크 우선순위 설정** ( 09.01 )
  - 일정의 중요도를 기반으로 우선순위를 설정할 수 있으며, 이는 일정 관리의 효율성을 크게 향상시킵니다.

### 향후 개발 예정 기능

- **반복 일정 기능**  
   반복적인 일정을 쉽게 관리할 수 있도록 함으로써, 사용자의 편의성을 높일 예정입니다.

- **태그 시스템**  
   태그를 통해 일정을 분류하고 관리하는 기능을 추가하여, 유연성을 높이고 사용자 경험을 개선할 계획입니다.

- **다크 모드**  
   사용자에게 다크 모드를 제공하여 UI/UX를 개선합니다.

- **모바일 반응형 디자인 개선**  
   모바일 사용성 향상을 위해 반응형 디자인을 더욱 최적화할 예정입니다.

- **성능 최적화**  
   대량의 일정 데이터를 처리할 수 있도록 애플리케이션의 성능을 최적화합니다.

- **알림 기능**  
   이메일 및 브라우저 알림을 통해 사용자가 일정을 놓치지 않도록 도와줄 것입니다.

- **통계 및 분석**  
   사용자에게 유용한 인사이트를 제공할 수 있도록 일정 데이터를 분석하고 시각화하는 기능을 추가합니다.

- **공유 기능**  
   다른 사용자와 일정을 공유하여 협업할 수 있도록 합니다.

- **목표 설정 및 추적**  
   사용자가 장기적인 목표를 설정하고 이를 추적할 수 있는 기능을 추가합니다.

- **캘린더 내보내기/가져오기**  
   다른 캘린더 앱과 호환될 수 있도록 내보내기 및 가져오기 기능을 제공합니다.

- **날씨 정보 통합**  
   일정과 관련된 날씨 정보를 제공하여 부가 가치를 더합니다.

- **다국어 지원**  
   다양한 국가의 사용자를 고려하여 다국어 지원 기능을 추가합니다.

- **보안 강화**  
   2단계 인증 등의 보안 기능을 추가하여 사용자 데이터를 안전하게 보호합니다.

- **API 문서화**  
   프로젝트의 확장성을 위해 API 문서를 작성하고 관리합니다.

### 기술 스택

TimeInk 프로젝트는 다음과 같은 최신 웹 기술과 도구들을 사용하여 개발되었습니다:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![SCSS](https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-FF5722?style=for-the-badge&logo=zustand&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### 프론트엔드 개발 계획

- **에러 처리 및 로깅 개선**

- **테스트 코드 작성**  
   단위 테스트부터 시작하여 점진적으로 테스트 코드를 확대.

- **코드 품질 관리**  
   ESLint, Prettier 등의 도구를 사용하여 코드 일관성과 품질을 유지.

- **접근성(A11y) 개선**  
   모든 사용자가 접근 가능한 서비스를 제공하기 위해 접근성을 개선합니다.

- **CI/CD 파이프라인 구축**  
   자동화된 빌드 및 배포 파이프라인을 구축하여 배포 과정을 효율화.

- **성능 모니터링 도구 도입**

- **SEO 최적화**

- **사용자 분석 도구 통합**

- **크로스 브라우저 호환성 테스트 및 개선**

- **PWA 기능 구현**  
   TimeInk를 프로그레시브 웹 애플리케이션으로 확장하여, 오프라인 상태에서도 사용할 수 있도록 기능을 추가합니다.

## 배포된 사이트

현재 버전은 버그가 있을 수 있습니다.

### ver.1.0.0

- schedule 페이지 추가
- 일정 중요도 기능 추가
- 일정 중요도 필터 기능 추가
- 일정 관련 CRUD 기능 추가
- 일정 드래그앤드롭 기능 추가
- 회원가입 기능 추가
- 로그인 기능 추가
- 로그아웃 기능 추가
- VERCEL 배포

### ver.1.1.0 (예정)

- 마이페이지 추가
- 일정 반복 기능 추가
- 일정 태그 기능 추가

TimeInk는 현재 [[bagpack.vercel.app](https://bagpack.vercel.app)]에서 사용 가능합니다. 언제 어디서나 접근하여 일정을 관리할 수 있습니다.
![image](https://github.com/user-attachments/assets/cc75213a-4ec3-4491-b1b2-fb07f613cbba)

### 트러블 슈팅

문제 해결에 대한 자세한 내용은 [여기에서 확인하실 수 있습니다](https://sinjisoo97.tistory.com/category/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85) (티스토리 블로그로 이동됩니다) 📝.

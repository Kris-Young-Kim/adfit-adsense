# PRD (Product Requirements Document)
# Notion API 기반 블로그 웹사이트

## 1. 제품 개요 (Product Overview)

### 1.1 프로젝트 명
**Notion Blog - 광고 수익형 개인 블로그 플랫폼**

### 1.2 목적 및 배경
- Notion을 CMS(Content Management System)로 활용한 블로그 형식의 웹사이트 구축
- Kakao AdFit 및 Google AdSense를 통한 광고 수익 창출
- Notion의 편리한 글쓰기 환경과 웹 퍼블리싱의 장점을 결합
- 개발자가 직접 커스터마이징 가능한 개인 블로그 플랫폼 제공

### 1.3 핵심 문제 해결
- **문제 1**: 기존 블로그 플랫폼의 제한적인 커스터마이징 기능
- **문제 2**: Notion에서 작성한 콘텐츠를 별도의 블로그로 마이그레이션하는 번거로움
- **문제 3**: 광고 수익화를 위한 복잡한 설정 과정

---

## 2. 목표 및 성공 지표 (Goals & KPIs)

### 2.1 비즈니스 목표
- Notion API를 활용한 콘텐츠 자동 동기화 시스템 구축
- Kakao AdFit 및 Google AdSense 광고 통합으로 수익화 가능한 플랫폼 제공
- SEO 최적화를 통한 검색 엔진 노출 증대

### 2.2 사용자 목표
- Notion에서 익숙하게 글을 작성하고 자동으로 블로그에 게시
- 광고 수익을 창출할 수 있는 개인 블로그 운영
- 빠른 페이지 로딩 속도와 반응형 디자인 제공

### 2.3 성공 지표 (KPIs)
- **페이지 로딩 속도**: 초기 로딩 시간 < 3초
- **Notion API 동기화**: 빌드 시 100% 콘텐츠 동기화
- **광고 노출**: 페이지당 최소 2-3개 광고 단위 배치
- **SEO 점수**: Lighthouse SEO 점수 90점 이상
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 대응

---

## 3. 타겟 사용자 (User Persona)

### 페르소나 1: 개발자 블로거
- **이름**: 김개발 (28세, 프론트엔드 개발자)
- **니즈**: 
  - Notion에서 기술 블로그 글을 작성하고 자동으로 블로그에 게시하고 싶음
  - 광고 수익을 통해 부수입을 창출하고 싶음
  - 코드 블록, 이미지 등을 포함한 다양한 콘텐츠 타입 지원 필요
- **문제점**: 
  - 기존 플랫폼(티스토리, 벨로그)의 에디터가 불편함
  - Notion의 콘텐츠를 매번 복사-붙여넣기하는 것이 번거로움

### 페르소나 2: 콘텐츠 크리에이터
- **이름**: 박콘텐츠 (32세, 1인 미디어 운영자)
- **니즈**:
  - 깔끔한 디자인의 블로그에서 글과 이미지를 공유하고 싶음
  - 광고 수익을 통해 지속 가능한 콘텐츠 제작 환경 구축
  - 모바일 환경에서도 최적화된 블로그 필요
- **문제점**:
  - 워드프레스 등의 플랫폼은 설정이 복잡함
  - Notion의 간편함을 유지하면서 퍼블리싱하고 싶음

---

## 4. 기능 요구사항 (Feature Requirements)

### 4.1 핵심 기능 (High Priority)

#### F-1: Notion API 연동
- **설명**: Notion Database를 CMS로 활용하여 블로그 게시글 데이터를 가져옴
- **상세 요구사항**:
  - Notion Integration을 통한 API 인증
  - Database의 페이지 리스트 조회 (게시글 목록)
  - 개별 페이지의 블록(Block) 데이터 조회
  - 게시글 메타데이터 (제목, 태그, 작성일, 썸네일 등) 파싱
- **우선순위**: High
- **의존성**: Notion API Key, Database ID

#### F-2: 블로그 게시글 목록 페이지
- **설명**: Notion에서 가져온 게시글을 카드 형태로 표시
- **상세 요구사항**:
  - 게시글 썸네일 이미지 표시
  - 제목, 요약, 작성일, 태그 표시
  - 카테고리별 필터링 기능
  - 페이지네이션 또는 무한 스크롤
- **우선순위**: High
- **의존성**: F-1

#### F-3: 게시글 상세 페이지
- **설명**: 개별 게시글의 전체 내용을 렌더링
- **상세 요구사항**:
  - Notion Block을 HTML로 변환 (제목, 단락, 코드 블록, 이미지, 리스트 등)
  - 코드 블록 Syntax Highlighting 지원
  - 목차(Table of Contents) 자동 생성
  - 이전/다음 게시글 네비게이션
- **우선순위**: High
- **의존성**: F-1, F-2

#### F-4: Kakao AdFit 광고 통합
- **설명**: Kakao AdFit 광고를 블로그에 삽입
- **상세 요구사항**:
  - 광고 단위 스크립트 삽입
  - 게시글 상단, 중간, 하단에 광고 배치
  - 반응형 광고 지원
- **우선순위**: High
- **의존성**: F-3

#### F-5: Google AdSense 광고 통합
- **설명**: Google AdSense 광고를 블로그에 삽입
- **상세 요구사항**:
  - AdSense 스크립트 삽입
  - Auto Ads 또는 수동 광고 단위 배치
  - 게시글 본문 내 자연스러운 광고 배치
- **우선순위**: High
- **의존성**: F-3

### 4.2 부가 기능 (Medium Priority)

#### F-6: SEO 최적화
- **설명**: 검색 엔진 최적화를 위한 메타 태그 및 구조화된 데이터 삽입
- **상세 요구사항**:
  - 동적 메타 태그 생성 (title, description, OG tags)
  - Sitemap.xml 자동 생성
  - robots.txt 설정
  - 구조화된 데이터 (JSON-LD) 삽입
- **우선순위**: Medium
- **의존성**: F-1, F-3

#### F-7: 검색 기능
- **설명**: 블로그 내 게시글 검색 기능
- **상세 요구사항**:
  - 제목 및 본문 기반 검색
  - 태그 기반 필터링
  - 검색 결과 하이라이트
- **우선순위**: Medium
- **의존성**: F-2

#### F-8: 다크 모드
- **설명**: 사용자 선호도에 따른 다크/라이트 모드 지원
- **상세 요구사항**:
  - 테마 전환 토글 버튼
  - 시스템 설정 자동 감지
  - 로컬 스토리지에 사용자 선택 저장
- **우선순위**: Medium
- **의존성**: None

### 4.3 향후 기능 (Low Priority)

#### F-9: 댓글 시스템
- **설명**: 게시글에 댓글을 달 수 있는 기능 (예: utterances, giscus)
- **우선순위**: Low

#### F-10: 구독 기능
- **설명**: 이메일 또는 RSS 피드를 통한 구독 기능
- **우선순위**: Low

---

## 5. 기술 요구사항 (Technical Requirements)

### 5.1 기술 스택
- **Frontend Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API
- **Deployment**: Vercel
- **Ad Networks**: Kakao AdFit, Google AdSense

### 5.2 API 연동
- **Notion API**:
  - 인증: Internal Integration Token
  - 엔드포인트: 
    - `GET /v1/databases/{database_id}/query` - 게시글 목록 조회
    - `GET /v1/pages/{page_id}` - 개별 페이지 메타데이터 조회
    - `GET /v1/blocks/{block_id}/children` - 페이지 블록 데이터 조회

### 5.3 성능 요구사항
- **빌드 타임 데이터 페칭**: SSG(Static Site Generation) 활용
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 스플리팅**: 자동 코드 분할로 초기 로딩 시간 단축
- **캐싱**: ISR(Incremental Static Regeneration) 적용 (revalidate: 3600초)

### 5.4 보안 요구사항
- **환경 변수 관리**: `.env.local` 파일을 통한 API Key 보안
- **HTTPS**: Vercel 배포 시 자동 HTTPS 적용
- **API Rate Limiting**: Notion API 요청 제한 준수 (3 requests/second)

---

## 6. 디자인 요구사항 (UI/UX Specifications)

### 6.1 디자인 컨셉
- **스타일**: 미니멀, 깔끔한 레이아웃
- **색상**: 흰색/회색 기반 (라이트 모드), 다크 그레이 기반 (다크 모드)
- **폰트**: 
  - 한글: Pretendard
  - 영문: Inter
  - 코드: Fira Code

### 6.2 반응형 디자인
- **Mobile**: 320px ~ 767px
- **Tablet**: 768px ~ 1023px
- **Desktop**: 1024px 이상

### 6.3 사용자 경험 지침
- **네비게이션**: 상단 고정 헤더 (홈, 블로그, 검색, 다크모드)
- **로딩 상태**: Skeleton UI 또는 스피너 표시
- **에러 처리**: 친화적인 에러 메시지 및 fallback UI

---

## 7. 일정 및 마일스톤 (Timeline & Milestones)

### Phase 1: 기본 기능 구현 (2주)
- [x] Next.js 프로젝트 초기 세팅
- [ ] Notion API 연동 및 데이터 페칭
- [ ] 게시글 목록 페이지 구현
- [ ] 게시글 상세 페이지 구현

### Phase 2: 광고 통합 (1주)
- [ ] Kakao AdFit 광고 삽입
- [ ] Google AdSense 광고 삽입
- [ ] 광고 배치 최적화

### Phase 3: 부가 기능 및 최적화 (1주)
- [ ] SEO 최적화
- [ ] 검색 기능 구현
- [ ] 다크 모드 구현
- [ ] 성능 최적화 (이미지, 코드 스플리팅)

### Phase 4: 배포 및 테스트 (3일)
- [ ] Vercel 배포
- [ ] 광고 승인 신청 (Kakao AdFit, Google AdSense)
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 반응형 테스트

---

## 8. 위험 관리 및 제약사항

### 8.1 예상 리스크
- **리스크 1**: Notion API Rate Limiting으로 인한 데이터 페칭 실패
  - **완화 전략**: 빌드 타임에 데이터를 페칭하고 ISR로 주기적 갱신
- **리스크 2**: 광고 플랫폼 승인 거부
  - **완화 전략**: 양질의 콘텐츠와 충분한 트래픽 확보 후 신청
- **리스크 3**: Notion 이미지 URL 만료
  - **완화 전략**: 이미지를 CDN에 업로드하거나 주기적으로 URL 갱신

### 8.2 기술적 제약사항
- Notion API는 일부 블록 타입(임베드, 토글 등)에 대한 제한적인 지원
- Kakao AdFit 및 Google AdSense는 심사 및 승인 과정 필요
- SSG 방식으로 인해 실시간 콘텐츠 업데이트 불가 (ISR로 보완)

---

## 9. 참고 자료

### 9.1 Notion API 문서
- Notion API 공식 문서: https://developers.notion.com/
- Notion SDK for JavaScript: https://github.com/makenotion/notion-sdk-js

### 9.2 광고 플랫폼 가이드
- Kakao AdFit 가이드: https://adfit.kakao.com/
- Google AdSense 고객센터: https://support.google.com/adsense

### 9.3 Next.js 문서
- Next.js 공식 문서: https://nextjs.org/docs
- App Router 가이드: https://nextjs.org/docs/app

---

## 10. 승인 및 버전 관리

| 버전 | 작성일 | 작성자 | 변경 사항 |
|------|--------|--------|-----------|
| 1.0 | 2025-11-11 | 프로젝트 팀 | 초안 작성 |

---

**문서 끝**

# TODO.md

# Notion API 기반 블로그 웹사이트 개발 계획

## 📋 프로젝트 진행 상태

### Phase 1: 기본 기능 구현 ✅ 완료

- [x] 1.1 Next.js 14 프로젝트 초기 세팅 `[HIGH]` - 완료일: 2025-11-11
- [x] 1.2 TypeScript 설정 `[HIGH]` - 완료일: 2025-11-11
- [x] 1.3 Tailwind CSS 설정 `[HIGH]` - 완료일: 2025-11-11
- [x] 1.4 프로젝트 디렉토리 구조 설계 `[HIGH]` - 완료일: 2025-11-11
- [x] 1.5 Notion API 클라이언트 설정 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.6 Notion Integration 생성 및 API Key 발급 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.7 Notion Database 생성 및 구조 설계 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.8 환경 변수 설정 (.env.local) `[HIGH]` - 완료일: 2025-01-27
- [x] 1.9 Notion API 데이터 페칭 함수 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.10 게시글 목록 조회 API 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.11 게시글 상세 조회 API 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.12 Notion Block Parser 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.13 홈 페이지 레이아웃 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.14 헤더/푸터 컴포넌트 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.15 게시글 목록 페이지 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.16 게시글 카드 컴포넌트 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.17 게시글 상세 페이지 구현 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.18 코드 블록 Syntax Highlighting 적용 `[HIGH]` - 완료일: 2025-01-27
- [x] 1.19 이미지 최적화 (Next.js Image) `[MEDIUM]` - 완료일: 2025-01-27
- [x] 1.20 반응형 디자인 적용 `[HIGH]` - 완료일: 2025-01-27

---

### Phase 2: 광고 통합 🟡 진행중

- [x] 2.1 Kakao AdFit 계정 생성 및 매체 등록 `[HIGH]` - 완료일: 2025-01-27
- [x] 2.2 Kakao AdFit 광고 단위 생성 `[HIGH]` - 완료일: 2025-01-27
- [x] 2.3 Kakao AdFit 광고 스크립트 삽입 `[HIGH]` - 완료일: 2025-01-27
- [x] 2.4 Kakao AdFit 반응형 광고 적용 `[HIGH]` - 완료일: 2025-01-27
- [ ] 2.5 Google AdSense 계정 생성 및 사이트 등록 `[HIGH]` - 사용자 작업 필요
- [x] 2.6 Google AdSense 광고 코드 삽입 `[HIGH]` - 완료일: 2025-01-27
- [x] 2.7 Google AdSense Auto Ads 설정 `[MEDIUM]` - 완료일: 2025-01-27
- [x] 2.8 게시글 상단/중간/하단 광고 배치 `[HIGH]` - 완료일: 2025-01-27
- [ ] 2.9 사이드바 광고 배치 (Desktop) `[MEDIUM]` - 향후 구현
- [x] 2.10 광고 로딩 최적화 `[MEDIUM]` - 완료일: 2025-01-27

---

### Phase 3: 부가 기능 및 최적화 🟡 진행중

- [x] 3.1 동적 메타 태그 생성 (SEO) `[MEDIUM]` - 완료일: 2025-01-27
- [x] 3.2 Open Graph 태그 설정 `[MEDIUM]` - 완료일: 2025-01-27
- [x] 3.3 Sitemap.xml 자동 생성 `[MEDIUM]` - 완료일: 2025-01-27
- [x] 3.4 robots.txt 설정 `[MEDIUM]` - 완료일: 2025-01-27
- [ ] 3.5 JSON-LD 구조화된 데이터 삽입 `[MEDIUM]`
- [ ] 3.6 검색 기능 구현 (제목/본문 검색) `[MEDIUM]`
- [ ] 3.7 태그 기반 필터링 `[MEDIUM]`
- [ ] 3.8 카테고리 페이지 구현 `[MEDIUM]`
- [ ] 3.9 다크 모드 UI 구현 `[MEDIUM]`
- [ ] 3.10 다크 모드 테마 전환 로직 `[MEDIUM]`
- [ ] 3.11 로컬 스토리지 테마 저장 `[MEDIUM]`
- [ ] 3.12 목차(Table of Contents) 자동 생성 `[LOW]`
- [ ] 3.13 이전/다음 게시글 네비게이션 `[MEDIUM]`
- [ ] 3.14 페이지네이션 또는 무한 스크롤 `[MEDIUM]`
- [ ] 3.15 코드 분할 (Code Splitting) 최적화 `[MEDIUM]`
- [x] 3.16 ISR (Incremental Static Regeneration) 적용 `[HIGH]` - 완료일: 2025-01-27

---

### Phase 4: 배포 및 테스트 🟡 진행중

- [x] 4.1 Vercel 계정 생성 및 프로젝트 연결 `[HIGH]` - 완료일: 2025-01-27
- [x] 4.2 환경 변수 Vercel에 등록 `[HIGH]` - 완료일: 2025-01-27
- [x] 4.3 프로덕션 빌드 테스트 `[HIGH]` - 완료일: 2025-01-27
- [x] 4.4 Vercel에 배포 `[HIGH]` - 완료일: 2025-01-27
- [ ] 4.5 커스텀 도메인 연결 (선택) `[LOW]`
- [x] 4.6 Kakao AdFit 광고 승인 신청 `[HIGH]` - 완료일: 2025-01-27
- [ ] 4.7 Google AdSense 광고 승인 신청 `[HIGH]`
- [ ] 4.8 Chrome 브라우저 테스트 `[HIGH]`
- [ ] 4.9 Safari 브라우저 테스트 `[MEDIUM]`
- [ ] 4.10 Firefox 브라우저 테스트 `[MEDIUM]`
- [ ] 4.11 모바일 반응형 테스트 (iOS) `[HIGH]`
- [ ] 4.12 모바일 반응형 테스트 (Android) `[HIGH]`
- [ ] 4.13 Lighthouse 성능 테스트 `[MEDIUM]`
- [ ] 4.14 SEO 점수 확인 및 개선 `[MEDIUM]`

---

### Phase 5: 향후 개선 사항 ⬜ 대기

- [ ] 5.1 댓글 시스템 구현 (utterances/giscus) `[LOW]`
- [ ] 5.2 이메일 구독 기능 `[LOW]`
- [ ] 5.3 RSS 피드 생성 `[LOW]`
- [ ] 5.4 조회수 트래킹 `[LOW]`
- [ ] 5.5 게시글 공유 버튼 (SNS) `[LOW]`
- [ ] 5.6 Google Analytics 연동 `[MEDIUM]`
- [ ] 5.7 다국어 지원 (i18n) `[LOW]`

---

## 🚀 빠른 시작 가이드

### 1. Notion 설정

1. Notion Integration 생성: https://developers.notion.com/
2. Notion Database 생성 및 Integration 권한 부여
3. Database ID 복사

### 2. 프로젝트 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# NOTION_API_KEY, NOTION_DATABASE_ID 입력

# 개발 서버 실행
npm run dev
```

### 3. 광고 설정

1. Kakao AdFit: https://adfit.kakao.com/
2. Google AdSense: https://www.google.com/adsense/

---

## 📝 작업 규칙

### 우선순위

- **HIGH**: 프로젝트 핵심 기능, 즉시 처리 필요
- **MEDIUM**: 중요하지만 나중에 처리 가능
- **LOW**: 향후 개선 사항

### 상태 표시

- ✅ 완료: 작업 완료 및 테스트 통과 (체크박스에 `[x]` 표시)
- 🟢 진행중: 현재 작업 중
- 🟡 대기: 다른 작업 완료 대기
- ⬜ 미착수: 아직 시작하지 않음 (체크박스에 `[ ]` 표시)
- ❌ 보류: 일시적으로 보류된 작업

---

## 🐛 버그 및 이슈 트래킹

| ID  | 제목 | 설명 | 우선순위 | 상태 | 담당자 |
| --- | ---- | ---- | -------- | ---- | ------ |
| -   | -    | -    | -        | -    | -      |

---

## 💡 아이디어 및 개선 사항

| 제안일     | 제목             | 설명                         | 우선순위 | 상태   |
| ---------- | ---------------- | ---------------------------- | -------- | ------ |
| 2025-11-11 | 게시글 공유 기능 | SNS 공유 버튼 추가           | LOW      | 검토중 |
| 2025-11-11 | 인기 게시글 표시 | 조회수 기반 인기 게시글 섹션 | LOW      | 검토중 |

---

## 📚 참고 자료

### 공식 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 공식 문서](https://developers.notion.com/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

### 광고 플랫폼

- [Kakao AdFit 가이드](https://adfit.kakao.com/)
- [Google AdSense 고객센터](https://support.google.com/adsense)

---

## 📅 주간 목표

### Week 1 (2025-11-11 ~ 2025-11-17)

- [x] 프로젝트 초기 세팅
- [x] Notion API 연동 완료
- [x] 게시글 목록/상세 페이지 구현

### Week 2 (2025-11-18 ~ 2025-11-24)

- [x] 광고 통합 완료
- [x] SEO 최적화 완료
- [x] 배포 준비

---

**문서 끝**

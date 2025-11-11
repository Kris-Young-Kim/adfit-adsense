# DIR.md
# 프로젝트 디렉토리 구조

## 📁 전체 디렉토리 구조

```
notion-blog/
├── .github/                      # GitHub 관련 설정
│   └── workflows/                # GitHub Actions CI/CD
│       └── deploy.yml            # 자동 배포 설정
│
├── public/                       # 정적 파일
│   ├── images/                   # 이미지 에셋
│   │   ├── logo.png             # 로고 이미지
│   │   └── og-image.png         # Open Graph 이미지
│   ├── favicon.ico              # 파비콘
│   ├── robots.txt               # 검색 엔진 크롤러 설정
│   └── sitemap.xml              # 사이트맵 (자동 생성)
│
├── src/                         # 소스 코드
│   ├── app/                     # Next.js App Router
│   │   ├── (main)/              # 메인 레이아웃 그룹
│   │   │   ├── page.tsx         # 홈페이지 (/)
│   │   │   ├── layout.tsx       # 메인 레이아웃
│   │   │   └── loading.tsx      # 로딩 UI
│   │   │
│   │   ├── blog/                # 블로그 페이지
│   │   │   ├── page.tsx         # 게시글 목록 (/blog)
│   │   │   ├── [slug]/          # 동적 라우트
│   │   │   │   └── page.tsx     # 게시글 상세 (/blog/[slug])
│   │   │   └── loading.tsx      # 로딩 UI
│   │   │
│   │   ├── category/            # 카테고리 페이지
│   │   │   └── [category]/
│   │   │       └── page.tsx     # 카테고리별 게시글 목록
│   │   │
│   │   ├── search/              # 검색 페이지
│   │   │   └── page.tsx         # 검색 결과 (/search)
│   │   │
│   │   ├── api/                 # API 라우트 (필요시)
│   │   │   └── revalidate/
│   │   │       └── route.ts     # ISR 재검증 API
│   │   │
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── globals.css          # 전역 CSS (Tailwind)
│   │   ├── error.tsx            # 에러 페이지
│   │   └── not-found.tsx        # 404 페이지
│   │
│   ├── components/              # React 컴포넌트
│   │   ├── common/              # 공통 컴포넌트
│   │   │   ├── Header.tsx       # 헤더
│   │   │   ├── Footer.tsx       # 푸터
│   │   │   ├── Navigation.tsx   # 네비게이션
│   │   │   ├── ThemeToggle.tsx  # 다크모드 토글
│   │   │   └── SearchBar.tsx    # 검색 바
│   │   │
│   │   ├── blog/                # 블로그 관련 컴포넌트
│   │   │   ├── PostCard.tsx     # 게시글 카드
│   │   │   ├── PostList.tsx     # 게시글 목록
│   │   │   ├── PostDetail.tsx   # 게시글 상세
│   │   │   ├── PostHeader.tsx   # 게시글 헤더
│   │   │   ├── PostContent.tsx  # 게시글 본문
│   │   │   ├── PostNavigation.tsx # 이전/다음 네비게이션
│   │   │   ├── TableOfContents.tsx # 목차
│   │   │   └── CategoryTag.tsx  # 카테고리 태그
│   │   │
│   │   ├── notion/              # Notion 블록 렌더러
│   │   │   ├── BlockRenderer.tsx      # 블록 렌더러
│   │   │   ├── ParagraphBlock.tsx     # 단락 블록
│   │   │   ├── HeadingBlock.tsx       # 제목 블록
│   │   │   ├── CodeBlock.tsx          # 코드 블록
│   │   │   ├── ImageBlock.tsx         # 이미지 블록
│   │   │   ├── ListBlock.tsx          # 리스트 블록
│   │   │   └── QuoteBlock.tsx         # 인용 블록
│   │   │
│   │   ├── ads/                 # 광고 컴포넌트
│   │   │   ├── AdFitAd.tsx      # Kakao AdFit 광고
│   │   │   ├── AdSenseAd.tsx    # Google AdSense 광고
│   │   │   └── AdContainer.tsx  # 광고 컨테이너
│   │   │
│   │   └── ui/                  # 기본 UI 컴포넌트
│   │       ├── Button.tsx       # 버튼
│   │       ├── Input.tsx        # 인풋
│   │       ├── Card.tsx         # 카드
│   │       ├── Badge.tsx        # 배지
│   │       └── Skeleton.tsx     # 스켈레톤 로더
│   │
│   ├── lib/                     # 유틸리티 및 헬퍼 함수
│   │   ├── notion/              # Notion API 관련
│   │   │   ├── client.ts        # Notion 클라이언트 초기화
│   │   │   ├── posts.ts         # 게시글 데이터 페칭
│   │   │   ├── blocks.ts        # 블록 데이터 페칭
│   │   │   └── parser.ts        # Notion Block 파서
│   │   │
│   │   ├── seo/                 # SEO 관련
│   │   │   ├── metadata.ts      # 메타데이터 생성
│   │   │   ├── sitemap.ts       # Sitemap 생성
│   │   │   └── jsonld.ts        # JSON-LD 구조화 데이터
│   │   │
│   │   ├── utils/               # 일반 유틸리티
│   │   │   ├── date.ts          # 날짜 포맷팅
│   │   │   ├── string.ts        # 문자열 처리
│   │   │   └── validation.ts    # 유효성 검사
│   │   │
│   │   └── constants.ts         # 상수 정의
│   │
│   ├── types/                   # TypeScript 타입 정의
│   │   ├── notion.ts            # Notion 관련 타입
│   │   ├── post.ts              # 게시글 타입
│   │   ├── ad.ts                # 광고 타입
│   │   └── common.ts            # 공통 타입
│   │
│   ├── hooks/                   # 커스텀 React 훅
│   │   ├── useTheme.ts          # 테마 훅
│   │   ├── useSearch.ts         # 검색 훅
│   │   └── useIntersection.ts   # Intersection Observer 훅
│   │
│   ├── styles/                  # 스타일 관련
│   │   ├── fonts.ts             # 폰트 설정
│   │   └── theme.ts             # 테마 설정
│   │
│   └── config/                  # 설정 파일
│       ├── site.ts              # 사이트 기본 설정
│       └── ads.ts               # 광고 설정
│
├── .env.local                   # 환경 변수 (로컬)
├── .env.example                 # 환경 변수 예시
├── .gitignore                   # Git 제외 파일
├── next.config.js               # Next.js 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 설정
├── package.json                 # 의존성 및 스크립트
├── postcss.config.js            # PostCSS 설정
├── README.md                    # 프로젝트 설명
├── PRD.md                       # 제품 요구사항 문서
├── TODO.md                      # 작업 목록
├── Mermaid.md                   # 플로우차트 및 다이어그램
└── DIR.md                       # 디렉토리 구조 (현재 파일)
```

---

## 📂 주요 디렉토리 설명

### `/public`
정적 파일을 저장하는 디렉토리입니다. 빌드 시 그대로 복사되며, `/` 경로로 접근할 수 있습니다.
- **이미지**: 로고, OG 이미지 등
- **파비콘**: 브라우저 탭 아이콘
- **robots.txt**: 검색 엔진 크롤러 제어
- **sitemap.xml**: 검색 엔진용 사이트맵 (자동 생성)

### `/src/app`
Next.js App Router 기반 라우팅 구조입니다. 폴더명이 URL 경로가 됩니다.
- **`page.tsx`**: 해당 경로의 페이지 컴포넌트
- **`layout.tsx`**: 페이지를 감싸는 레이아웃
- **`loading.tsx`**: 로딩 UI (Suspense)
- **`error.tsx`**: 에러 바운더리
- **`not-found.tsx`**: 404 페이지

**라우트 그룹**: `(main)` 같은 괄호로 감싼 폴더는 URL에 포함되지 않으며, 레이아웃을 그룹화하는 용도입니다.

### `/src/components`
재사용 가능한 React 컴포넌트를 기능별로 분류합니다.
- **`common/`**: 헤더, 푸터 등 전역적으로 사용되는 컴포넌트
- **`blog/`**: 블로그 기능 관련 컴포넌트
- **`notion/`**: Notion 블록을 렌더링하는 컴포넌트
- **`ads/`**: 광고 관련 컴포넌트
- **`ui/`**: 버튼, 인풋 등 기본 UI 컴포넌트

### `/src/lib`
비즈니스 로직과 유틸리티 함수를 포함합니다.
- **`notion/`**: Notion API 연동 및 데이터 처리
- **`seo/`**: SEO 최적화 관련 함수
- **`utils/`**: 날짜, 문자열 등 일반 유틸리티

### `/src/types`
TypeScript 타입 정의를 모아둔 디렉토리입니다. 타입 안정성을 위해 별도로 관리합니다.

### `/src/hooks`
커스텀 React 훅을 모아둔 디렉토리입니다. 상태 관리, 부수 효과 등을 재사용 가능하게 만듭니다.

---

## 🔧 설정 파일 설명

### `next.config.js`
Next.js 프레임워크 설정 파일입니다.
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

### `tailwind.config.ts`
Tailwind CSS 설정 파일입니다. 테마, 색상, 폰트 등을 커스터마이징합니다.
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366F1',
      },
    },
  },
  plugins: [],
}
export default config
```

### `tsconfig.json`
TypeScript 컴파일러 설정 파일입니다.
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### `.env.local`
환경 변수를 저장하는 파일입니다. **절대 Git에 커밋하지 마세요!**
```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx

# Ads
KAKAO_ADFIT_CLIENT_ID=xxxxxxxxxxxxx
GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxx

# Site
NEXT_PUBLIC_SITE_URL=https://your-blog.vercel.app
```

---

## 📦 주요 파일 설명

### `src/lib/notion/client.ts`
Notion API 클라이언트를 초기화합니다.
```typescript
import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})
```

### `src/lib/notion/posts.ts`
게시글 목록을 가져오는 함수입니다.
```typescript
export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  return response.results
}
```

### `src/components/ads/AdFitAd.tsx`
Kakao AdFit 광고 컴포넌트입니다.
```typescript
'use client'

export default function AdFitAd({ unit }: { unit: string }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <ins className="kakao_ad_area" data-ad-unit={unit} />
}
```

---

## 🚀 빠른 시작

### 1. 프로젝트 생성
```bash
npx create-next-app@latest notion-blog --typescript --tailwind --app
cd notion-blog
```

### 2. 디렉토리 구조 생성
```bash
mkdir -p src/{components/{common,blog,notion,ads,ui},lib/{notion,seo,utils},types,hooks,styles,config}
```

### 3. 의존성 설치
```bash
npm install @notionhq/client
npm install prism-react-renderer
npm install date-fns
```

### 4. 환경 변수 설정
```bash
cp .env.example .env.local
# .env.local 파일을 열어 Notion API Key와 Database ID를 입력
```

### 5. 개발 서버 실행
```bash
npm run dev
```

---

## 📝 디렉토리 구조 설계 원칙

### 1. 기능별 분리
각 기능(블로그, 광고, Notion)을 독립적인 디렉토리로 분리하여 유지보수성을 높입니다.

### 2. 컴포넌트 재사용
공통적으로 사용되는 UI 컴포넌트는 `ui/` 폴더에 모아 재사용합니다.

### 3. 타입 안정성
모든 타입을 `types/` 폴더에서 중앙 관리하여 타입 오류를 사전에 방지합니다.

### 4. 라우팅 명확성
App Router의 파일 시스템 기반 라우팅을 활용하여 URL 구조를 직관적으로 만듭니다.

### 5. 환경 분리
환경별(개발/프로덕션) 설정을 환경 변수로 관리하여 보안과 유연성을 확보합니다.

---

## 🔍 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `PostCard.tsx`)
- **유틸리티 함수**: camelCase (예: `formatDate.ts`)
- **타입 정의**: PascalCase (예: `Post.ts`)
- **설정 파일**: kebab-case (예: `next.config.js`)
- **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)

---

## 📊 예상 파일 개수

- **컴포넌트**: 약 30개
- **유틸리티 함수**: 약 15개
- **타입 정의**: 약 10개
- **페이지**: 약 5개
- **설정 파일**: 약 8개

**총 예상 파일 개수**: 약 70개

---

**문서 끝**

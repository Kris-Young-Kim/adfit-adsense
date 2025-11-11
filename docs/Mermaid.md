# Mermaid.md
# 프로젝트 플로우차트 및 아키텍처 다이어그램

## 1. 전체 시스템 아키텍처

```mermaid
flowchart TB
    subgraph User["👤 사용자"]
        Browser[웹 브라우저]
    end
    
    subgraph Frontend["🖥️ Frontend (Next.js)"]
        Pages[Pages/Routes]
        Components[React Components]
        SSG[Static Generation]
    end
    
    subgraph CMS["📝 Content Management"]
        Notion[Notion Workspace]
        NotionDB[(Notion Database)]
        NotionAPI[Notion API]
    end
    
    subgraph Ads["💰 광고 플랫폼"]
        AdFit[Kakao AdFit]
        AdSense[Google AdSense]
    end
    
    subgraph Deploy["☁️ 배포"]
        Vercel[Vercel Platform]
        CDN[Vercel CDN]
    end
    
    Browser -->|요청| CDN
    CDN -->|정적 페이지 제공| Browser
    
    Notion -->|글 작성| NotionDB
    NotionDB -->|API 호출| NotionAPI
    NotionAPI -->|데이터 페칭| SSG
    
    SSG -->|빌드 타임 생성| Pages
    Pages -->|렌더링| Components
    Components -->|광고 스크립트| AdFit
    Components -->|광고 스크립트| AdSense
    
    Frontend -->|배포| Vercel
    Vercel -->|CDN 배포| CDN
```

---

## 2. Notion API 데이터 흐름

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Notion as Notion Workspace
    participant API as Notion API
    participant NextJS as Next.js App
    participant Browser as 웹 브라우저
    
    User->>Notion: 1. 게시글 작성
    Notion->>Notion: 2. Database에 저장
    
    NextJS->>API: 3. 빌드 시 데이터 요청
    API->>NextJS: 4. 게시글 목록 반환
    
    loop 각 게시글
        NextJS->>API: 5. 게시글 상세 요청
        API->>NextJS: 6. 블록 데이터 반환
        NextJS->>NextJS: 7. HTML로 파싱
    end
    
    NextJS->>NextJS: 8. 정적 페이지 생성
    NextJS->>Browser: 9. 배포 및 제공
    Browser->>User: 10. 블로그 표시
```

---

## 3. 게시글 렌더링 프로세스

```mermaid
flowchart LR
    Start([빌드 시작]) --> FetchList[게시글 목록 조회]
    FetchList --> Loop{모든 게시글<br/>순회}
    
    Loop -->|각 게시글| FetchDetail[게시글 상세 조회]
    FetchDetail --> ParseBlocks[Notion Block 파싱]
    
    ParseBlocks --> BlockType{Block 타입}
    
    BlockType -->|Paragraph| Para[텍스트 렌더링]
    BlockType -->|Heading| Head[제목 렌더링]
    BlockType -->|Code| Code[코드 블록 렌더링]
    BlockType -->|Image| Img[이미지 렌더링]
    BlockType -->|List| List[리스트 렌더링]
    
    Para --> Combine[HTML 조합]
    Head --> Combine
    Code --> Combine
    Img --> Combine
    List --> Combine
    
    Combine --> GeneratePage[정적 페이지 생성]
    GeneratePage --> Loop
    
    Loop -->|완료| End([빌드 완료])
```

---

## 4. 사용자 플로우 (User Flow)

```mermaid
flowchart TD
    Start([사용자 방문]) --> Home[홈페이지]
    
    Home --> Action1{액션 선택}
    
    Action1 -->|게시글 목록| PostList[게시글 목록 페이지]
    Action1 -->|검색| Search[검색 페이지]
    Action1 -->|카테고리| Category[카테고리 페이지]
    
    PostList --> SelectPost[게시글 선택]
    Search --> SearchResult[검색 결과]
    SearchResult --> SelectPost
    Category --> FilteredList[필터링된 목록]
    FilteredList --> SelectPost
    
    SelectPost --> PostDetail[게시글 상세 페이지]
    
    PostDetail --> Action2{다음 액션}
    
    Action2 -->|이전/다음 글| PostDetail
    Action2 -->|광고 클릭| AdClick[광고 페이지 이동]
    Action2 -->|목록으로| PostList
    Action2 -->|홈으로| Home
    
    AdClick --> Return[사이트로 복귀]
    Return --> PostDetail
```

---

## 5. 광고 통합 플로우

```mermaid
flowchart TB
    PageLoad([페이지 로드]) --> CheckAds{광고 위치<br/>확인}
    
    CheckAds -->|상단| TopAd[상단 광고 영역]
    CheckAds -->|본문 중간| MiddleAd[본문 중간 광고]
    CheckAds -->|하단| BottomAd[하단 광고 영역]
    CheckAds -->|사이드바| SideAd[사이드바 광고]
    
    TopAd --> LoadScript1[AdFit 스크립트 로드]
    MiddleAd --> LoadScript2[AdSense 스크립트 로드]
    BottomAd --> LoadScript1
    SideAd --> LoadScript2
    
    LoadScript1 --> Render1[광고 렌더링]
    LoadScript2 --> Render2[광고 렌더링]
    
    Render1 --> Display[화면에 광고 표시]
    Render2 --> Display
    
    Display --> UserAction{사용자 액션}
    UserAction -->|클릭| Revenue[수익 발생]
    UserAction -->|무시| Continue[계속 읽기]
```

---

## 6. 빌드 및 배포 프로세스

```mermaid
flowchart LR
    Dev([개발 완료]) --> GitPush[Git Push to Main]
    GitPush --> VercelTrigger[Vercel 자동 빌드 트리거]
    
    VercelTrigger --> InstallDeps[의존성 설치]
    InstallDeps --> EnvVar[환경 변수 로드]
    EnvVar --> BuildProcess[빌드 프로세스]
    
    BuildProcess --> FetchNotion[Notion API 데이터 페칭]
    FetchNotion --> GeneratePages[정적 페이지 생성]
    GeneratePages --> OptimizeAssets[이미지/코드 최적화]
    
    OptimizeAssets --> BuildSuccess{빌드 성공?}
    
    BuildSuccess -->|성공| Deploy[Vercel에 배포]
    BuildSuccess -->|실패| ErrorLog[에러 로그 확인]
    ErrorLog --> Fix[수정 후 재배포]
    Fix --> GitPush
    
    Deploy --> CDNDeploy[CDN에 배포]
    CDNDeploy --> Live([사이트 라이브])
```

---

## 7. 데이터베이스 구조 (Notion Database)

```mermaid
erDiagram
    POST {
        string id PK
        string title
        text description
        date createdAt
        date updatedAt
        boolean published
        string thumbnailUrl
        array tags
        string category
        string slug
    }
    
    BLOCK {
        string id PK
        string postId FK
        string type
        text content
        object properties
        int order
    }
    
    TAG {
        string id PK
        string name
        string color
    }
    
    CATEGORY {
        string id PK
        string name
        string slug
    }
    
    POST ||--o{ BLOCK : contains
    POST ||--o{ TAG : has
    POST ||--|| CATEGORY : belongs_to
```

---

## 8. 컴포넌트 계층 구조

```mermaid
flowchart TD
    App[App Root Layout]
    
    App --> Header[Header Component]
    App --> Main[Main Content]
    App --> Footer[Footer Component]
    
    Header --> Nav[Navigation]
    Header --> ThemeToggle[Dark Mode Toggle]
    Header --> SearchBar[Search Bar]
    
    Main --> HomePage[Home Page]
    Main --> PostListPage[Post List Page]
    Main --> PostDetailPage[Post Detail Page]
    
    PostListPage --> PostCard[Post Card Component]
    PostCard --> Thumbnail[Thumbnail Image]
    PostCard --> PostMeta[Post Metadata]
    
    PostDetailPage --> PostHeader[Post Header]
    PostDetailPage --> PostContent[Post Content]
    PostDetailPage --> AdComponent[Ad Component]
    PostDetailPage --> Navigation[Prev/Next Navigation]
    
    PostContent --> BlockRenderer[Block Renderer]
    BlockRenderer --> ParagraphBlock[Paragraph]
    BlockRenderer --> HeadingBlock[Heading]
    BlockRenderer --> CodeBlock[Code Block]
    BlockRenderer --> ImageBlock[Image]
    BlockRenderer --> ListBlock[List]
    
    AdComponent --> AdFitAd[Kakao AdFit Ad]
    AdComponent --> AdSenseAd[Google AdSense Ad]
```

---

## 9. SEO 최적화 플로우

```mermaid
flowchart TB
    PageGen([페이지 생성]) --> MetaTags[메타 태그 생성]
    
    MetaTags --> Title[Title Tag]
    MetaTags --> Desc[Description Tag]
    MetaTags --> OG[Open Graph Tags]
    MetaTags --> Twitter[Twitter Card Tags]
    
    Title --> SEO[SEO 최적화]
    Desc --> SEO
    OG --> SEO
    Twitter --> SEO
    
    SEO --> Sitemap[Sitemap 생성]
    Sitemap --> Robots[robots.txt]
    Robots --> StructuredData[JSON-LD 구조화 데이터]
    
    StructuredData --> SearchEngine[검색 엔진 크롤링]
    SearchEngine --> Indexing[색인 등록]
    Indexing --> Ranking[검색 순위 향상]
```

---

## 10. 에러 처리 플로우

```mermaid
flowchart TD
    Request([API 요청]) --> Try{요청 성공?}
    
    Try -->|성공| Success[데이터 반환]
    Try -->|실패| ErrorType{에러 타입}
    
    ErrorType -->|Rate Limit| RateLimit[Rate Limit 에러]
    ErrorType -->|Network| Network[네트워크 에러]
    ErrorType -->|Auth| Auth[인증 에러]
    ErrorType -->|Not Found| NotFound[404 에러]
    
    RateLimit --> Retry[재시도 로직]
    Retry --> Wait[대기 시간]
    Wait --> Request
    
    Network --> FallbackData[캐시 데이터 사용]
    Auth --> CheckEnv[환경 변수 확인]
    NotFound --> ErrorPage[404 페이지 표시]
    
    FallbackData --> Display[데이터 표시]
    CheckEnv --> FixAuth[인증 재설정]
    ErrorPage --> Home[홈으로 이동]
    
    Success --> Display
```

---

**문서 끝**

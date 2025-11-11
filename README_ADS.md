# 광고 통합 가이드

## 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```bash
# Kakao AdFit
NEXT_PUBLIC_KAKAO_ADFIT_CLIENT_ID=your_adfit_client_id
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_TOP=your_top_unit_id
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_MIDDLE=your_middle_unit_id
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_BOTTOM=your_bottom_unit_id
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_SIDEBAR=your_sidebar_unit_id

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_AUTO_ADS=false
NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_TOP=your_top_slot_id
NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_MIDDLE=your_middle_slot_id
NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_BOTTOM=your_bottom_slot_id
NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_SIDEBAR=your_sidebar_slot_id
```

## Kakao AdFit 설정

### 1. 계정 생성 및 매체 등록
1. https://adfit.kakao.com/ 접속
2. 계정 생성 및 로그인
3. 매체 등록 (사이트 URL 등록)

### 2. 광고 단위 생성
1. AdFit 대시보드에서 "광고 단위" 메뉴 선택
2. "새 광고 단위 만들기" 클릭
3. 광고 형식 선택 (반응형 권장)
4. 광고 단위 ID 복사

### 3. 환경 변수 설정
- `NEXT_PUBLIC_KAKAO_ADFIT_CLIENT_ID`: AdFit 클라이언트 ID
- `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_TOP`: 상단 광고 단위 ID
- `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_MIDDLE`: 중간 광고 단위 ID
- `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_BOTTOM`: 하단 광고 단위 ID

## Google AdSense 설정

### 1. 계정 생성 및 사이트 등록
1. https://www.google.com/adsense/ 접속
2. 계정 생성 및 로그인
3. 사이트 추가 (도메인 등록)

### 2. 광고 단위 생성 (수동 광고인 경우)
1. AdSense 대시보드에서 "광고" 메뉴 선택
2. "광고 단위" → "표시 광고" 선택
3. 광고 형식 및 크기 설정
4. 광고 단위 코드에서 클라이언트 ID와 슬롯 ID 추출

### 3. Auto Ads 설정 (선택사항)
- `NEXT_PUBLIC_GOOGLE_ADSENSE_AUTO_ADS=true`로 설정하면 Auto Ads가 활성화됩니다.
- Auto Ads가 활성화되면 수동 광고 단위는 표시되지 않습니다.

### 4. 환경 변수 설정
- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID`: AdSense 클라이언트 ID (ca-pub-xxxxx 형식)
- `NEXT_PUBLIC_GOOGLE_ADSENSE_AUTO_ADS`: Auto Ads 사용 여부 (true/false)
- `NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_TOP`: 상단 광고 슬롯 ID
- `NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_MIDDLE`: 중간 광고 슬롯 ID
- `NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_BOTTOM`: 하단 광고 슬롯 ID

## 광고 배치 위치

현재 구현된 광고 배치 위치:

1. **상단 광고**: 게시글 헤더 바로 아래
2. **중간 광고**: 게시글 본문 중간 (블록이 10개 이상인 경우)
3. **하단 광고**: 게시글 본문 아래

## 주의사항

- 광고 승인 전까지는 테스트 광고가 표시될 수 있습니다.
- 광고 수익은 광고 플랫폼의 정책에 따라 결정됩니다.
- 광고가 너무 많으면 사용자 경험이 저하될 수 있으므로 적절히 배치하세요.


/**
 * 광고 설정
 * 환경 변수에서 광고 관련 설정을 가져옵니다.
 */

export const adConfig = {
  adfit: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_ADFIT_CLIENT_ID,
    units: {
      top: process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_TOP,
      middle: process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_MIDDLE,
      bottom: process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_BOTTOM,
      sidebar: process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_SIDEBAR,
    },
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID,
    autoAds: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AUTO_ADS === 'true',
    units: {
      top: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_TOP,
      middle: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_MIDDLE,
      bottom: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_BOTTOM,
      sidebar: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_UNIT_SIDEBAR,
    },
  },
} as const;

// 광고 활성화 여부 확인
export const isAdfitEnabled = () => {
  return !!adConfig.adfit.clientId;
};

export const isAdsenseEnabled = () => {
  return !!adConfig.adsense.clientId;
};


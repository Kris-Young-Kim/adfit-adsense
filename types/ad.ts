// 광고 위치 타입
export type AdPosition = 'top' | 'middle' | 'bottom' | 'sidebar';

// 광고 플랫폼 타입
export type AdPlatform = 'adfit' | 'adsense';

// 광고 단위 설정
export interface AdUnit {
  platform: AdPlatform;
  unitId: string;
  position: AdPosition;
  responsive?: boolean;
}

// 광고 설정
export interface AdConfig {
  adfit?: {
    clientId?: string;
    units: {
      [key in AdPosition]?: string;
    };
  };
  adsense?: {
    clientId?: string;
    autoAds?: boolean;
    units?: {
      [key in AdPosition]?: string;
    };
  };
}


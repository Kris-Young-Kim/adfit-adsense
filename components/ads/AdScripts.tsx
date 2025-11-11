'use client';

import Script from 'next/script';
import { adConfig, isAdfitEnabled, isAdsenseEnabled } from '@/lib/config/ads';

/**
 * 광고 스크립트 컴포넌트
 * 루트 레이아웃에 광고 스크립트를 로드합니다.
 */
export default function AdScripts() {
  const adfitClientId = adConfig.adfit.clientId;
  const adsenseClientId = adConfig.adsense.clientId;
  const adsenseAutoAds = adConfig.adsense.autoAds;

  return (
    <>
      {/* Kakao AdFit 스크립트 */}
      {isAdfitEnabled() && adfitClientId && (
        <Script
          src="https://t1.daumcdn.net/kas/static/ba.min.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('✅ Kakao AdFit 스크립트 로드 완료');
            if (window.kakao && window.kakao.adfit) {
              window.kakao.adfit.start();
            }
          }}
        />
      )}

      {/* Google AdSense 스크립트 */}
      {isAdsenseEnabled() && adsenseClientId && (
        <>
          {adsenseAutoAds ? (
            // Auto Ads
            <Script
              id="adsense-auto"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${adsenseClientId}",
                    enable_page_level_ads: true
                  });
                `,
              }}
            />
          ) : (
            // 수동 광고 단위
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
              strategy="lazyOnload"
              crossOrigin="anonymous"
              onLoad={() => {
                console.log('✅ Google AdSense 스크립트 로드 완료');
              }}
            />
          )}
        </>
      )}
    </>
  );
}

// TypeScript를 위한 전역 타입 선언
declare global {
  interface Window {
    kakao?: {
      adfit?: {
        start: () => void;
      };
    };
    adsbygoogle?: any[];
  }
}


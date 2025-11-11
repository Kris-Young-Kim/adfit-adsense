'use client';

import { useEffect, useRef } from 'react';

interface AdFitAdProps {
  unitId: string;
  className?: string;
  responsive?: boolean;
}

/**
 * Kakao AdFit 광고 컴포넌트
 * AdScripts에서 스크립트를 로드하므로 여기서는 광고만 렌더링합니다.
 * 
 * @param unitId - AdFit 광고 단위 ID
 * @param className - 추가 CSS 클래스
 * @param responsive - 반응형 광고 여부
 */
export default function AdFitAd({ unitId, className = '', responsive = true }: AdFitAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크립트가 로드된 후 광고 초기화
    const initAd = () => {
      if (window.kakao && window.kakao.adfit && adRef.current) {
        try {
          window.kakao.adfit.start();
        } catch (error) {
          console.error('AdFit 광고 초기화 실패:', error);
        }
      }
    };

    // 스크립트가 이미 로드되어 있으면 즉시 초기화
    if (document.querySelector('script[src*="ba.min.js"]')) {
      // 약간의 지연을 두고 초기화 (스크립트가 완전히 로드될 때까지 대기)
      setTimeout(initAd, 100);
    } else {
      // 스크립트 로드 대기
      const checkScript = setInterval(() => {
        if (document.querySelector('script[src*="ba.min.js"]')) {
          clearInterval(checkScript);
          setTimeout(initAd, 100);
        }
      }, 100);

      // 5초 후 타임아웃
      setTimeout(() => clearInterval(checkScript), 5000);
    }
  }, [unitId]);

  if (!unitId) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`kakao_ad_area ${className}`}
      data-ad-unit={unitId}
      data-ad-width={responsive ? '320' : undefined}
      data-ad-height={responsive ? '100' : undefined}
      style={{
        minHeight: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
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
  }
}


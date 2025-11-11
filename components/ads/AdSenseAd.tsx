'use client';

import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  clientId?: string;
  slotId?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

/**
 * Google AdSense 광고 컴포넌트
 * AdScripts에서 스크립트를 로드하므로 여기서는 광고만 렌더링합니다.
 * 
 * @param clientId - AdSense 클라이언트 ID (ca-pub-xxxxx)
 * @param slotId - 광고 슬롯 ID (선택사항, 수동 광고 단위인 경우)
 * @param format - 광고 형식 (auto, rectangle 등)
 * @param responsive - 반응형 광고 여부
 * @param className - 추가 CSS 클래스
 */
export default function AdSenseAd({
  clientId,
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Auto Ads가 활성화된 경우 수동 광고 단위는 푸시하지 않음
    if (!clientId || !slotId || pushed.current || !adRef.current) {
      return;
    }

    // AdSense 스크립트가 로드된 후 광고 푸시
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !pushed.current) {
          (window.adsbygoogle as any).push({});
          pushed.current = true;
        }
      } catch (e) {
        console.error('AdSense 광고 푸시 실패:', e);
      }
    };

    // 스크립트가 이미 로드되어 있으면 즉시 푸시
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
      setTimeout(pushAd, 100);
    } else {
      // 스크립트 로드 대기
      const checkScript = setInterval(() => {
        if (document.querySelector('script[src*="adsbygoogle.js"]')) {
          clearInterval(checkScript);
          setTimeout(pushAd, 100);
        }
      }, 100);

      // 5초 후 타임아웃
      setTimeout(() => clearInterval(checkScript), 5000);
    }
  }, [clientId, slotId]);

  if (!clientId) {
    return null;
  }

  // Auto Ads가 활성화되고 슬롯 ID가 없으면 렌더링하지 않음
  if (!slotId) {
    return null;
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '100px',
        }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : undefined}
      />
    </div>
  );
}

// TypeScript를 위한 전역 타입 선언
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}


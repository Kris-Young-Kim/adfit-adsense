'use client';

import { Suspense } from 'react';
import AdFitAd from './AdFitAd';
import AdSenseAd from './AdSenseAd';
import { adConfig, isAdfitEnabled, isAdsenseEnabled } from '@/lib/config/ads';
import type { AdPosition } from '@/types/ad';

interface AdContainerProps {
  position: AdPosition;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * 광고 컨테이너 컴포넌트
 * 위치에 따라 적절한 광고를 표시합니다.
 * 
 * @param position - 광고 위치 (top, middle, bottom, sidebar)
 * @param className - 추가 CSS 클래스
 * @param fallback - 광고 로딩 중 표시할 컴포넌트
 */
export default function AdContainer({
  position,
  className = '',
  fallback,
}: AdContainerProps) {
  const adfitUnitId = adConfig.adfit.units[position];
  const adsenseSlotId = adConfig.adsense.units[position];
  const adsenseClientId = adConfig.adsense.clientId;

  // 광고가 하나도 활성화되지 않은 경우
  if (!isAdfitEnabled() && !isAdsenseEnabled()) {
    return null;
  }

  // 기본 fallback UI
  const defaultFallback = (
    <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <span className="text-sm text-gray-400">광고 로딩 중...</span>
    </div>
  );

  return (
    <div className={`ad-container ad-${position} ${className}`}>
      <Suspense fallback={fallback || defaultFallback}>
        <div className="flex flex-col gap-4">
          {/* Kakao AdFit 광고 */}
          {isAdfitEnabled() && adfitUnitId && (
            <div className="adfit-wrapper">
              <AdFitAd unitId={adfitUnitId} responsive />
            </div>
          )}

          {/* Google AdSense 광고 */}
          {isAdsenseEnabled() && adsenseClientId && (
            <div className="adsense-wrapper">
              <AdSenseAd
                clientId={adsenseClientId}
                slotId={adsenseSlotId}
                responsive
              />
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}


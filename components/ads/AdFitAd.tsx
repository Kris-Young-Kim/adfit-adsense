'use client';

interface AdFitAdProps {
  unitId: string;
  width?: string;
  height?: string;
  className?: string;
  onFail?: string; // NO-AD 콜백 함수명
}

/**
 * Kakao AdFit 광고 컴포넌트
 * AdFit 가이드에 따라 <ins> 태그를 사용합니다.
 * 
 * @param unitId - AdFit 광고 단위 ID (예: "DAN-orrnBtdl54l5hgHS")
 * @param width - 광고 단위 가로 사이즈 (예: "300")
 * @param height - 광고 단위 세로 사이즈 (예: "250")
 * @param className - 추가 CSS 클래스
 * @param onFail - NO-AD 콜백 함수명
 */
export default function AdFitAd({ 
  unitId, 
  width = '300', 
  height = '250',
  className = '',
  onFail
}: AdFitAdProps) {
  if (!unitId) {
    return null;
  }

  return (
    <ins
      className={`kakao_ad_area ${className}`}
      style={{ display: 'none', width: '100%' }}
      data-ad-unit={unitId}
      data-ad-width={width}
      data-ad-height={height}
      {...(onFail && { 'data-ad-onfail': onFail })}
    />
  );
}


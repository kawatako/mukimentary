// app/components/ads/AdBanner.tsx
'use client'

import { useEffect } from 'react'

export function AdBanner() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        // @ts-expect-error: adsbygoogle は外部スクリプトで動的に提供されるグローバル変数
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense Error:', e)
      }
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="bg-gray-100 text-center py-4 rounded text-sm text-gray-500">
        [ここに広告が表示されます（開発用プレースホルダー）]
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_AD_CLIENT_ID}
      data-ad-slot={process.env.NEXT_PUBLIC_AD_SLOT_ID}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

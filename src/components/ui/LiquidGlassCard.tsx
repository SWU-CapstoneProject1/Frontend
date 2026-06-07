import type { ReactNode } from 'react'

interface LiquidGlassCardProps {
  children?: ReactNode
  className?: string
}

function LiquidGlassCard({ children, className = '' }: LiquidGlassCardProps) {
  return (
    <div className={`relative ${className}`}>
      
      {/*  backdrop-filter + saturate 매핑 */}
      <div 
        className="absolute inset-0 z-0 rounded-[43px]"
        style={{
          background: 'rgba(0, 0, 0, 0)', // var(--frost, 0) 상태 구현
          backdropFilter: 'url(#filter) saturate(1)',
          WebkitBackdropFilter: 'url(#filter) saturate(1)',
          boxShadow: `
            0 0 2px 1px rgba(255, 255, 255, 0.15) inset,
            0 0 10px 4px rgba(255, 255, 255, 0.1) inset,
            0px 4px 16px rgba(17, 17, 26, 0.05), 
            0px 8px 24px rgba(17, 17, 26, 0.05),
            0px 0 8px rgba(17, 17, 26, 0.05), 
            0px 8px 24px rgba(17, 17, 26, 0.2),
            0px 16px 56px rgba(17, 17, 26, 0.05),
            0px 4px 16px rgba(17, 17, 26, 0.05) inset,
            0px 8px 24px rgba(17, 17, 26, 0.05) inset,
            0px 16px 56px rgba(17, 17, 26, 0.05) inset
          `
        }}
      />

      {/* 내부 콘텐츠 배치 레이어 */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {children}
      </div>

      
      <svg className="absolute w-full h-full inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="filter" colorInterpolationFilters="sRGB">
            {/* the input displacement image */}
            <feImage x="0" y="0" width="100%" height="100%" result="map" href="data:image/svg+xml,%3Csvg%20class%3D%22displacement-image%22%20viewBox%3D%220%200%20336%2096%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red%22%20x1%3D%22100%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22red%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22blue%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3C!--%20backdrop%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22336%22%20height%3D%2296%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20red%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22336%22%20height%3D%2296%22%20rx%3D%2216%22%20fill%3D%22url(%23red)%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20blue%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22336%22%20height%3D%2296%22%20rx%3D%2216%22%20fill%3D%22url(%23blue)%22%20style%3D%22mix-blend-mode%3A%20difference%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20block%20out%20distortion%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%223.3600000000000003%22%20y%3D%223.3600000000000003%22%20width%3D%22329.28%22%20height%3D%2289.28%22%20rx%3D%2216%22%20fill%3D%22hsl(0%200%25%2050%25%20%2F%200.93%22%20style%3D%22filter%3Ablur(11px)%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E" />

            <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel" xChannelSelector="R" yChannelSelector="G" result="dispRed" scale="-150" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />

            <feDisplacementMap in="SourceGraphic" in2="map" id="greenchannel" xChannelSelector="R" yChannelSelector="G" result="dispGreen" scale="-160" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />

            <feDisplacementMap in="SourceGraphic" in2="map" id="bluechannel" xChannelSelector="R" yChannelSelector="G" result="dispBlue" scale="-170" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />

            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default LiquidGlassCard